const STORAGE_KEYS = {
  profileDrafts: "fit-match.profile-drafts.v2",
  registeredProfiles: "fit-match.registered-profiles.v2",
  contactRequests: "fit-match.contact-requests.v2"
};

const SUPABASE_CONFIG = window.FIT_MATCH_SUPABASE || {};
const supabaseClient = window.supabase?.createClient && SUPABASE_CONFIG.url && SUPABASE_CONFIG.publishableKey
  ? window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.publishableKey)
  : null;

let currentSession = null;
let remoteProfiles = [];
let remoteRequests = [];
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
  const accountKey = `${profile.role || "profile"}:${(profile.email || profile.id || createId("local")).toLowerCase()}`;

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
    createdAt: profile.createdAt || now,
    updatedAt: now
  };
}

function readProfiles() {
  return readStorage(STORAGE_KEYS.registeredProfiles, []);
}

function writeProfiles(profiles) {
  writeStorage(STORAGE_KEYS.registeredProfiles, profiles);
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
const READ_AT_PREFIX = "read_at:";
const READ_BY_PREFIX = "read_by:";
const DELETED_BY_PREFIX = "deleted_by:";

function unpackProfileNotes(value = "") {
  const lines = String(value || "").split(/\n+/);
  const visibleLines = [];
  let photo = "";

  lines.forEach((line) => {
    const cleanLine = line.trim();
    if (!cleanLine) return;
    if (cleanLine.startsWith(PROFILE_PHOTO_PREFIX)) {
      photo = decodeContactValue(cleanLine.slice(PROFILE_PHOTO_PREFIX.length));
      return;
    }
    visibleLines.push(line);
  });

  return {
    notes: visibleLines.join("\n").trim(),
    photo
  };
}

function packProfileNotes(notes = "", photo = "") {
  const cleanNotes = unpackProfileNotes(notes).notes;
  const parts = [];
  if (cleanNotes) parts.push(cleanNotes);
  if (photo) parts.push(`${PROFILE_PHOTO_PREFIX}${encodeContactValue(photo)}`);
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

function visibleReasons(reasons = []) {
  return reasons.filter((reason) => {
    const value = String(reason || "");
    return !value.startsWith(CONTACT_EMAIL_PREFIX)
      && !value.startsWith(CONTACT_PHONE_PREFIX)
      && !value.startsWith(READ_AT_PREFIX)
      && !value.startsWith(READ_BY_PREFIX)
      && !value.startsWith(DELETED_BY_PREFIX);
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

  return [...clients, ...professionals];
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

      try {
        const privateResult = await supabaseClient
          .from("private_profile_data")
          .select("contact_email, phone, private_notes")
          .eq("user_id", currentSession.user.id)
          .maybeSingle();
        if (!privateResult.error && privateResult.data) {
          const privateNotes = privateResult.data.private_notes ? JSON.parse(privateResult.data.private_notes) : {};
          remoteProfiles = remoteProfiles.map((profile) => profile.id === currentSession.user.id
            ? {
                ...profile,
                email: privateResult.data.contact_email || currentSession.user.email || "",
                contactEmail: privateResult.data.contact_email || currentSession.user.email || "",
                phone: privateResult.data.phone || "",
                birthdate: privateNotes.birthdate || "",
                photo: profile.photo || privateNotes.photo || ""
              }
            : profile);
        }
      } catch (error) {
        // Los datos privados no deben romper el directorio público si la política aún no los permite.
      }

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
    const profiles = canUseRemote() ? remoteProfiles : readProfiles();
    return role ? profiles.filter((profile) => profile.role === role) : profiles;
  },

  async saveProfile(profile) {
    if (!canUseRemote()) {
      const normalized = normalizeProfile(profile);
      const profiles = readProfiles();
      const index = profiles.findIndex((item) => item.id === normalized.id);

      if (index >= 0) {
        profiles[index] = normalized;
      } else {
        profiles.unshift(normalized);
      }

      writeProfiles(profiles);
      this.saveProfileDraft(normalized);
      return normalized;
    }

    const user = currentSession.user;
    const normalized = normalizeProfile({ ...profile, id: user.id, email: user.email || profile.email });
    const existingActiveProfile = remoteProfiles.find((item) => item.id === user.id);
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
      match_notes: packProfileNotes(normalized.notes, normalized.photo),
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
      private_notes: JSON.stringify({ birthdate: normalized.birthdate || "", photo: normalized.photo || "" })
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
};
