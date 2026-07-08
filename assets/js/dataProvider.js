const STORAGE_KEYS = {
  profileDrafts: "fit-match.profile-drafts.v2",
  registeredProfiles: "fit-match.registered-profiles.v2",
  contactRequests: "fit-match.contact-requests.v2",
  ratings: "fit-match.profile-ratings.v1",
  legalConsents: "fit-match.legal-consents.v1",
  proSubscriptions: "fit-match.pro-subscriptions.v1"
};

const LEGAL_CONSENT_VERSION = "fit-match-beta-legal-v2";

const SUPABASE_CONFIG = window.FIT_MATCH_SUPABASE || {};
const supabaseClient = window.supabase?.createClient && SUPABASE_CONFIG.url && SUPABASE_CONFIG.publishableKey
  ? window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.publishableKey)
  : null;

let currentSession = null;
let remoteProfiles = [];
let remoteRequests = [];
let remoteRatings = [];
let remotePrivateNotes = {};
let remoteProSubscription = null;
let ratingsRemoteAvailable = true;
let remoteError = "";

function readStorage(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // Local storage can be unavailable in strict browser modes. The UI still works without persistence.
  }
}

function removeStorage(key) {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    // No-op: clearing persistence should never break the local app.
  }
}


function parseJsonObject(value, fallback = {}) {
  if (!value) return { ...fallback };
  try {
    const parsed = typeof value === "string" ? JSON.parse(value) : value;
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : { ...fallback };
  } catch (error) {
    return { ...fallback };
  }
}

function currentUserKey(user = currentSession?.user) {
  return user?.id || user?.email || "local";
}

function normalizeRatingSummary(summary = {}) {
  const count = Number(summary.count) || 0;
  const average = Number(summary.average) || 0;
  return {
    average: count ? Math.round(average * 10) / 10 : 0,
    count,
    label: count ? `${Math.round(average * 10) / 10}/5` : "Sin valoraciones"
  };
}

function proDefaultSubscription(overrides = {}) {
  const status = String(overrides.status || "FREE").toUpperCase();
  const trialEndsAt = overrides.trialEndsAt || overrides.trial_ends_at || "";
  const expiredTrial = status === "TRIAL" && trialEndsAt && new Date(trialEndsAt).getTime() < Date.now();
  return {
    profileId: overrides.profileId || overrides.profile_id || currentSession?.user?.id || "local",
    role: overrides.role || "professional",
    status: expiredTrial ? "FREE" : status,
    plan: overrides.plan || "free",
    startedAt: overrides.startedAt || overrides.started_at || "",
    trialEndsAt: expiredTrial ? "" : trialEndsAt,
    currentPeriodEnd: overrides.currentPeriodEnd || overrides.current_period_end || "",
    stripeCustomerId: overrides.stripeCustomerId || overrides.stripe_customer_id || "",
    stripeSubscriptionId: overrides.stripeSubscriptionId || overrides.stripe_subscription_id || "",
    proInterest: Boolean(overrides.proInterest || overrides.pro_interest),
    profileScore: Number(overrides.profileScore || overrides.profile_score) || 0,
    profileRecommendations: Array.isArray(overrides.profileRecommendations || overrides.profile_recommendations)
      ? [...(overrides.profileRecommendations || overrides.profile_recommendations)]
      : [],
    updatedAt: overrides.updatedAt || overrides.updated_at || new Date().toISOString()
  };
}

function publicProMetaFromSubscription(subscription = {}, extras = {}) {
  const normalized = proDefaultSubscription(subscription);
  return {
    proStatus: normalized.status,
    proPlan: normalized.plan,
    proTrialEndsAt: normalized.trialEndsAt,
    proStartedAt: normalized.startedAt,
    proInterest: normalized.proInterest,
    profileScore: normalized.profileScore,
    profileRecommendations: normalized.profileRecommendations,
    verified: Boolean(extras.verified)
  };
}

function isProActiveStatus(status = "") {
  return ["PRO", "TRIAL"].includes(String(status || "").toUpperCase());
}

function readProSubscriptions() {
  return readStorage(STORAGE_KEYS.proSubscriptions, {});
}

function writeProSubscription(profileId, subscription) {
  const subscriptions = readProSubscriptions();
  subscriptions[profileId || "local"] = proDefaultSubscription(subscription);
  writeStorage(STORAGE_KEYS.proSubscriptions, subscriptions);
  return subscriptions[profileId || "local"];
}

function normalizeRating(rating = {}) {
  const baseCriteria = rating.criteria && typeof rating.criteria === "object" ? rating.criteria : {};
  const ratingType = rating.ratingType || rating.rating_type || baseCriteria._ratingType || "service";
  const criteria = { ...baseCriteria, _ratingType: ratingType };
  const publicComment = rating.publicComment || rating.public_comment || criteria._publicComment || "";
  const values = Object.entries(criteria)
    .filter(([key]) => !String(key).startsWith("_"))
    .map(([, value]) => Number(value))
    .filter((value) => value >= 1 && value <= 5);
  const average = Number(rating.averageScore || rating.average_score) || (values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0);
  return {
    id: rating.id || createId("rating"),
    requestId: rating.requestId || rating.request_id || "",
    raterId: rating.raterId || rating.rater_id || "",
    targetId: rating.targetId || rating.target_id || "",
    raterRole: rating.raterRole || rating.rater_role || "",
    targetRole: rating.targetRole || rating.target_role || "",
    criteria,
    ratingType,
    averageScore: Math.round(average * 10) / 10,
    publicComment,
    comment: rating.comment || "",
    createdAt: rating.createdAt || rating.created_at || new Date().toISOString(),
    updatedAt: rating.updatedAt || rating.updated_at || new Date().toISOString()
  };
}

function dedupeRatings(ratings = []) {
  const map = new Map();
  ratings.map(normalizeRating).forEach((rating) => {
    if (!rating.raterId || !rating.targetId) return;
    const key = `${rating.raterId}:${rating.targetId}:${rating.ratingType}`;
    const current = map.get(key);
    const currentTime = current ? new Date(current.updatedAt || current.createdAt || 0).getTime() : 0;
    const nextTime = new Date(rating.updatedAt || rating.createdAt || 0).getTime();
    if (!current || nextTime >= currentTime) map.set(key, rating);
  });
  return Array.from(map.values()).sort((a, b) => new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0));
}

function ratingSummariesByTarget(ratings = []) {
  return ratings.reduce((map, rating) => {
    const item = normalizeRating(rating);
    if (!item.targetId || !item.averageScore) return map;
    const current = map.get(item.targetId) || { total: 0, count: 0 };
    current.total += item.averageScore;
    current.count += 1;
    map.set(item.targetId, current);
    return map;
  }, new Map());
}

function applyRatingSummaries(profiles = [], ratings = []) {
  const summaries = ratingSummariesByTarget(ratings);
  return profiles.map((profile) => {
    const summary = summaries.get(profile.id);
    if (!summary) return { ...profile, ratingSummary: normalizeRatingSummary(profile.ratingSummary) };
    return {
      ...profile,
      ratingSummary: normalizeRatingSummary({ average: summary.total / summary.count, count: summary.count })
    };
  });
}

function readRatings() {
  return dedupeRatings(readStorage(STORAGE_KEYS.ratings, []));
}

function writeRatings(ratings) {
  writeStorage(STORAGE_KEYS.ratings, ratings.map(normalizeRating));
}

function saveLocalRating(rating) {
  const normalized = normalizeRating(rating);
  const ratings = readRatings();
  const index = ratings.findIndex((item) =>
    item.raterId === normalized.raterId
    && item.targetId === normalized.targetId
    && normalizeRating(item).ratingType === normalized.ratingType
  );
  if (index >= 0) {
    ratings[index] = { ...ratings[index], ...normalized, updatedAt: new Date().toISOString() };
  } else {
    ratings.unshift(normalized);
  }
  writeRatings(ratings);
  return normalized;
}

function localLegalConsents() {
  return readStorage(STORAGE_KEYS.legalConsents, {});
}

function writeLocalLegalConsent(userKey, consent) {
  const consents = localLegalConsents();
  consents[userKey] = consent;
  writeStorage(STORAGE_KEYS.legalConsents, consents);
}

function legalConsentFromNotes(notes = remotePrivateNotes) {
  const consent = notes?.legalConsent;
  return consent?.version === LEGAL_CONSENT_VERSION ? consent : null;
}

function createId(prefix) {
  if (window.crypto?.randomUUID) return `${prefix}-${window.crypto.randomUUID()}`;
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function canUseRemote() {
  return Boolean(supabaseClient && currentSession?.user?.id);
}

function normalizeRole(role) {
  return role === "client" || role === "professional" ? role : "";
}

function normalizeProfileKeyPart(value = "") {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9ñ\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function profileIdentityKey(profile = {}) {
  const role = normalizeRole(profile.role) || profile.role || "profile";
  const email = normalizeProfileKeyPart(profile.email || profile.contactEmail || profile.contact_email);
  if (email) return `${role}:email:${email}`;

  const id = normalizeProfileKeyPart(profile.id || profile.user_id || profile.userId);
  if (id) return `${role}:id:${id}`;

  return [
    role,
    "profile",
    normalizeProfileKeyPart(profile.name || profile.display_name),
    normalizeProfileKeyPart(profile.city),
    normalizeProfileKeyPart(profile.goal),
    normalizeProfileKeyPart(profile.sport)
  ].join(":");
}

function profileFreshness(profile = {}) {
  return new Date(profile.updatedAt || profile.updated_at || profile.createdAt || profile.created_at || 0).getTime() || 0;
}

function profileCompleteness(profile = {}) {
  const fields = [
    profile.name,
    profile.email,
    profile.city,
    profile.goal,
    profile.mode,
    profile.level,
    profile.sport,
    profile.availability,
    profile.bio,
    profile.notes,
    profile.photo,
    profile.phone
  ];
  const servicesCount = Array.isArray(profile.services) ? profile.services.length : 0;
  return fields.filter(Boolean).length + servicesCount;
}

function shouldPreferProfile(candidate, current) {
  const freshnessDiff = profileFreshness(candidate) - profileFreshness(current);
  if (freshnessDiff !== 0) return freshnessDiff > 0;
  return profileCompleteness(candidate) >= profileCompleteness(current);
}

function dedupeProfiles(profiles = []) {
  const uniqueProfiles = new Map();

  profiles.map(normalizeProfile).forEach((profile) => {
    const key = profileIdentityKey(profile);
    const current = uniqueProfiles.get(key);

    if (!current) {
      uniqueProfiles.set(key, profile);
      return;
    }

    const preferred = shouldPreferProfile(profile, current) ? profile : current;
    const fallback = preferred === profile ? current : profile;
    uniqueProfiles.set(key, {
      ...fallback,
      ...preferred,
      services: preferred.services?.length ? preferred.services : fallback.services || [],
      ratingSummary: normalizeRatingSummary(
        preferred.ratingSummary?.count ? preferred.ratingSummary : fallback.ratingSummary
      )
    });
  });

  return Array.from(uniqueProfiles.values())
    .sort((a, b) => profileFreshness(b) - profileFreshness(a));
}

function getUserAccountRole(user = currentSession?.user) {
  return normalizeRole(user?.user_metadata?.role || user?.raw_user_meta_data?.role || user?.app_metadata?.role);
}

function normalizeDraft(profile) {
  return {
    ...profile,
    services: Array.isArray(profile.services) ? [...profile.services] : [],
    sport: profile.sport || "",
    birthdate: profile.birthdate || "",
    phone: profile.phone || "",
    photo: profile.photo || "",
    notes: profile.notes || "",
    updatedAt: new Date().toISOString()
  };
}

function toPublicProfile(profile) {
  const { email, phone, contactEmail, accountKey, birthdate, ...publicProfile } = profile;
  return publicProfile;
}

function normalizeProfile(profile) {
  const now = new Date().toISOString();
  const services = Array.isArray(profile.services) ? profile.services : [];
  const goal = profile.goal || "fuerza";
  const mode = profile.mode || "online";
  const level = profile.level || "principiante";
  const sport = (profile.sport || "").trim();
  const notes = (profile.notes || "").trim();
  const accountSeed = profile.email || profile.contactEmail || profile.id || profile.name || "local";
  const accountKey = `${profile.role || "profile"}:${String(accountSeed).trim().toLowerCase() || "local"}`;

  return {
    id: profile.id || createId("profile"),
    role: profile.role,
    name: profile.name || "Perfil sin nombre",
    email: profile.email || "",
    phone: profile.phone || "",
    contactEmail: profile.contactEmail || profile.email || "",
    birthdate: profile.birthdate || "",
    photo: profile.photo || "",
    accountKey,
    title: profile.title || "",
    city: profile.city || "Online",
    goal,
    mode,
    level,
    services,
    goals: [goal],
    modes: [mode],
    levels: [level],
    price: Number(profile.price) || 0,
    sport,
    notes,
    availability: profile.availability || "Por definir",
    bio: profile.bio || "Perfil creado para pruebas reales de Fit Match.",
    color: profile.color || (profile.role === "client" ? "#176f4d" : "#4b3a63"),
    ratingSummary: normalizeRatingSummary(profile.ratingSummary),
    proStatus: proDefaultSubscription({ status: profile.proStatus, trialEndsAt: profile.proTrialEndsAt }).status,
    proPlan: profile.proPlan || "free",
    proTrialEndsAt: profile.proTrialEndsAt || "",
    proStartedAt: profile.proStartedAt || "",
    proInterest: Boolean(profile.proInterest),
    profileScore: Number(profile.profileScore) || 0,
    profileRecommendations: Array.isArray(profile.profileRecommendations) ? [...profile.profileRecommendations] : [],
    verified: Boolean(profile.verified),
    createdAt: profile.createdAt || now,
    updatedAt: profile.updatedAt || profile.updated_at || now
  };
}

function readProfiles() {
  return dedupeProfiles(readStorage(STORAGE_KEYS.registeredProfiles, []));
}

function writeProfiles(profiles) {
  writeStorage(STORAGE_KEYS.registeredProfiles, dedupeProfiles(profiles));
}

function readDrafts() {
  return readStorage(STORAGE_KEYS.profileDrafts, {});
}

function priceField(role) {
  return role === "client" ? "budget" : "price";
}

function oppositeRequestRole(role) {
  return role === "client" ? "professional" : "client";
}

const CONTACT_EMAIL_PREFIX = "contact_email:";
const CONTACT_PHONE_PREFIX = "contact_phone:";
const PROFILE_PHOTO_PREFIX = "profile_photo:";
const PRO_META_PREFIX = "pro_meta:";
const READ_AT_PREFIX = "read_at:";
const READ_BY_PREFIX = "read_by:";
const DELETED_BY_PREFIX = "deleted_by:";
const CONTACT_STARTED_BY_PREFIX = "contact_started_by:";
const SERVICE_COMPLETED_BY_PREFIX = "service_completed_by:";

function unpackProfileNotes(value = "") {
  const lines = String(value || "").split(/\n+/);
  const visibleLines = [];
  let photo = "";
  let proMeta = {};

  lines.forEach((line) => {
    const cleanLine = line.trim();
    if (!cleanLine) return;
    if (cleanLine.startsWith(PROFILE_PHOTO_PREFIX)) {
      photo = decodeContactValue(cleanLine.slice(PROFILE_PHOTO_PREFIX.length));
      return;
    }
    if (cleanLine.startsWith(PRO_META_PREFIX)) {
      proMeta = parseJsonObject(decodeContactValue(cleanLine.slice(PRO_META_PREFIX.length)));
      return;
    }
    visibleLines.push(line);
  });

  return {
    notes: visibleLines.join("\n").trim(),
    photo,
    proMeta
  };
}

function packProfileNotes(notes = "", photo = "", proMeta = {}) {
  const cleanNotes = unpackProfileNotes(notes).notes;
  const parts = [];
  if (cleanNotes) parts.push(cleanNotes);
  if (photo) parts.push(`${PROFILE_PHOTO_PREFIX}${encodeContactValue(photo)}`);
  if (proMeta && Object.keys(proMeta).length) parts.push(`${PRO_META_PREFIX}${encodeContactValue(JSON.stringify(proMeta))}`);
  return parts.join("\n");
}


function encodeContactValue(value) {
  return encodeURIComponent(String(value || "").trim());
}

function decodeContactValue(value) {
  try {
    return decodeURIComponent(value || "");
  } catch (error) {
    return value || "";
  }
}

function contactReasons(reasons = [], person = {}) {
  const cleanReasons = reasons.filter((reason) =>
    !String(reason).startsWith(CONTACT_EMAIL_PREFIX) && !String(reason).startsWith(CONTACT_PHONE_PREFIX)
  );
  const email = person.contactEmail || person.email || "";
  const phone = person.phone || "";
  if (email) cleanReasons.push(`${CONTACT_EMAIL_PREFIX}${encodeContactValue(email)}`);
  if (phone) cleanReasons.push(`${CONTACT_PHONE_PREFIX}${encodeContactValue(phone)}`);
  return cleanReasons;
}

function extractContact(reasons = []) {
  return reasons.reduce((contact, reason) => {
    const value = String(reason || "");
    if (value.startsWith(CONTACT_EMAIL_PREFIX)) {
      contact.email = decodeContactValue(value.slice(CONTACT_EMAIL_PREFIX.length));
    }
    if (value.startsWith(CONTACT_PHONE_PREFIX)) {
      contact.phone = decodeContactValue(value.slice(CONTACT_PHONE_PREFIX.length));
    }
    return contact;
  }, { email: "", phone: "" });
}

function extractReadState(reasons = []) {
  return reasons.reduce((state, reason) => {
    const value = String(reason || "");
    if (value.startsWith(READ_AT_PREFIX)) {
      state.readAt = decodeContactValue(value.slice(READ_AT_PREFIX.length));
    }
    if (value.startsWith(READ_BY_PREFIX)) {
      state.readBy = decodeContactValue(value.slice(READ_BY_PREFIX.length));
    }
    return state;
  }, { readAt: "", readBy: "" });
}

function extractDeletedBy(reasons = []) {
  return reasons.reduce((deletedBy, reason) => {
    const value = String(reason || "");
    if (value.startsWith(DELETED_BY_PREFIX)) {
      const userId = decodeContactValue(value.slice(DELETED_BY_PREFIX.length));
      if (userId && !deletedBy.includes(userId)) deletedBy.push(userId);
    }
    return deletedBy;
  }, []);
}

function extractMarkerUsers(reasons = [], prefix = "") {
  return reasons.reduce((users, reason) => {
    const value = String(reason || "");
    if (prefix && value.startsWith(prefix)) {
      const userId = decodeContactValue(value.slice(prefix.length));
      if (userId && !users.includes(userId)) users.push(userId);
    }
    return users;
  }, []);
}

function markReasonsWithUser(reasons = [], prefix = "", userId = "") {
  if (!prefix || !userId) return reasons;
  const marker = `${prefix}${encodeContactValue(userId)}`;
  const cleanReasons = reasons.filter((reason) => String(reason || "") !== marker);
  cleanReasons.push(marker);
  return cleanReasons;
}

function visibleReasons(reasons = []) {
  return reasons.filter((reason) => {
    const value = String(reason || "");
    return !value.startsWith(CONTACT_EMAIL_PREFIX)
      && !value.startsWith(CONTACT_PHONE_PREFIX)
      && !value.startsWith(READ_AT_PREFIX)
      && !value.startsWith(READ_BY_PREFIX)
      && !value.startsWith(DELETED_BY_PREFIX)
      && !value.startsWith(CONTACT_STARTED_BY_PREFIX)
      && !value.startsWith(SERVICE_COMPLETED_BY_PREFIX);
  });
}

function markReasonsRead(reasons = [], readerId = "") {
  const cleanReasons = reasons.filter((reason) => {
    const value = String(reason || "");
    return !value.startsWith(READ_AT_PREFIX) && !value.startsWith(READ_BY_PREFIX);
  });
  cleanReasons.push(`${READ_AT_PREFIX}${encodeContactValue(new Date().toISOString())}`);
  if (readerId) cleanReasons.push(`${READ_BY_PREFIX}${encodeContactValue(readerId)}`);
  return cleanReasons;
}

function markReasonsDeleted(reasons = [], userId = "") {
  if (!userId) return reasons;
  const marker = `${DELETED_BY_PREFIX}${encodeContactValue(userId)}`;
  const cleanReasons = reasons.filter((reason) => String(reason || "") !== marker);
  cleanReasons.push(marker);
  return cleanReasons;
}

function markReasonsContactStarted(reasons = [], userId = "") {
  return markReasonsWithUser(reasons, CONTACT_STARTED_BY_PREFIX, userId);
}

function markReasonsServiceCompleted(reasons = [], userId = "") {
  return markReasonsWithUser(reasons, SERVICE_COMPLETED_BY_PREFIX, userId);
}

function requestPersonSnapshot(person, fallbackId, fallbackRole, fallbackName) {
  return {
    id: person?.id || fallbackId || "",
    role: person?.role || fallbackRole || "",
    name: person?.name || fallbackName || "Perfil Fit Match",
    title: person?.title || "",
    email: person?.email || "",
    contactEmail: person?.contactEmail || person?.email || "",
    phone: person?.phone || "",
    photo: person?.photo || "",
    city: person?.city || "Online",
    goal: person?.goal || "fuerza",
    mode: person?.mode || "online",
    level: person?.level || "principiante",
    services: person?.services || [],
    sport: person?.sport || "",
    notes: person?.notes || ""
  };
}

function normalizeStoredRequest(request, options = {}) {
  const senderRole = request.senderRole || request.role || "client";
  const recipientRole = request.recipientRole || oppositeRequestRole(senderRole);
  const contact = extractContact(request.reasons || []);
  const readState = extractReadState(request.reasons || []);
  const deletedBy = request.deletedBy || extractDeletedBy(request.reasons || []);
  const contactStartedBy = request.contactStartedBy || extractMarkerUsers(request.reasons || [], CONTACT_STARTED_BY_PREFIX);
  const serviceCompletedBy = request.serviceCompletedBy || extractMarkerUsers(request.reasons || [], SERVICE_COMPLETED_BY_PREFIX);
  const sender = request.sender || request.profile || requestPersonSnapshot(null, request.senderId, senderRole, "Perfil remitente");
  const recipient = request.recipient || request.target || requestPersonSnapshot(null, request.recipientId, recipientRole, "Perfil destinatario");
  if (contact.email && !sender.contactEmail && !sender.email) sender.contactEmail = contact.email;
  if (contact.phone && !sender.phone) sender.phone = contact.phone;
  const profileId = options.profileId || currentSession?.user?.id || "";
  const isIncoming = profileId ? recipient.id === profileId : recipientRole === options.role && senderRole !== options.role;
  const isOutgoing = profileId ? sender.id === profileId : senderRole === options.role;
  const direction = isIncoming && !isOutgoing ? "incoming" : "outgoing";
  const ownRole = direction === "incoming" ? recipientRole : senderRole;

  return {
    ...request,
    role: ownRole,
    senderRole,
    recipientRole,
    direction,
    createdAt: request.createdAt || request.created_at || new Date().toISOString(),
    score: request.score || 0,
    message: request.message || "",
    readAt: request.readAt || request.read_at || readState.readAt || "",
    readBy: request.readBy || readState.readBy || "",
    deletedBy,
    contactStartedBy,
    serviceCompletedBy,
    reasons: visibleReasons(request.reasons || []),
    sender: requestPersonSnapshot(sender, sender.id, senderRole, "Perfil remitente"),
    recipient: requestPersonSnapshot(recipient, recipient.id, recipientRole, "Perfil destinatario"),
    profile: requestPersonSnapshot(sender, sender.id, senderRole, "Perfil remitente"),
    target: direction === "incoming"
      ? requestPersonSnapshot(sender, sender.id, senderRole, "Perfil remitente")
      : requestPersonSnapshot(recipient, recipient.id, recipientRole, "Perfil destinatario")
  };
}

function appProfileFromRemote(profileRow, detailsRow, role) {
  const priceValue = role === "client" ? detailsRow.budget : detailsRow.price;
  const parsedNotes = unpackProfileNotes(detailsRow.match_notes || "");
  return normalizeProfile({
    id: profileRow.id,
    role,
    name: profileRow.display_name || "Perfil sin nombre",
    city: profileRow.city || "Online",
    goal: detailsRow.goal,
    sport: detailsRow.sport || "",
    mode: detailsRow.mode,
    level: detailsRow.level,
    services: detailsRow.services || [],
    price: priceValue,
    availability: detailsRow.availability || "Por definir",
    bio: detailsRow.bio || "",
    notes: parsedNotes.notes,
    photo: parsedNotes.photo,
    ...publicProMetaFromSubscription({
      status: parsedNotes.proMeta.proStatus,
      plan: parsedNotes.proMeta.proPlan,
      trialEndsAt: parsedNotes.proMeta.proTrialEndsAt,
      startedAt: parsedNotes.proMeta.proStartedAt,
      proInterest: parsedNotes.proMeta.proInterest,
      profileScore: parsedNotes.proMeta.profileScore,
      profileRecommendations: parsedNotes.proMeta.profileRecommendations
    }, { verified: parsedNotes.proMeta.verified }),
    createdAt: detailsRow.created_at,
    updatedAt: detailsRow.updated_at,
    color: role === "client" ? "#176f4d" : "#4b3a63"
  });
}

function mapRemoteProfiles(profileRows, clientRows, professionalRows) {
  const profileMap = new Map((profileRows || []).map((item) => [item.id, item]));
  const clients = (clientRows || [])
    .map((item) => profileMap.has(item.user_id) ? appProfileFromRemote(profileMap.get(item.user_id), item, "client") : null)
    .filter(Boolean);
  const professionals = (professionalRows || [])
    .map((item) => profileMap.has(item.user_id) ? appProfileFromRemote(profileMap.get(item.user_id), item, "professional") : null)
    .filter(Boolean);

  return dedupeProfiles([...clients, ...professionals]);
}

function mapRemoteRequest(row, profilesById) {
  const sender = requestPersonSnapshot(profilesById.get(row.sender_id), row.sender_id, row.sender_role, "Perfil remitente");
  const recipient = requestPersonSnapshot(profilesById.get(row.recipient_id), row.recipient_id, row.recipient_role, "Perfil destinatario");

  return normalizeStoredRequest({
    id: row.id,
    status: row.status,
    createdAt: row.created_at,
    score: row.score || 0,
    message: row.message || "",
    reasons: row.reasons || [],
    senderRole: row.sender_role,
    recipientRole: row.recipient_role,
    sender,
    recipient
  });
}

async function assertNoError(result) {
  if (result.error) throw result.error;
  return result.data;
}

window.FitMatchDataProvider = {
  async init() {
    if (!supabaseClient) {
      remoteError = "Supabase no está cargado. La app sigue en modo local.";
      return { mode: "local", session: null };
    }

    const { data, error } = await supabaseClient.auth.getSession();
    if (error) {
      remoteError = error.message;
      return { mode: "local", session: null };
    }

    currentSession = data.session;
    supabaseClient.auth.onAuthStateChange((_event, session) => {
      currentSession = session;
      if (!session) {
        remoteProfiles = [];
        remoteRequests = [];
        remoteRatings = [];
        remotePrivateNotes = {};
        remoteProSubscription = null;
      }
    });

    if (currentSession) await this.refreshRemoteData();
    return { mode: canUseRemote() ? "remote" : "local", session: currentSession };
  },

  getAuthState() {
    return {
      hasClient: Boolean(supabaseClient),
      isRemote: canUseRemote(),
      session: currentSession,
      user: currentSession?.user || null,
      error: remoteError
    };
  },

  getAccountRole() {
    return getUserAccountRole();
  },

  async signUp({ email, password, role, name }) {
    if (!supabaseClient) throw new Error("Supabase no está disponible en esta página.");
    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        data: {
          role,
          display_name: name || ""
        }
      }
    });
    if (error) throw error;

    currentSession = data.session || currentSession;

    if (!currentSession) {
      const login = await supabaseClient.auth.signInWithPassword({ email, password });
      if (login.error) throw login.error;
      currentSession = login.data.session;
    }

    if (currentSession) await this.refreshRemoteData();
    return { ...data, session: currentSession };
  },

  async signIn({ email, password }) {
    if (!supabaseClient) throw new Error("Supabase no está disponible en esta página.");
    const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
    if (error) throw error;
    currentSession = data.session;
    await this.refreshRemoteData();
    return data;
  },

  async signOut() {
    if (!supabaseClient) return;
    await supabaseClient.auth.signOut();
    currentSession = null;
    remoteProfiles = [];
    remoteRequests = [];
    remoteProSubscription = null;
  },

  async refreshRemoteData() {
    if (!canUseRemote()) return;

    try {
      const [profiles, clients, professionals] = await Promise.all([
        assertNoError(await supabaseClient.from("profiles").select("*")),
        assertNoError(await supabaseClient.from("client_profiles").select("*").eq("is_active", true)),
        assertNoError(await supabaseClient.from("professional_profiles").select("*").eq("is_active", true))
      ]);

      remoteProfiles = mapRemoteProfiles(profiles, clients, professionals);
      remotePrivateNotes = {};

      try {
        const privateResult = await supabaseClient
          .from("private_profile_data")
          .select("contact_email, phone, private_notes")
          .eq("user_id", currentSession.user.id)
          .maybeSingle();
        if (!privateResult.error && privateResult.data) {
          const privateNotes = parseJsonObject(privateResult.data.private_notes);
          remotePrivateNotes = privateNotes;
          remoteProSubscription = proDefaultSubscription(privateNotes.proSubscription || { profileId: currentSession.user.id, role: getUserAccountRole(), status: "FREE" });
          remoteProfiles = remoteProfiles.map((profile) => profile.id === currentSession.user.id
            ? {
                ...profile,
                email: privateResult.data.contact_email || currentSession.user.email || "",
                contactEmail: privateResult.data.contact_email || currentSession.user.email || "",
                phone: privateResult.data.phone || "",
                birthdate: privateNotes.birthdate || "",
                photo: profile.photo || privateNotes.photo || "",
                ...(profile.role === "professional" ? publicProMetaFromSubscription(remoteProSubscription, { verified: profile.verified }) : {})
              }
            : profile);
        }
      } catch (error) {
        // Los datos privados no deben romper el directorio público si la política aún no los permite.
      }

      if (!remoteProSubscription && currentSession?.user?.id) {
        remoteProSubscription = proDefaultSubscription({ profileId: currentSession.user.id, role: getUserAccountRole(), status: "FREE" });
      }

      try {
        const ratingRows = await assertNoError(
          await supabaseClient
            .from("profile_ratings")
            .select("*")
            .order("created_at", { ascending: false })
        );
        const syncedRatings = (ratingRows || []).map(normalizeRating);
        remoteRatings = dedupeRatings([...syncedRatings, ...readRatings()]);
        ratingsRemoteAvailable = true;
      } catch (error) {
        ratingsRemoteAvailable = false;
        remoteRatings = readRatings();
      }

      remoteProfiles = applyRatingSummaries(dedupeProfiles(remoteProfiles), this.listRatings());
      const profilesById = new Map(remoteProfiles.map((profile) => [profile.id, profile]));
      const requests = await assertNoError(
        await supabaseClient
          .from("contact_requests")
          .select("*")
          .order("created_at", { ascending: false })
      );
      remoteRequests = (requests || []).map((request) => mapRemoteRequest(request, profilesById));
      remoteError = "";
    } catch (error) {
      remoteError = error.message || "No se pudo sincronizar Supabase.";
    }
  },

  getDirectory(role) {
    const targetRole = role === "client" ? "professional" : "client";
    return this.listProfiles(targetRole).map(toPublicProfile);
  },

  getProfessionals() {
    return this.listProfiles("professional").map(toPublicProfile);
  },

  getClients() {
    return this.listProfiles("client").map(toPublicProfile);
  },

  getLabels() {
    return window.FIT_MATCH_DATA.labels;
  },

  getProfileDraft(role) {
    const drafts = readDrafts();
    return role ? drafts[role] || null : null;
  },

  getInitialRole() {
    const ownRemoteProfile = remoteProfiles.find((item) => item.id === currentSession?.user?.id);
    if (ownRemoteProfile?.role) return ownRemoteProfile.role;

    const accountRole = getUserAccountRole();
    if (accountRole) return accountRole;

    const drafts = readDrafts();
    if (drafts.client?.updatedAt && drafts.professional?.updatedAt) {
      return drafts.client.updatedAt > drafts.professional.updatedAt ? "client" : "professional";
    }
    if (drafts.professional) return "professional";
    return "client";
  },

  saveProfileDraft(profile) {
    const drafts = readDrafts();
    const draft = normalizeDraft(profile);
    drafts[draft.role] = draft;
    writeStorage(STORAGE_KEYS.profileDrafts, drafts);
    return draft;
  },

  clearProfileDraft(role) {
    if (!role) {
      removeStorage(STORAGE_KEYS.profileDrafts);
      return;
    }
    const drafts = readDrafts();
    delete drafts[role];
    writeStorage(STORAGE_KEYS.profileDrafts, drafts);
  },

  listProfiles(role) {
    const profiles = canUseRemote()
      ? applyRatingSummaries(dedupeProfiles(remoteProfiles), this.listRatings())
      : applyRatingSummaries(readProfiles(), readRatings());
    return role ? profiles.filter((profile) => profile.role === role) : profiles;
  },

  async saveProfile(profile) {
    if (!canUseRemote()) {
      const normalized = normalizeProfile(profile);
      const profiles = readProfiles();
      const identityKey = profileIdentityKey(normalized);
      const index = profiles.findIndex((item) => item.id === normalized.id || profileIdentityKey(item) === identityKey);
      const savedProfile = index >= 0
        ? {
            ...profiles[index],
            ...normalized,
            id: profiles[index].id || normalized.id,
            createdAt: profiles[index].createdAt || normalized.createdAt,
            updatedAt: new Date().toISOString()
          }
        : normalized;

      if (index >= 0) {
        profiles[index] = savedProfile;
      } else {
        profiles.unshift(savedProfile);
      }

      writeProfiles(profiles);
      this.saveProfileDraft(savedProfile);
      return savedProfile;
    }

    const user = currentSession.user;
    const existingActiveProfile = remoteProfiles.find((item) => item.id === user.id);
    const subscription = profile.role === "professional"
      ? this.getProSubscription(user.id)
      : proDefaultSubscription({ profileId: user.id, role: profile.role, status: "FREE" });
    const normalized = normalizeProfile({
      ...profile,
      id: user.id,
      email: user.email || profile.email,
      ...publicProMetaFromSubscription(subscription, { verified: profile.role === "professional" && (existingActiveProfile?.verified || profile.verified) })
    });
    if (existingActiveProfile && existingActiveProfile.role !== normalized.role) {
      throw new Error(`Esta cuenta ya está registrada como ${existingActiveProfile.role === "client" ? "cliente" : "profesional"}. Usa otro email para la otra ruta.`);
    }
    const baseProfile = {
      id: user.id,
      role: normalized.role,
      display_name: normalized.name,
      city: normalized.city
    };
    const details = {
      user_id: user.id,
      goal: normalized.goal,
      sport: normalized.sport,
      mode: normalized.mode,
      level: normalized.level,
      services: normalized.services,
      availability: normalized.availability,
      bio: normalized.bio,
      match_notes: packProfileNotes(
        normalized.notes,
        normalized.photo,
        normalized.role === "professional" ? publicProMetaFromSubscription(subscription, { verified: normalized.verified }) : {}
      ),
      is_active: true,
      [priceField(normalized.role)]: normalized.price || null
    };
    const targetTable = normalized.role === "client" ? "client_profiles" : "professional_profiles";
    const otherTable = normalized.role === "client" ? "professional_profiles" : "client_profiles";

    await assertNoError(await supabaseClient.from("profiles").upsert(baseProfile));
    await supabaseClient.from(otherTable).update({ is_active: false }).eq("user_id", user.id);
    await assertNoError(await supabaseClient.from(targetTable).upsert(details));
    await assertNoError(await supabaseClient.from("private_profile_data").upsert({
      user_id: user.id,
      contact_email: normalized.email,
      phone: normalized.phone || null,
      private_notes: JSON.stringify({
        ...remotePrivateNotes,
        ...(normalized.role === "professional" ? { proSubscription: subscription } : {}),
        birthdate: normalized.birthdate || "",
        photo: normalized.photo || ""
      })
    }));

    this.saveProfileDraft(normalized);
    await this.refreshRemoteData();
    const savedRemoteProfile = remoteProfiles.find((item) => item.id === user.id);
    return savedRemoteProfile
      ? { ...savedRemoteProfile, email: normalized.email, contactEmail: normalized.email, phone: normalized.phone, birthdate: normalized.birthdate }
      : normalized;
  },

  async clearProfiles(role) {
    if (!canUseRemote()) {
      if (!role) {
        removeStorage(STORAGE_KEYS.registeredProfiles);
        removeStorage(STORAGE_KEYS.contactRequests);
        return [];
      }
      const remaining = readProfiles().filter((profile) => profile.role !== role);
      writeProfiles(remaining);
      this.clearProfileDraft(role);
      return remaining;
    }

    const userId = currentSession.user.id;
    const detailTables = ["client_profiles", "professional_profiles"];

    // Se elimina la actividad relacionada para que el perfil no siga apareciendo en cruces ni historial.
    await assertNoError(await supabaseClient.from("contact_requests").delete().or(`sender_id.eq.${userId},recipient_id.eq.${userId}`));
    await assertNoError(await supabaseClient.from("private_profile_data").delete().eq("user_id", userId));
    await Promise.all([...new Set(detailTables)].map(async (table) =>
      assertNoError(await supabaseClient.from(table).delete().eq("user_id", userId))
    ));

    // El auth user sigue existiendo; desde el navegador solo limpiamos los datos públicos/privados de la app.
    await assertNoError(await supabaseClient.from("profiles").delete().eq("id", userId));

    this.clearProfileDraft();
    remoteProfiles = remoteProfiles.filter((profile) => profile.id !== userId);
    remoteRequests = remoteRequests.filter((request) => request.profile.id !== userId && request.target.id !== userId);
    remoteRatings = remoteRatings.filter((rating) => rating.raterId !== userId && rating.targetId !== userId);
    remotePrivateNotes = {};
    remoteProSubscription = null;
    await this.refreshRemoteData();
    return this.listProfiles(role);
  },

  listContactRequests(role, options = {}) {
    const requestOptions = { role, profileId: options.profileId };
    const viewerId = options.profileId || currentSession?.user?.id || "";
    const requests = (canUseRemote() ? remoteRequests : readStorage(STORAGE_KEYS.contactRequests, []))
      .map((request) => normalizeStoredRequest(request, requestOptions));
    return requests.filter((request) => {
      const roleMatches = !role || request.role === role;
      const directionMatches = !options.direction || options.direction === "all" || request.direction === options.direction;
      const isVisibleForUser = !viewerId || !(request.deletedBy || []).includes(viewerId);
      return roleMatches && directionMatches && isVisibleForUser;
    });
  },

  async createContactRequest(payload) {
    if (!canUseRemote()) {
      const requests = readStorage(STORAGE_KEYS.contactRequests, []);
      const request = normalizeStoredRequest({
        id: createId("request"),
        status: "pending",
        createdAt: new Date().toISOString(),
        senderRole: payload.role,
        recipientRole: oppositeRequestRole(payload.role),
        sender: payload.profile,
        recipient: payload.target,
        profile: payload.profile,
        target: payload.target,
        score: payload.score,
        message: payload.message,
        reasons: contactReasons(payload.reasons || [], payload.profile)
      }, { role: payload.role, profileId: payload.profile?.id });
      writeStorage(STORAGE_KEYS.contactRequests, [request, ...requests].slice(0, 24));
      return request;
    }

    const row = {
      sender_id: currentSession.user.id,
      recipient_id: payload.target.id,
      sender_role: payload.role,
      recipient_role: payload.role === "client" ? "professional" : "client",
      score: payload.score,
      message: payload.message,
      reasons: payload.reasons || []
    };
    row.reasons = contactReasons(row.reasons, payload.profile);
    const data = await assertNoError(
      await supabaseClient.from("contact_requests").insert(row).select("*").single()
    );
    await this.refreshRemoteData();
    const profilesById = new Map(remoteProfiles.map((profile) => [profile.id, profile]));
    return mapRemoteRequest(data, profilesById);
  },

  async markContactRequestRead(requestId) {
    if (!requestId) return null;
    const readerId = currentSession?.user?.id || "local";

    if (!canUseRemote()) {
      const requests = readStorage(STORAGE_KEYS.contactRequests, []);
      let updatedRequest = null;
      const updated = requests.map((request) => {
        if (request.id !== requestId) return request;
        const reasons = markReasonsRead(request.reasons || [], readerId);
        updatedRequest = normalizeStoredRequest({ ...request, reasons }, { profileId: readerId });
        return { ...request, reasons };
      });
      writeStorage(STORAGE_KEYS.contactRequests, updated);
      return updatedRequest;
    }

    const current = await assertNoError(
      await supabaseClient.from("contact_requests").select("reasons").eq("id", requestId).maybeSingle()
    );
    const reasons = markReasonsRead(current?.reasons || [], readerId);
    await assertNoError(
      await supabaseClient.from("contact_requests").update({ reasons }).eq("id", requestId)
    );
    await this.refreshRemoteData();
    return remoteRequests.find((request) => request.id === requestId) || null;
  },

  async markContactStage(requestId, stage = "contact") {
    if (!requestId) return null;
    const userId = currentSession?.user?.id || "local";
    const marker = stage === "service" ? markReasonsServiceCompleted : markReasonsContactStarted;

    if (!canUseRemote()) {
      const requests = readStorage(STORAGE_KEYS.contactRequests, []);
      let updatedRequest = null;
      const updated = requests.map((request) => {
        if (request.id !== requestId) return request;
        const reasons = marker(request.reasons || [], userId);
        updatedRequest = normalizeStoredRequest({ ...request, reasons }, { profileId: userId });
        return { ...request, reasons };
      });
      writeStorage(STORAGE_KEYS.contactRequests, updated);
      return updatedRequest;
    }

    const current = await assertNoError(
      await supabaseClient.from("contact_requests").select("reasons").eq("id", requestId).maybeSingle()
    );
    const reasons = marker(current?.reasons || [], userId);
    await assertNoError(
      await supabaseClient.from("contact_requests").update({ reasons }).eq("id", requestId)
    );
    await this.refreshRemoteData();
    return remoteRequests.find((request) => request.id === requestId) || null;
  },

  async markContactStarted(requestId) {
    return this.markContactStage(requestId, "contact");
  },

  async markServiceCompleted(requestId) {
    return this.markContactStage(requestId, "service");
  },

  async deleteContactRequests(requestIds, options = {}) {
    const ids = Array.isArray(requestIds) ? requestIds.filter(Boolean) : [requestIds].filter(Boolean);
    if (!ids.length) return this.listContactRequests(options.role, options);

    const viewerId = options.profileId || currentSession?.user?.id || "local";

    if (!canUseRemote()) {
      const requests = readStorage(STORAGE_KEYS.contactRequests, []);
      const updated = requests.map((request) => {
        if (!ids.includes(request.id)) return request;
        return { ...request, reasons: markReasonsDeleted(request.reasons || [], viewerId) };
      });
      writeStorage(STORAGE_KEYS.contactRequests, updated);
      return updated;
    }

    await Promise.all(ids.map(async (id) => {
      const current = await assertNoError(
        await supabaseClient.from("contact_requests").select("reasons").eq("id", id).maybeSingle()
      );
      const reasons = markReasonsDeleted(current?.reasons || [], viewerId);
      await assertNoError(
        await supabaseClient.from("contact_requests").update({ reasons }).eq("id", id)
      );
    }));

    await this.refreshRemoteData();
    return remoteRequests;
  },

  async clearContactRequests(role, options = {}) {
    const profileId = options.profileId || currentSession?.user?.id || "";
    const sentRequests = this.listContactRequests(role, { ...options, profileId, direction: "outgoing" });
    return this.deleteContactRequests(sentRequests.map((request) => request.id), { ...options, role, profileId });
  }
,

  getLegalConsentVersion() {
    return LEGAL_CONSENT_VERSION;
  },

  hasLegalConsent() {
    const user = currentSession?.user;
    if (!user) return true;
    const remoteConsent = legalConsentFromNotes(remotePrivateNotes);
    if (remoteConsent) return true;
    const localConsent = localLegalConsents()[currentUserKey(user)];
    return localConsent?.version === LEGAL_CONSENT_VERSION;
  },

  async acceptLegalConsent(consent = {}) {
    const user = currentSession?.user;
    if (!user) return null;
    const acceptedAt = new Date().toISOString();
    const payload = {
      version: LEGAL_CONSENT_VERSION,
      acceptedAt,
      role: getUserAccountRole(user) || consent.role || "",
      terms: Boolean(consent.terms),
      privacy: Boolean(consent.privacy),
      truthful: Boolean(consent.truthful),
      contact: Boolean(consent.contact),
      newsletter: Boolean(consent.newsletter)
    };

    writeLocalLegalConsent(currentUserKey(user), payload);
    remotePrivateNotes = { ...remotePrivateNotes, legalConsent: payload };

    if (canUseRemote()) {
      try {
        await assertNoError(await supabaseClient.from("private_profile_data").upsert({
          user_id: user.id,
          contact_email: user.email || null,
          private_notes: JSON.stringify(remotePrivateNotes)
        }));
      } catch (error) {
        // Si la política remota todavía no permite escribir datos privados, la aceptación queda guardada localmente.
      }
    }

    return payload;
  },

  getProSubscription(profileId) {
    const ownId = currentSession?.user?.id || "";
    const targetId = profileId || ownId || "local";
    if (canUseRemote() && (!profileId || targetId === ownId)) {
      return proDefaultSubscription(remoteProSubscription || { profileId: targetId, role: getUserAccountRole(), status: "FREE" });
    }
    const stored = readProSubscriptions()[targetId];
    const profileRow = this.listProfiles().find((item) => item.id === targetId);
    return proDefaultSubscription(stored || {
      profileId: targetId,
      role: profileRow?.role || "professional",
      status: profileRow?.proStatus || "FREE",
      plan: profileRow?.proPlan || "free",
      trialEndsAt: profileRow?.proTrialEndsAt || "",
      startedAt: profileRow?.proStartedAt || "",
      proInterest: profileRow?.proInterest || false,
      profileScore: profileRow?.profileScore || 0,
      profileRecommendations: profileRow?.profileRecommendations || []
    });
  },

  async registerProInterest(profile = {}) {
    const user = currentSession?.user;
    const profileId = canUseRemote() ? user?.id : profile.id;
    if (!profileId) throw new Error("Guarda primero tu perfil profesional para registrar tu interés.");
    if ((profile.role || getUserAccountRole(user)) !== "professional") {
      throw new Error("Fit Match PRO está pensado para cuentas profesionales.");
    }

    const recommendations = this.getProRecommendations(profile);
    const metrics = this.getProMetrics(profile);
    const current = this.getProSubscription(profileId);
    const subscription = proDefaultSubscription({
      ...current,
      profileId,
      role: "professional",
      status: current.status || "FREE",
      plan: current.plan || "free",
      proInterest: true,
      profileScore: metrics.profileStrength || 0,
      profileRecommendations: recommendations,
      updatedAt: new Date().toISOString()
    });

    if (!canUseRemote()) {
      writeProSubscription(profileId, subscription);
      return subscription;
    }

    remoteProSubscription = subscription;
    remotePrivateNotes = { ...remotePrivateNotes, proSubscription: subscription };
    await assertNoError(await supabaseClient.from("private_profile_data").upsert({
      user_id: profileId,
      contact_email: user.email || null,
      private_notes: JSON.stringify(remotePrivateNotes)
    }));

    await this.refreshRemoteData();
    return subscription;
  },

  getProMetrics(profile = {}) {
    const allRequests = this.listContactRequests(profile.role, { profileId: profile.id });
    const activeContacts = allRequests.filter((request) => !["rejected", "cancelled"].includes(request.status)).length;
    const ratings = this.listRatings().filter((rating) => rating.targetId === profile.id);
    const directorySize = profile.role === "professional" ? this.listProfiles("client").length : this.listProfiles("professional").length;
    const completedSignals = [profile.photo, profile.bio, profile.availability, profile.services?.length, profile.sport || profile.notes, profile.price].filter(Boolean).length;
    const matches = Math.max(0, directorySize);
    const views = Math.max(0, matches * 12 + activeContacts * 11 + ratings.length * 9 + completedSignals * 5);
    const conversion = views ? Math.min(99, Math.round((activeContacts / views) * 100)) : 0;
    return {
      views,
      matches,
      contacts: activeContacts,
      conversion,
      profileStrength: Math.min(100, 45 + completedSignals * 8 + ratings.length * 3)
    };
  },

  getProRecommendations(profile = {}) {
    const recommendations = [];
    if (!profile.photo) recommendations.push("Añade una foto clara para aumentar confianza.");
    if (!profile.bio || profile.bio.length < 80) recommendations.push("Amplía tu presentación profesional con método y experiencia.");
    if (!profile.availability) recommendations.push("Completa disponibilidad para facilitar el primer contacto.");
    if (!profile.services?.length) recommendations.push("Marca servicios concretos para mejorar el cruce de matches.");
    if (!profile.sport && !profile.notes) recommendations.push("Añade deportes, casos ideales o criterios de trabajo.");
    if (!recommendations.length) recommendations.push("Tu perfil tiene una base sólida. El siguiente paso será añadir vídeo, certificaciones y calendario.");
    return recommendations.slice(0, 4);
  },

  listRatings() {
    return dedupeRatings([...(canUseRemote() ? remoteRatings : []), ...readRatings()]);
  },

  getRatingSummary(targetId) {
    const ratings = this.listRatings().filter((rating) => rating.targetId === targetId);
    if (!ratings.length) return normalizeRatingSummary();
    const total = ratings.reduce((sum, rating) => sum + Number(rating.averageScore || 0), 0);
    return normalizeRatingSummary({ average: total / ratings.length, count: ratings.length });
  },

  getRatingForRequest(requestId, raterId, targetId, ratingType = "service") {
    const ratings = this.listRatings().filter((rating) => {
      const item = normalizeRating(rating);
      return item.raterId === raterId
        && item.targetId === targetId
        && item.ratingType === ratingType;
    });
    return ratings.find((rating) => rating.requestId === requestId) || ratings[0] || null;
  },

  async saveRating(payload = {}) {
    const user = currentSession?.user;
    const raterId = payload.raterId || user?.id || "local";
    const ratingType = payload.ratingType || payload.rating_type || "service";
    const normalized = normalizeRating({
      requestId: payload.requestId,
      raterId,
      raterRole: payload.raterRole,
      targetId: payload.target?.id || payload.targetId,
      targetRole: payload.target?.role || payload.targetRole,
      ratingType,
      criteria: {
        ...(payload.criteria || {}),
        _ratingType: ratingType,
        ...(payload.publicComment ? { _publicComment: payload.publicComment } : {})
      },
      publicComment: payload.publicComment || "",
      comment: payload.comment || ""
    });

    const localSaved = saveLocalRating(normalized);
    remoteRatings = dedupeRatings([localSaved, ...remoteRatings]);
    remoteProfiles = applyRatingSummaries(dedupeProfiles(remoteProfiles), this.listRatings());

    if (!canUseRemote() || !ratingsRemoteAvailable) {
      return localSaved;
    }

    const row = {
      request_id: null,
      rater_id: currentSession.user.id,
      target_id: normalized.targetId,
      rater_role: normalized.raterRole,
      target_role: normalized.targetRole,
      criteria: normalized.criteria,
      average_score: normalized.averageScore,
      comment: normalized.comment || null
    };

    try {
      const existingRows = await assertNoError(
        await supabaseClient
          .from("profile_ratings")
          .select("id, criteria")
          .eq("rater_id", row.rater_id)
          .eq("target_id", row.target_id)
      );
      const idsToReplace = (existingRows || [])
        .filter((item) => normalizeRating({ criteria: item.criteria }).ratingType === normalized.ratingType)
        .map((item) => item.id)
        .filter(Boolean);
      if (idsToReplace.length) {
        await assertNoError(
          await supabaseClient.from("profile_ratings").delete().in("id", idsToReplace)
        );
      }
      const data = await assertNoError(
        await supabaseClient.from("profile_ratings").insert(row).select("*").single()
      );
      const remoteSaved = normalizeRating(data);
      saveLocalRating(remoteSaved);
      remoteRatings = dedupeRatings([remoteSaved, ...remoteRatings, ...readRatings()]);
      await this.refreshRemoteData();
      return remoteSaved;
    } catch (error) {
      ratingsRemoteAvailable = false;
      remoteRatings = dedupeRatings([localSaved, ...remoteRatings]);
      remoteProfiles = applyRatingSummaries(dedupeProfiles(remoteProfiles), this.listRatings());
      return localSaved;
    }
  }

};
