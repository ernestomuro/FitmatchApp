const dataProvider = window.FitMatchDataProvider;
const labels = dataProvider.getLabels();
const ADMIN_EMAIL = "ernestomuro1980@gmail.com";

const ROLE_COPY = {
  client: {
    onboardingTitle: "Así te encontrarán tus futuros clientes.",
    onboardingCopy:
      "Completa tu perfil para aparecer en mejores coincidencias.",
    roleHelpTitle: "Construye tu perfil",
    roleHelp:
      "Completa los datos clave para aparecer en mejores coincidencias.",
    submit: "Guardar perfil cliente y ver profesionales",
    matchesTitle: "Profesionales que encajan contigo",
    matchesCopy:
      "Elige por afinidad. Abre el perfil y decide.",
    requestTitle: "Solicitudes preparadas",
    requestCopy:
      "Elige un profesional compatible y prepara una solicitud con contexto real.",
    cardAction: "Solicitar servicio",
    modalTitle: "Solicitar servicio",
    modalText:
      "Vas a preparar una solicitud con tu perfil y el profesional seleccionado.",
    sendAction: "Enviar solicitud",
    sentPrefix: "Solicitud preparada para",
    sentNext:
      "Con cuentas reales, el profesional recibirá el perfil y podrá responder o proponer una primera llamada."
  },
  professional: {
    onboardingTitle: "Así te encontrarán tus futuros clientes.",
    onboardingCopy:
      "Completa tu perfil para aparecer en mejores coincidencias.",
    roleHelpTitle: "Construye tu perfil",
    roleHelp:
      "Completa los datos clave para aparecer en mejores coincidencias.",
    submit: "Guardar perfil profesional y ver clientes",
    matchesTitle: "Clientes que encajan contigo",
    matchesCopy:
      "Elige por afinidad. Abre el perfil y decide.",
    requestTitle: "Propuestas preparadas",
    requestCopy:
      "Elige un cliente compatible y prepara una propuesta clara y contextual.",
    cardAction: "Proponer plan",
    modalTitle: "Proponer plan",
    modalText:
      "Vas a preparar una propuesta con tu perfil profesional y el cliente seleccionado.",
    sendAction: "Enviar propuesta",
    sentPrefix: "Propuesta preparada para",
    sentNext:
      "Con cuentas reales, el cliente recibirá la propuesta y podrá aceptar, responder o reservar una llamada."
  }
};

const GOAL_OPTION_COPY = {
  client: {
    "fuerza": "Ganar fuerza",
    "perdida-grasa": "Perder grasa",
    "nutricion": "Mejorar nutrición",
    "movilidad": "Movilidad y salud",
    "rendimiento": "Mejorar rendimiento deportivo",
    "hipertrofia": "Ganar masa muscular",
    "resistencia": "Mejorar resistencia cardiovascular",
    "rehabilitacion": "Recuperación o rehabilitación",
    "competicion": "Preparar competición",
    "tecnica": "Mejorar técnica deportiva",
    "deporte-especifico": "Deporte específico",
    "salud": "Salud y hábitos",
    "flexibilidad": "Flexibilidad y movilidad",
    "postparto": "Postparto y readaptación"
  },
  professional: {
    "fuerza": "Especialista en fuerza",
    "perdida-grasa": "Especialista en pérdida de grasa",
    "nutricion": "Nutrición y hábitos",
    "movilidad": "Movilidad y salud",
    "rendimiento": "Rendimiento deportivo",
    "hipertrofia": "Hipertrofia y masa muscular",
    "resistencia": "Resistencia cardiovascular",
    "rehabilitacion": "Recuperación o rehabilitación",
    "competicion": "Preparación de competición",
    "tecnica": "Técnica deportiva",
    "deporte-especifico": "Deporte específico",
    "salud": "Salud y hábitos",
    "flexibilidad": "Flexibilidad y movilidad",
    "postparto": "Postparto y readaptación"
  }
};

const PROFILE_FIELD_COPY = {
  client: {
    goalLabel: "Qué quieres conseguir",
    goalHint: "Ayuda a encontrarte.",
    sportLabel: "Deporte o disciplina que practicas",
    sportHint: "Ayuda a afinar coincidencias.",
    modeLabel: "Cómo quieres trabajar",
    modeHint: "Visible en tu perfil.",
    levelLabel: "Tu nivel actual",
    levelHint: "Ayuda a ajustar el match.",
    servicesLegend: "Qué tipo de ayuda necesitas",
    servicesHint: "Selecciona lo que quieres ofrecer o encontrar.",
    priceLabel: "Presupuesto por sesión",
    priceHint: "Puedes modificarlo cuando quieras.",
    availabilityLabel: "Cuándo puedes entrenar o reunirte",
    availabilityHint: "Ayuda a saber cuándo puedes trabajar.",
    bioLabel: "¿Qué necesitas contar?",
    bioHint: "Describe en pocas líneas qué buscas.",
    notesLabel: "¿Qué debería saber el profesional?",
    notesHint: "Añade detalles que ayuden a mejorar el match.",
    bioPlaceholder: "Qué quieres conseguir, qué has probado antes o qué tipo de acompañamiento buscas.",
    notesPlaceholder: "Ej. lesión de rodilla, media maratón, perder grasa, pádel competitivo, disponibilidad mañanas."
  },
  professional: {
    goalLabel: "Tu especialidad principal",
    goalHint: "Ayuda a encontrarte.",
    sportLabel: "Deportes o disciplinas que trabajas",
    sportHint: "Ayuda a afinar coincidencias.",
    modeLabel: "Cómo ofreces tus servicios",
    modeHint: "Visible en tu perfil.",
    levelLabel: "Nivel de cliente que atiendes mejor",
    levelHint: "Ayuda a ajustar el match.",
    servicesLegend: "Servicios que ofreces",
    servicesHint: "Selecciona lo que quieres ofrecer o encontrar.",
    priceLabel: "Precio por sesión",
    priceHint: "Puedes modificarlo cuando quieras.",
    availabilityLabel: "Disponibilidad profesional",
    availabilityHint: "Ayuda a saber cuándo puedes trabajar.",
    bioLabel: "¿Cómo quieres que te recuerden?",
    bioHint: "Describe en pocas líneas cómo ayudas a tus clientes.",
    notesLabel: "¿Con qué personas trabajas mejor?",
    notesHint: "Describe el tipo de cliente con el que consigues mejores resultados.",
    bioPlaceholder: "Tu enfoque, experiencia, especialidades y tipo de acompañamiento que ofreces.",
    notesPlaceholder: "Ej. pérdida de grasa, fuerza, running, readaptación, clientes principiantes, seguimiento online."
  }
};


const SERVICE_RATING_CRITERIA = {
  professional: [
    ["communication", "Comunicación"],
    ["clarity", "Claridad del plan"],
    ["professionalism", "Profesionalidad"],
    ["adaptation", "Adaptación"],
    ["trust", "Confianza"]
  ],
  client: [
    ["clarity", "Claridad"],
    ["commitment", "Compromiso"],
    ["communication", "Comunicación"],
    ["punctuality", "Puntualidad"],
    ["respect", "Respeto"]
  ]
};

const FIRST_CONTACT_RATING_CRITERIA = {
  professional: [
    ["response", "Respuesta"],
    ["clarity", "Claridad"],
    ["respect", "Trato"],
    ["interest", "Interés real"],
    ["trust", "Confianza inicial"]
  ],
  client: [
    ["clarity", "Claridad"],
    ["respect", "Respeto"],
    ["commitment", "Seriedad"],
    ["communication", "Comunicación"],
    ["fit", "Encaje inicial"]
  ]
};

const RATING_CRITERIA = SERVICE_RATING_CRITERIA;
const RATING_TYPES = {
  first_contact: {
    label: "Primer contacto",
    actionLabel: "Valorar primer contacto",
    savedLabel: "Primer contacto valorado",
    availableLabel: "Primer contacto disponible",
    commentPlaceholder: "Ej. Respondió con claridad y me dio buena impresión inicial.",
    publicHint: "Ayuda a entender cómo fue el primer acercamiento, sin valorar todavía el servicio completo."
  },
  service: {
    label: "Servicio real",
    actionLabel: "Valorar servicio real",
    savedLabel: "Servicio valorado",
    availableLabel: "Servicio real disponible",
    commentPlaceholder: "Ej. Buen seguimiento, planificación clara y adaptación a mi situación.",
    publicHint: "Resume la experiencia después de trabajar juntos o realizar una sesión real."
  }
};

function ratingTargetIdsForPerson(person = {}) {
  const hasIdentity = person?.id
    || person?.userId
    || person?.user_id
    || person?.email
    || person?.contactEmail
    || person?.contact_email
    || person?.name;
  if (!hasIdentity) return [];
  return relatedProfileIdsForPerson(person).filter(Boolean);
}

function ratingDisplayType(rating = {}) {
  return normalizeRatingType(rating.ratingType || rating.criteria?._ratingType || "service");
}

function dedupeRatingsForDisplay(ratings = []) {
  const map = new Map();
  ratings.forEach((rating) => {
    const key = `${rating.raterId || rating.rater_id || rating.requestId || rating.id || "anon"}:${ratingDisplayType(rating)}`;
    const current = map.get(key);
    const currentTime = current ? new Date(current.updatedAt || current.createdAt || 0).getTime() : 0;
    const nextTime = new Date(rating.updatedAt || rating.createdAt || 0).getTime();
    if (!current || nextTime >= currentTime) map.set(key, rating);
  });
  return Array.from(map.values());
}

function ratingSummaryFromList(ratings = []) {
  const validRatings = ratings.filter((rating) => Number(rating.averageScore || 0) > 0);
  if (!validRatings.length) return { average: 0, count: 0, label: "Sin valoraciones" };
  const total = validRatings.reduce((sum, rating) => sum + Number(rating.averageScore || 0), 0);
  return { average: roundRating(total / validRatings.length), count: validRatings.length };
}

function ratingSummaryFor(person) {
  const targetIds = ratingTargetIdsForPerson(person);
  const ratings = dedupeRatingsForDisplay((dataProvider.listRatings?.() || []).filter((rating) => targetIds.includes(rating.targetId)));
  if (ratings.length) return ratingSummaryFromList(ratings);
  return dataProvider.getRatingSummary?.(person?.id) || person?.ratingSummary || { average: 0, count: 0, label: "Sin valoraciones" };
}

function ratingText(summary) {
  if (!summary?.count) return "Sin valoraciones";
  return `${summary.average}/5 · ${summary.count} valoración${summary.count === 1 ? "" : "es"}`;
}

function ratingSavedFeedback(target, ratingType) {
  const summary = ratingSummaryFor(target);
  const config = ratingConfig(ratingType);
  const targetName = target?.name || "esta cuenta";
  return {
    title: `${config.label} guardado`,
    profileText: `La puntuación ya se suma al perfil público de ${targetName}.`,
    summaryText: summary.count
      ? `Media visible ahora: ${ratingText(summary)}.`
      : "La valoración se ha guardado y aparecerá en cuanto se actualice el perfil.",
    routeText: "Perfil actualizado."
  };
}

function createRatingBadge(person, className = "rating-badge") {
  const summary = ratingSummaryFor(person);
  const text = summary.count ? `★ ${summary.average}/5 · ${summary.count}` : "★ Nuevo";
  const badge = createElement("span", className, text);
  badge.setAttribute("aria-label", summary.count ? ratingText(summary) : "Sin valoraciones todavía");
  return badge;
}

function normalizeRatingType(ratingType = "service") {
  return ratingType === "first_contact" ? "first_contact" : "service";
}

function ratingConfig(ratingType = "service") {
  return RATING_TYPES[normalizeRatingType(ratingType)] || RATING_TYPES.service;
}

function ratingCriteriaForRole(role, ratingType = "service") {
  const criteriaByRole = normalizeRatingType(ratingType) === "first_contact" ? FIRST_CONTACT_RATING_CRITERIA : SERVICE_RATING_CRITERIA;
  return criteriaByRole[role] || criteriaByRole.professional;
}

function roundRating(value) {
  return Math.round(Number(value || 0) * 10) / 10;
}

function ratingsForPerson(person, ratingType = "") {
  const targetIds = ratingTargetIdsForPerson(person);
  const expectedType = ratingType ? normalizeRatingType(ratingType) : "";
  return dedupeRatingsForDisplay((dataProvider.listRatings?.() || []).filter((rating) => {
    const type = ratingDisplayType(rating);
    return targetIds.includes(rating.targetId) && (!expectedType || type === expectedType);
  }));
}

function publicRatingCommentsFor(person) {
  return ratingsForPerson(person)
    .map((rating) => ({
      ...rating,
      publicComment: (rating.publicComment || rating.criteria?._publicComment || "").trim()
    }))
    .filter((rating) => rating.publicComment)
    .sort((a, b) => new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0));
}

function ratingBreakdownFor(person, ratingType = "service") {
  const criteria = ratingCriteriaForRole(person?.role, ratingType);
  const ratings = ratingsForPerson(person, ratingType);
  const summary = ratings.length
    ? { average: roundRating(ratings.reduce((sum, rating) => sum + Number(rating.averageScore || 0), 0) / ratings.length), count: ratings.length }
    : { average: 0, count: 0, label: "Sin valoraciones" };
  const rows = criteria.map(([key, labelText]) => {
    const values = ratings
      .map((rating) => Number(rating.criteria?.[key]))
      .filter((value) => value >= 1 && value <= 5);
    const average = values.length
      ? roundRating(values.reduce((sum, value) => sum + value, 0) / values.length)
      : 0;
    return {
      key,
      label: labelText,
      average,
      count: values.length
    };
  });
  return { summary, rows };
}

function createRatingMomentSummary(person, ratingType = "service") {
  const breakdown = ratingBreakdownFor(person, ratingType);
  const config = ratingConfig(ratingType);
  const group = createElement("div", `rating-moment-summary rating-moment-summary-${normalizeRatingType(ratingType)}`);
  group.append(
    createElement("strong", "", config.label),
    createElement("span", "", breakdown.summary.count ? `${breakdown.summary.average}/5` : "--"),
    createElement("small", "", breakdown.summary.count ? `${breakdown.summary.count} valoración${breakdown.summary.count === 1 ? "" : "es"}` : "Sin datos")
  );
  return group;
}

function createRatingBreakdownSection(person) {
  const summary = ratingSummaryFor(person);
  const section = createElement("section", "profile-detail-section rating-breakdown-section profile-rating-section");

  const heading = createElement("div", "rating-breakdown-heading");
  const score = createElement("div", "rating-breakdown-score");
  const scoreValue = createElement("strong", "", summary.count ? String(summary.average) : "--");
  const scoreMeta = createElement("span", "", summary.count ? `/5 · ${summary.count} valoración${summary.count === 1 ? "" : "es"}` : "Sin valoraciones");
  score.append(scoreValue, scoreMeta);

  const copy = createElement("div", "rating-breakdown-copy");
  copy.append(
    createElement("span", "micro-label", "Valoraciones"),
    createElement("strong", "", summary.count ? "Reputación" : "Sin valoraciones")
  );
  heading.append(score, copy);

  const moments = createElement("div", "rating-moment-grid");
  moments.append(
    createRatingMomentSummary(person, "first_contact"),
    createRatingMomentSummary(person, "service")
  );

  section.append(heading, moments);
  return section;
}

function createBlankProfile(role) {
  return {
    id: "",
    role,
    name: "",
    email: "",
    birthdate: "",
    phone: "",
    photo: "",
    city: "",
    goal: "fuerza",
    sport: "",
    mode: "online",
    level: "principiante",
    services: [],
    price: "",
    availability: "",
    bio: "",
    notes: "",
    proStatus: "FREE",
    proPlan: "free",
    proTrialEndsAt: "",
    proStartedAt: "",
    verified: false
  };
}

const initialRole = dataProvider.getInitialRole();
const initialDraft = dataProvider.getProfileDraft(initialRole);
const profile = {
  ...createBlankProfile(initialRole),
  ...(initialDraft || {})
};

let selectedMatch = null;
let modalOpener = null;
let renderTimer = null;
let isProcessingPhoto = false;
let selectedRequestIds = new Set();
let openRequestIds = new Set();
let openRatingIds = new Set();
let recentRatingFeedback = new Map();
let openConversationIds = new Set();
let isSavingProfile = false;

const HIDDEN_MATCHES_KEY = "fit-match.hidden-matches.v1";
const MAX_VISIBLE_MATCHES = 5;

function readHiddenMatchMap() {
  try {
    return JSON.parse(window.localStorage.getItem(HIDDEN_MATCHES_KEY) || "{}");
  } catch (error) {
    return {};
  }
}

function writeHiddenMatchMap(map) {
  try {
    window.localStorage.setItem(HIDDEN_MATCHES_KEY, JSON.stringify(map));
  } catch (error) {
    // Ocultar matches es una preferencia visual; si el navegador no guarda, la app sigue funcionando.
  }
}

function currentMatchBucketKey() {
  const userId = currentUser()?.id || profile.id || profile.email || "local";
  return `${profile.role}:${String(userId).toLowerCase()}`;
}

function hiddenMatchIds() {
  const map = readHiddenMatchMap();
  return Array.isArray(map[currentMatchBucketKey()]) ? map[currentMatchBucketKey()] : [];
}

function isMatchHidden(matchId) {
  return hiddenMatchIds().includes(matchId);
}

function hideMatch(matchId) {
  if (!matchId) return;
  const map = readHiddenMatchMap();
  const key = currentMatchBucketKey();
  const nextIds = new Set(Array.isArray(map[key]) ? map[key] : []);
  nextIds.add(matchId);
  map[key] = Array.from(nextIds);
  writeHiddenMatchMap(map);
}

function restoreHiddenMatches() {
  const map = readHiddenMatchMap();
  delete map[currentMatchBucketKey()];
  writeHiddenMatchMap(map);
}

const roleButtons = document.querySelectorAll(".role-option");
const form = document.querySelector("#profileForm");
const profileSubmitButton = form?.querySelector('button[type="submit"]');
const matchList = document.querySelector("#matchList");
const sortInput = document.querySelector("#sortInput");
const modal = document.querySelector("#modal");
const modalTitle = document.querySelector("#modalTitle");
const modalText = document.querySelector("#modalText");
const profileDetail = document.querySelector("#profileDetail");
const messageInput = document.querySelector("#messageInput");
const requestBox = document.querySelector("#requestBox");
const matchesPanel = document.querySelector("#matches");
const matchesTitle = document.querySelector("#matchesTitle");
const matchesCopy = document.querySelector("#matchesCopy");
const resultsSummary = document.querySelector("#resultsSummary");
const onboardingTitle = document.querySelector("#onboardingTitle");
const onboardingCopy = document.querySelector("#onboardingCopy");
const roleHelp = document.querySelector("#roleHelp");
const requestsTitle = document.querySelector("#requestsTitle");
const requestsCopy = document.querySelector("#requestsCopy");
const sendRequestButton = document.querySelector("#sendRequest");
const resetProfileButton = document.querySelector("#resetProfile");
const clearProfilesButton = document.querySelector("#clearProfiles");
const profileStatusTitle = document.querySelector("#profileStatusTitle");
const profileStatusCopy = document.querySelector("#profileStatusCopy");
const profileStatusBar = document.querySelector("#profileStatusBar");
const profileBuilderProgressValue = document.querySelector("#profileBuilderProgressValue");
const profileBuilderProgressBar = document.querySelector("#profileBuilderProgressBar");
const profileBuilderProgressCopy = document.querySelector("#profileBuilderProgressCopy");
const savedRoleLabel = document.querySelector("#savedRoleLabel");
const savedRequestsCount = document.querySelector("#savedRequestsCount");
const requestList = document.querySelector("#requestList");
const ratingList = document.querySelector("#ratingList");
const ratingHistoryTitle = document.querySelector("#ratingHistoryTitle");
const clearRequestsButton = document.querySelector("#clearRequests");
const historyTitle = document.querySelector("#historyTitle");
const priceLabel = document.querySelector("#priceLabel");
const goalLabel = document.querySelector("#goalLabel");
const goalHint = document.querySelector("#goalHint");
const sportLabel = document.querySelector("#sportLabel");
const sportHint = document.querySelector("#sportHint");
const modeLabel = document.querySelector("#modeLabel");
const modeHint = document.querySelector("#modeHint");
const levelLabel = document.querySelector("#levelLabel");
const levelHint = document.querySelector("#levelHint");
const servicesLegend = document.querySelector("#servicesLegend");
const servicesHint = document.querySelector("fieldset .field-hint");
const profileWorkKicker = document.querySelector("#profileWorkKicker");
const profileWorkTitle = document.querySelector("#profileWorkTitle");
const profileWorkCopy = document.querySelector("#profileWorkCopy");
const profileOfferKicker = document.querySelector("#profileOfferKicker");
const profileOfferTitle = document.querySelector("#profileOfferTitle");
const profileOfferCopy = document.querySelector("#profileOfferCopy");
const priceHint = document.querySelector("#priceHint");
const availabilityLabel = document.querySelector("#availabilityLabel");
const availabilityHint = document.querySelector("#availabilityHint");
const bioLabel = document.querySelector("#bioLabel");
const bioHint = document.querySelector("#bioHint");
const bioInput = document.querySelector("#bioInput");
const notesLabel = document.querySelector("#notesLabel");
const notesHint = document.querySelector("#notesHint");
const notesInput = document.querySelector("#notesInput");
const authPanel = document.querySelector("#authPanel");
const authForm = document.querySelector("#authForm");
const authTitle = document.querySelector("#authTitle");
const authStatus = document.querySelector("#authStatus");
const authEmailInput = document.querySelector("#authEmailInput");
const authPasswordInput = document.querySelector("#authPasswordInput");
const accountRoleTitle = document.querySelector("#accountRoleTitle");
const accountRoleCopy = document.querySelector("#accountRoleCopy");
const accountHeaderActionButton = document.querySelector("#accountHeaderActionButton");
const createAccountRouteButton = document.querySelector("#createAccountRouteButton");
const signInButton = document.querySelector("#signInButton");
const connectedAccountEmail = document.querySelector("#connectedAccountEmail");
const signupConnectedEmail = document.querySelector("#signupConnectedEmail");
const signupSignOutButton = document.querySelector("#signupSignOutButton");
const signupPasswordInput = document.querySelector("#signupPasswordInput");
const signupPasswordConfirmInput = document.querySelector("#signupPasswordConfirmInput");
const signupFields = document.querySelector("#signupFields");
const signOutButton = document.querySelector("#signOutButton");
const accountWelcomeCard = document.querySelector("#accountWelcomeCard");
const authLoginFields = document.querySelector("#authLoginFields");
const accountWorkspace = document.querySelector("#accountWorkspace");
const accountWorkspaceTitle = document.querySelector("#accountWorkspaceTitle");
const accountWorkspaceCopy = document.querySelector("#accountWorkspaceCopy");
const accountEmailValue = document.querySelector("#accountEmailValue");
const accountRoleValue = document.querySelector("#accountRoleValue");
const accountCityValue = document.querySelector("#accountCityValue");
const accountGoalValue = document.querySelector("#accountGoalValue");
const accountStatusValue = document.querySelector("#accountStatusValue");
const accountCompletionValue = document.querySelector("#accountCompletionValue");
const accountDetailPrimaryLabel = document.querySelector("#accountDetailPrimaryLabel");
const accountDetailPrimary = document.querySelector("#accountDetailPrimary");
const accountDetailSecondaryLabel = document.querySelector("#accountDetailSecondaryLabel");
const accountDetailSecondary = document.querySelector("#accountDetailSecondary");
const accountDetailCity = document.querySelector("#accountDetailCity");
const accountDetailLevel = document.querySelector("#accountDetailLevel");
const accountDetailMatches = document.querySelector("#accountDetailMatches");
const accountDetailContactsLabel = document.querySelector("#accountDetailContactsLabel");
const accountDetailContacts = document.querySelector("#accountDetailContacts");
const accountDetailCompletion = document.querySelector("#accountDetailCompletion");
const accountDetailActivity = document.querySelector("#accountDetailActivity");
const accountAside = document.querySelector("#accountAside");
const accountAsideLabel = document.querySelector("#accountAsideLabel");
const accountAsideTitle = document.querySelector("#accountAsideTitle");
const accountAsideCopy = document.querySelector("#accountAsideCopy");
const accountProgressCard = document.querySelector("#accountProgressCard");
const accountProgressTitle = document.querySelector("#accountProgressTitle");
const accountProgressBar = document.querySelector("#accountProgressBar");
const accountCompletedFields = document.querySelector("#accountCompletedFields");
const accountPendingFields = document.querySelector("#accountPendingFields");
const accountProfileRecommendation = document.querySelector("#accountProfileRecommendation");
const accountActivityCard = document.querySelector("#accountActivityCard");
const accountActivityMatches = document.querySelector("#accountActivityMatches");
const accountActivityContacts = document.querySelector("#accountActivityContacts");
const accountActivityPending = document.querySelector("#accountActivityPending");
const accountActivityUpdated = document.querySelector("#accountActivityUpdated");
const accountContextScore = document.querySelector("#accountContextScore");
const accountContextTitle = document.querySelector("#accountContextTitle");
const accountContextCopy = document.querySelector("#accountContextCopy");
const accountContextMatches = document.querySelector("#accountContextMatches");
const accountContextContacts = document.querySelector("#accountContextContacts");
const accountContextMessages = document.querySelector("#accountContextMessages");
const accountContextDelta = document.querySelector("#accountContextDelta");
const accountRatingCard = document.querySelector("#accountRatingCard");
const accountRatingTitle = document.querySelector("#accountRatingTitle");
const accountRatingCopy = document.querySelector("#accountRatingCopy");
const accountRatingAverage = document.querySelector("#accountRatingAverage");
const accountRatingCount = document.querySelector("#accountRatingCount");
const accountRatingFirstContact = document.querySelector("#accountRatingFirstContact");
const accountRatingService = document.querySelector("#accountRatingService");
const profileContextCard = document.querySelector("#profileContextCard");
const profileContextScore = document.querySelector("#profileContextScore");
const profileContextScoreLabel = document.querySelector("#profileContextScoreLabel");
const profileContextKicker = document.querySelector("#profileContextKicker");
const profileContextTitle = document.querySelector("#profileContextTitle");
const profileContextCopy = document.querySelector("#profileContextCopy");
const profileContextSignals = document.querySelector("#profileContextSignals");
const matchesContextScore = document.querySelector("#matchesContextScore");
const photoInput = document.querySelector("#photoInput");
const photoPreview = document.querySelector("#photoPreview");
const removePhotoButton = document.querySelector("#removePhotoButton");
const profileHomeCard = document.querySelector("#profileHomeCard");
const profileHomePhoto = document.querySelector("#profileHomePhoto");
const profileHomeName = document.querySelector("#profileHomeName");
const profileHomeSummary = document.querySelector("#profileHomeSummary");
const profileHomeMatches = document.querySelector("#profileHomeMatches");
const profileHomeContacts = document.querySelector("#profileHomeContacts");
const profileHomeMessages = document.querySelector("#profileHomeMessages");
const profileHomeAffinity = document.querySelector("#profileHomeAffinity");
const profileHomeUnreadAlert = document.querySelector("#profileHomeUnreadAlert");
const proPanel = document.querySelector("#proPanel");
const proStatusBadge = document.querySelector("#proStatusBadge");
const proPanelTitle = document.querySelector("#proPanelTitle");
const proPanelCopy = document.querySelector("#proPanelCopy");
const proMetricViews = document.querySelector("#proMetricViews");
const proMetricMatches = document.querySelector("#proMetricMatches");
const proMetricContacts = document.querySelector("#proMetricContacts");
const proMetricConversion = document.querySelector("#proMetricConversion");
const proRecommendations = document.querySelector("#proRecommendations");
const proProfileScore = document.querySelector("#proProfileScore");
const proScoreState = document.querySelector("#proScoreState");
const proScoreActions = document.querySelector("#proScoreActions");
const proLockMessage = document.querySelector("#proLockMessage");
const proInterestButton = document.querySelector("#proInterestButton");
const proPaymentNote = document.querySelector("#proPaymentNote");
const legalModal = document.querySelector("#legalModal");
const acceptLegalTermsButton = document.querySelector("#acceptLegalTerms");
const legalChecks = document.querySelectorAll("[data-legal-check]");
const signupLegalChecks = document.querySelectorAll("[data-signup-legal-check]");
const legalDocModal = document.querySelector("#legalDocModal");
const legalDocKicker = document.querySelector("#legalDocKicker");
const legalDocTitle = document.querySelector("#legalDocTitle");
const legalDocIntro = document.querySelector("#legalDocIntro");
const legalDocContent = document.querySelector("#legalDocContent");
const closeLegalDocModalButton = document.querySelector("#closeLegalDocModal");
const requestAccountDeletionButton = document.querySelector("#requestAccountDeletion");
const authActionButtons = document.querySelectorAll("[data-auth-action]");
const appViews = document.querySelectorAll(".app-view");
const viewButtons = document.querySelectorAll("[data-view]");
const roleStartButtons = document.querySelectorAll("[data-start-role]");
const adminNavButton = document.querySelector("#adminNavButton");
const adminRefreshButton = document.querySelector("#adminRefreshButton");
const adminModeBadge = document.querySelector("#adminModeBadge");
const adminDeniedCard = document.querySelector("#adminDeniedCard");
const adminDashboard = document.querySelector("#adminDashboard");
const adminPeriodFilter = document.querySelector("#adminPeriodFilter");
const adminPeriodLabel = document.querySelector("#adminPeriodLabel");
const adminMetricProfiles = document.querySelector("#adminMetricProfiles");
const adminMetricRoleSplit = document.querySelector("#adminMetricRoleSplit");
const adminMetricClients = document.querySelector("#adminMetricClients");
const adminMetricClientsTrend = document.querySelector("#adminMetricClientsTrend");
const adminMetricProfessionals = document.querySelector("#adminMetricProfessionals");
const adminMetricProfessionalsTrend = document.querySelector("#adminMetricProfessionalsTrend");
const adminMetricActiveToday = document.querySelector("#adminMetricActiveToday");
const adminMetricActiveTrend = document.querySelector("#adminMetricActiveTrend");
const adminMetricCompleteProfiles = document.querySelector("#adminMetricCompleteProfiles");
const adminMetricCompleteNote = document.querySelector("#adminMetricCompleteNote");
const adminMetricMatches = document.querySelector("#adminMetricMatches");
const adminMetricMatchesTrend = document.querySelector("#adminMetricMatchesTrend");
const adminMetricContacts = document.querySelector("#adminMetricContacts");
const adminMetricPending = document.querySelector("#adminMetricPending");
const adminMetricRatings = document.querySelector("#adminMetricRatings");
const adminMetricAverage = document.querySelector("#adminMetricAverage");
const adminMetricReports = document.querySelector("#adminMetricReports");
const adminMetricReportsNote = document.querySelector("#adminMetricReportsNote");
const adminAlertList = document.querySelector("#adminAlertList");
const adminFunnelList = document.querySelector("#adminFunnelList");
const adminTimeList = document.querySelector("#adminTimeList");
const adminNoProgressList = document.querySelector("#adminNoProgressList");
const adminMatchQualityList = document.querySelector("#adminMatchQualityList");
const adminMissingFieldsList = document.querySelector("#adminMissingFieldsList");
const adminRecentActivity = document.querySelector("#adminRecentActivity");
const adminReportStatusFilter = document.querySelector("#adminReportStatusFilter");
const adminReportReasonFilter = document.querySelector("#adminReportReasonFilter");
const adminReportPriorityFilter = document.querySelector("#adminReportPriorityFilter");
const adminReportList = document.querySelector("#adminReportList");
const adminReputationList = document.querySelector("#adminReputationList");
const adminUserList = document.querySelector("#adminUserList");
const adminLastSync = document.querySelector("#adminLastSync");

const LEGAL_DOCUMENTS = {
  privacy: {
    kicker: "Política de Privacidad",
    title: "Política de Privacidad Fit Match",
    intro: "Fit Match utiliza datos personales para crear perfiles, calcular afinidades y facilitar conexiones profesionales con contexto.",
    sections: [
      ["Qué datos recopilamos", ["Nombre y datos de cuenta como email.", "Ciudad y datos básicos del perfil.", "Objetivos, especialidad, modalidad, nivel, servicios y preferencias.", "Información de contacto como email o teléfono cuando decides participar en una solicitud."]],
      ["Para qué los utilizamos", ["Crear y mantener tu perfil.", "Calcular afinidades y mostrar matches compatibles.", "Facilitar solicitudes, propuestas y contacto entre usuarios.", "Mejorar la experiencia y seguridad de la plataforma."]],
      ["Qué no hacemos", ["No vendemos datos personales.", "No cedemos información con fines comerciales.", "No mostramos email, teléfono ni datos privados en tarjetas públicas sin autorización."]],
      ["Derechos del usuario", ["Puedes acceder, modificar, descargar o eliminar tu información.", "Puedes solicitar la cancelación de tu cuenta y la eliminación completa de datos cuando proceda."]],
      ["Conservación", ["Conservamos los datos mientras exista la cuenta o mientras sea necesario por obligaciones legales o de seguridad."]]
    ]
  },
  terms: {
    kicker: "Términos y Condiciones",
    title: "Términos y Condiciones Fit Match",
    intro: "Fit Match es una plataforma tecnológica que ayuda a conectar clientes y profesionales mediante afinidad de perfil.",
    sections: [
      ["Naturaleza del servicio", ["Fit Match no presta directamente servicios deportivos, nutricionales, sanitarios ni de entrenamiento.", "La plataforma facilita descubrimiento, compatibilidad y contacto entre usuarios."]],
      ["Responsabilidad de usuarios", ["Cada profesional es responsable de su actividad, formación, comunicaciones y servicios ofrecidos.", "Cada cliente decide libremente con quién contactar y qué acuerdos aceptar."]],
      ["Resultados y salud", ["Fit Match no garantiza resultados físicos, deportivos, económicos ni profesionales.", "La plataforma no sustituye asesoramiento médico, diagnóstico, tratamiento ni seguimiento sanitario."]],
      ["Acuerdos entre usuarios", ["Los precios, horarios, servicios, cancelaciones y condiciones concretas se acuerdan directamente entre cliente y profesional."]]
    ]
  },
  legalNotice: {
    kicker: "Aviso Legal",
    title: "Aviso Legal",
    intro: "Estructura preparada para completar cuando la empresa esté constituida y el dominio definitivo esté activo.",
    sections: [
      ["Datos pendientes", ["Titular de la plataforma: pendiente de completar.", "NIF/CIF: pendiente de completar.", "Dirección: pendiente de completar.", "Email legal: pendiente de completar.", "Dominio oficial: pendiente de completar."]],
      ["Uso de la plataforma", ["El usuario se compromete a utilizar Fit Match de forma lícita, responsable y respetuosa."]]
    ]
  },
  cookies: {
    kicker: "Política de Cookies",
    title: "Política de Cookies",
    intro: "En esta fase Fit Match solo contempla cookies o almacenamiento técnico necesario para que la app funcione.",
    sections: [
      ["Uso actual", ["Sesión de usuario y funcionamiento técnico de Supabase.", "Preferencias necesarias como ruta seleccionada, consentimiento o estado local de la interfaz."]],
      ["Futuro", ["La estructura queda preparada para Analytics, Pixel u otras herramientas, pero no se activa un banner complejo hasta que existan cookies no técnicas.", "Si se añaden herramientas de medición o publicidad, se pedirá consentimiento específico cuando corresponda."]]
    ]
  },
  conduct: {
    kicker: "Código de Conducta",
    title: "Código de Conducta Fit Match",
    intro: "Fit Match nace para crear conexiones profesionales basadas en la confianza, el respeto y la transparencia.",
    sections: [
      ["Todos los usuarios aceptan", ["Mantener información veraz.", "Tratar con respeto al resto de usuarios.", "No utilizar lenguaje ofensivo.", "No realizar spam.", "No utilizar la plataforma para fines ilícitos.", "Mantener una actitud profesional.", "Respetar la privacidad de otros usuarios.", "Informar si detectan perfiles falsos."]],
      ["Principio final", ["La confianza es el activo más importante de Fit Match."]]
    ]
  },
  security: {
    kicker: "Seguridad y Protección de Datos",
    title: "Protección de tus datos",
    intro: "Tu privacidad es una prioridad. Fit Match muestra solo la información necesaria para crear conexiones profesionales útiles.",
    sections: [
      ["Cómo protegemos la información", ["Los datos viajan cifrados mediante conexiones seguras.", "Cada usuario controla su información y puede editar su perfil.", "Solo se muestra la información necesaria para facilitar conexiones profesionales.", "No compartimos datos con terceros para publicidad.", "Utilizamos infraestructura segura para proteger la información."]]
    ]
  },
  rights: {
    kicker: "Derechos del Usuario",
    title: "Derechos del Usuario",
    intro: "Cualquier usuario puede mantener control sobre su información dentro de Fit Match.",
    sections: [
      ["Puedes solicitar", ["Modificar tu perfil.", "Recibir una copia de tus datos.", "Eliminar tu cuenta.", "Solicitar la eliminación completa de tu información."]],
      ["Estado actual", ["La edición de perfil ya está disponible. La descarga guiada y eliminación completa quedarán preparadas para la siguiente fase de beta."]]
    ]
  },
  rgpdContact: {
    kicker: "Contacto RGPD",
    title: "Contacto RGPD",
    intro: "Canal preparado para solicitudes de privacidad y protección de datos.",
    sections: [
      ["Contacto", ["Email RGPD: pendiente de activar antes de la apertura pública amplia.", "Mientras la app esté en beta controlada, las solicitudes se gestionarán manualmente por el responsable del proyecto."]],
      ["Qué puedes pedir", ["Acceso a tus datos.", "Rectificación o actualización.", "Eliminación de cuenta o datos.", "Consulta sobre privacidad."]]
    ]
  }
};

const viewAliases = {
  home: "home",
  inicio: "home",
  account: "account",
  cuenta: "account",
  login: "account",
  register: "register",
  registro: "register",
  onboarding: "register",
  questionnaire: "register",
  cuestionario: "register",
  matches: "matches",
  match: "matches",
  contacts: "contacts",
  contacto: "contacts",
  contactos: "contacts",
  solicitudes: "contacts",
  ratings: "ratings",
  rating: "ratings",
  valoraciones: "ratings",
  valoracion: "ratings",
  valoración: "ratings",
  trust: "account",
  confianza: "account",
  legal: "account",
  privacidad: "account",
  admin: "admin",
  administracion: "admin",
  administración: "admin",
  panel: "admin"
};
let activeView = "home";

function normalizeView(viewName) {
  const cleanName = String(viewName || "home").replace("#", "").trim();
  return viewAliases[cleanName] || "home";
}

function isAdminSession() {
  return cleanEmail(currentUser()?.email || "") === ADMIN_EMAIL;
}

function updateAdminNavigation() {
  if (!adminNavButton) return;
  const enabled = isAdminSession();
  adminNavButton.hidden = !enabled;
  adminNavButton.setAttribute("aria-hidden", String(!enabled));
}

function updateNavigationState(viewName) {
  viewButtons.forEach((button) => {
    const selected = normalizeView(button.dataset.view) === viewName;
    button.classList.toggle("active", selected);

    if (button.classList.contains("nav-link")) {
      if (selected) {
        button.setAttribute("aria-current", "page");
      } else {
        button.removeAttribute("aria-current");
      }
    }
  });

  roleStartButtons.forEach((button) => {
    const selected = ["account", "register"].includes(viewName) && button.dataset.startRole === profile.role;
    button.classList.toggle("active", selected);
    if (button.matches("button")) {
      button.setAttribute("aria-pressed", String(selected));
    }

    if (button.classList.contains("nav-link")) {
      if (selected) {
        button.setAttribute("aria-current", "page");
      } else {
        button.removeAttribute("aria-current");
      }
    }
  });
}

function showView(viewName, { push = true, focus = true } = {}) {
  const nextView = normalizeView(viewName);
  activeView = nextView;

  appViews.forEach((view) => {
    const selected = normalizeView(view.dataset.viewName || view.id) === nextView;
    view.hidden = !selected;
    view.classList.toggle("active-view", selected);
  });

  updateNavigationState(nextView);
  updateAdminNavigation();
  dataProvider.trackEvent?.("view_opened", { view: nextView, role: profile.role });

  if (nextView === "account") {
    updateAuthPanel();
  }

  if (nextView === "matches") {
    refreshMatches();
  }

  if (["contacts", "ratings"].includes(nextView)) {
    renderRequestHistory();
  }

  if (nextView === "admin") {
    renderAdminDashboard();
  }

  if (push) {
    window.history.pushState({ view: nextView }, "", `#${nextView}`);
  }

  window.scrollTo({ top: 0, behavior: "auto" });
  if (focus) {
    const activeScreen = document.querySelector(`.app-view[data-view-name="${nextView}"]`);
    const heading = activeScreen?.querySelector("h1, h2");
    if (heading) {
      heading.setAttribute("tabindex", "-1");
      heading.focus({ preventScroll: true });
    }
  }
}

function currentCopy() {
  return ROLE_COPY[profile.role];
}

function label(group, value) {
  return labels[group]?.[value] || value;
}

function roleLabel(role) {
  return role === "client" ? "Cliente" : "Profesional";
}

function oppositeRole(role) {
  return role === "client" ? "professional" : "client";
}

function isRemoteMode() {
  return Boolean(dataProvider.getAuthState?.().isRemote);
}

function currentUser() {
  return dataProvider.getAuthState?.().user || null;
}

function accountRoute() {
  return dataProvider.getAccountRole?.() || "";
}

function updateRoleModeClass() {
  document.body.dataset.activeRole = profile.role;
  document.body.classList.toggle("role-client", profile.role === "client");
  document.body.classList.toggle("role-professional", profile.role === "professional");
}

const TRUST_VISITED_KEY = "fit-match.trust-visited.v1";

function hasVisitedTrustCenter() {
  return window.localStorage.getItem(TRUST_VISITED_KEY) === "true";
}

function markTrustCenterVisited() {
  window.localStorage.setItem(TRUST_VISITED_KEY, "true");
}

function requiredChecksCompleted(checks) {
  return Array.from(checks).filter((check) => check.dataset.optional !== "true").every((check) => check.checked);
}

function signupLegalPayload() {
  return Array.from(signupLegalChecks).reduce((items, check) => {
    items[check.dataset.signupLegalCheck] = check.checked;
    return items;
  }, { role: profile.role, contact: true });
}

function signupLegalShouldShow() {
  if (isRemoteMode() && dataProvider.hasLegalConsent?.()) return false;
  return hasVisitedTrustCenter();
}

function updateSignupLegalState() {
  const panel = document.querySelector(".signup-legal-panel");
  if (!panel) return;
  const shouldShow = signupLegalShouldShow();
  panel.hidden = !shouldShow;
  panel.setAttribute("aria-hidden", String(!shouldShow));
  panel.classList.toggle("legal-ready", shouldShow && requiredChecksCompleted(signupLegalChecks));
}

function openAccountLegalCenter() {
  const legalCenter = document.querySelector("#accountLegalCenter");
  if (legalCenter && "open" in legalCenter) legalCenter.open = true;
  return legalCenter;
}

function showAccountLegalCenter() {
  showView("account");
  window.requestAnimationFrame(() => {
    markTrustCenterVisited();
    updateSignupLegalState();
    openAccountLegalCenter()?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function validateSignupLegalConsent() {
  if (isRemoteMode() && dataProvider.hasLegalConsent?.()) return true;

  if (!hasVisitedTrustCenter()) {
    roleHelp.querySelector("strong").textContent = "Primero revisa Privacidad y Legal";
    roleHelp.querySelector("span").textContent = "Antes de aceptar condiciones, revisa Privacidad y Legal dentro de Cuenta. Después volverás al perfil para confirmar privacidad y términos.";
    showAccountLegalCenter();
    return false;
  }

  updateSignupLegalState();
  if (requiredChecksCompleted(signupLegalChecks)) return true;
  roleHelp.querySelector("strong").textContent = "Falta aceptar privacidad y términos";
  roleHelp.querySelector("span").textContent = "Después de revisar Privacidad y Legal, acepta privacidad, términos y confirma que tu información es veraz.";
  document.querySelector(".signup-legal-panel")?.scrollIntoView({ behavior: "smooth", block: "center" });
  return false;
}

function renderLegalDocument(docKey) {
  const doc = LEGAL_DOCUMENTS[docKey];
  if (!doc || !legalDocModal || !legalDocContent) return;
  legalDocKicker.textContent = doc.kicker || "Privacidad y Legal";
  legalDocTitle.textContent = doc.title;
  legalDocIntro.textContent = doc.intro || "";
  const sections = doc.sections.map(([title, items]) => {
    const section = createElement("section", "legal-doc-section");
    section.append(createElement("h3", "", title));
    const list = createElement("ul", "");
    items.forEach((item) => list.append(createElement("li", "", item)));
    section.append(list);
    return section;
  });
  legalDocContent.replaceChildren(...sections);
  legalDocModal.classList.remove("hidden");
  legalDocModal.scrollTop = 0;
  legalDocModal.querySelector(".modal-card")?.scrollTo({ top: 0, left: 0 });
  legalDocModal.focus();
}

function closeLegalDocModal() {
  legalDocModal?.classList.add("hidden");
  legalDocContent?.replaceChildren();
}

function updateLegalAcceptState() {
  if (!acceptLegalTermsButton) return;
  acceptLegalTermsButton.disabled = !requiredChecksCompleted(legalChecks);
}

function openLegalModal() {
  if (!legalModal || dataProvider.hasLegalConsent?.()) return;
  legalChecks.forEach((check) => {
    check.checked = false;
  });
  updateLegalAcceptState();
  legalModal.classList.remove("hidden");
  legalModal.focus();
}

function closeLegalModal() {
  legalModal?.classList.add("hidden");
}

function maybePromptLegalConsent() {
  if (!currentUser()) return;
  window.setTimeout(openLegalModal, 80);
}

function setAuthLoading(isLoading) {
  authActionButtons.forEach((button) => {
    button.disabled = isLoading;
  });
  if (signOutButton) signOutButton.disabled = isLoading;
  if (signupSignOutButton) signupSignOutButton.disabled = isLoading;
}

function clearAuthInputs() {
  if (authEmailInput) authEmailInput.value = "";
  if (authPasswordInput) authPasswordInput.value = "";
}

function updateAuthPanel(message = "") {
  if (!authPanel) return;

  const state = dataProvider.getAuthState?.() || {};
  authPanel.classList.toggle("remote-active", Boolean(state.isRemote));
  authPanel.classList.toggle("remote-unavailable", !state.hasClient);
  const isConnected = Boolean(state.isRemote);
  const isProfileReady = hasSavedProfile();
  const connectedEmail = state.user?.email || "esta cuenta";
  document.body.classList.toggle("account-connected", isConnected);
  updateSignupLegalState();

  if (signupFields) signupFields.hidden = false;
  if (authLoginFields) authLoginFields.hidden = isConnected;
  if (createAccountRouteButton) {
    createAccountRouteButton.hidden = false;
    createAccountRouteButton.textContent = isConnected
      ? "Completar perfil"
      : profile.role === "client" ? "Crear cuenta cliente" : "Crear cuenta profesional";
  }
  if (signInButton) signInButton.hidden = isConnected;
  if (signOutButton) signOutButton.hidden = !isConnected || isProfileReady;
  if (connectedAccountEmail) {
    connectedAccountEmail.hidden = !isConnected;
    connectedAccountEmail.textContent = isConnected ? `Cuenta actual: ${connectedEmail}` : "";
  }
  if (signupConnectedEmail) {
    signupConnectedEmail.textContent = isConnected
      ? `Cuenta actual: ${connectedEmail}. Si quieres registrar otro email, cierra esta sesión primero.`
      : "";
  }

  if (!state.hasClient) {
    if (authTitle) authTitle.textContent = "Supabase no está cargado";
    if (authStatus) authStatus.textContent = state.error || "La app sigue funcionando en modo local. Revisa conexión o vuelve a abrir desde internet.";
    if (signOutButton) signOutButton.hidden = true;
    renderProfileHome();
    return;
  }

  if (isConnected) {
    if (authTitle) authTitle.textContent = isProfileReady ? "Todo bajo control." : "Cuenta conectada";
    if (authStatus) authStatus.textContent = message || (isProfileReady
      ? "Tu identidad, tu actividad y tus oportunidades reunidas en un solo lugar."
      : "Ya estás dentro. Completa tu perfil para activar tus matches.");
  } else {
    if (authTitle) authTitle.textContent = "Bienvenido de nuevo.";
    if (authStatus) authStatus.textContent = message || "Entra y continúa tu recorrido en Fit Match.";
  }

  renderProfileHome();
}


function updateGoalOptions() {
  const options = GOAL_OPTION_COPY[profile.role] || GOAL_OPTION_COPY.client;
  const goalInput = document.querySelector("#goalInput");
  Array.from(goalInput.options).forEach((option) => {
    option.textContent = options[option.value] || option.textContent;
  });
}

function renderContextSignals(container, signals) {
  if (!container) return;
  container.replaceChildren();
  signals.forEach((signal) => {
    const item = document.createElement("span");
    item.textContent = signal;
    container.append(item);
  });
}

function updateProfileContextCard() {
  if (!profileContextCard) return;
  const percent = profileCompleteness();
  const isClient = profile.role === "client";

  profileContextCard.classList.toggle("professional-context", !isClient);
  if (profileContextScore) profileContextScore.textContent = `${percent}%`;
  if (profileContextScoreLabel) profileContextScoreLabel.textContent = percent >= 80 ? "perfil fuerte" : "perfil en progreso";
  if (profileContextKicker) profileContextKicker.textContent = "Constructor de perfil";
  if (profileContextTitle) profileContextTitle.textContent = isClient ? "Tu perfil cuenta tu punto de partida." : "Tu perfil presenta tu forma de trabajar.";
  if (profileContextCopy) profileContextCopy.textContent = "Solo te faltan unos pasos para mejorar tu visibilidad.";
  renderContextSignals(profileContextSignals, isClient
    ? ["Objetivos definidos", "Preferencias claras", "Disponibilidad importante", "Nivel adecuado"]
    : ["Especialidades claras", "Metodología destacada", "Disponibilidad actualizada", "Reseñas futuras"]);
}

function updateProfileFieldCopy() {
  const fieldCopy = PROFILE_FIELD_COPY[profile.role];
  if (!fieldCopy) return;

  goalLabel.textContent = fieldCopy.goalLabel;
  goalHint.textContent = fieldCopy.goalHint;
  sportLabel.textContent = fieldCopy.sportLabel;
  sportHint.textContent = fieldCopy.sportHint;
  modeLabel.textContent = fieldCopy.modeLabel;
  modeHint.textContent = fieldCopy.modeHint;
  levelLabel.textContent = fieldCopy.levelLabel;
  levelHint.textContent = fieldCopy.levelHint;
  servicesLegend.textContent = fieldCopy.servicesLegend;
  servicesHint.textContent = fieldCopy.servicesHint;
  priceLabel.textContent = fieldCopy.priceLabel;
  priceHint.textContent = fieldCopy.priceHint;
  availabilityLabel.textContent = fieldCopy.availabilityLabel;
  availabilityHint.textContent = fieldCopy.availabilityHint;
  bioLabel.textContent = fieldCopy.bioLabel;
  bioHint.textContent = fieldCopy.bioHint;
  bioInput.placeholder = fieldCopy.bioPlaceholder;
  notesLabel.textContent = fieldCopy.notesLabel;
  notesHint.textContent = fieldCopy.notesHint;
  notesInput.placeholder = fieldCopy.notesPlaceholder;
  const isClient = profile.role === "client";
  if (profileWorkKicker) profileWorkKicker.textContent = isClient ? "CÓMO QUIERES AVANZAR" : "CÓMO TRABAJAS";
  if (profileWorkTitle) profileWorkTitle.textContent = isClient ? "Objetivo, disciplina y modalidad" : "Especialidad, disciplina y modalidad";
  if (profileWorkCopy) profileWorkCopy.textContent = isClient ? "Define el contexto que necesitas." : "Define cómo encajas con la otra parte.";
  if (profileOfferKicker) profileOfferKicker.textContent = isClient ? "QUÉ NECESITAS" : "QUÉ OFRECES";
  if (profileOfferTitle) profileOfferTitle.textContent = isClient ? "Servicios, presupuesto y disponibilidad" : "Servicios, precio y disponibilidad";
  if (profileOfferCopy) profileOfferCopy.textContent = isClient ? "Ayuda a encontrar profesionales compatibles." : "Ayuda a entender si el contacto tiene sentido.";
  updateGoalOptions();
}

function clearSignupCredentials() {
  if (signupPasswordInput) signupPasswordInput.value = "";
  if (signupPasswordConfirmInput) signupPasswordConfirmInput.value = "";
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const CITY_PATTERN = /^[\p{L}][\p{L}\s'.-]{1,60}$/u;

function cleanEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function cleanCity(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function normalizePhone(value) {
  return String(value || "")
    .replace(/[^+0-9]/g, "")
    .replace(/(?!^)\+/g, "");
}

function phoneDigits(value) {
  return String(value || "").replace(/\D/g, "");
}

function isValidEmail(value) {
  return EMAIL_PATTERN.test(cleanEmail(value));
}

function isValidPhone(value) {
  if (!value) return true;
  const normalized = normalizePhone(value);
  const digits = phoneDigits(normalized);
  return /^\+?\d+$/.test(normalized) && digits.length >= 7 && digits.length <= 15;
}

function isValidBirthdate(value) {
  if (!value) return true;
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date <= today && date.getFullYear() >= 1900;
}

function isValidCity(value) {
  if (!value) return true;
  return CITY_PATTERN.test(cleanCity(value));
}

function setInputError(selector, message) {
  const input = document.querySelector(selector);
  if (!input) return;
  input.setCustomValidity(message || "");
  if (message) input.reportValidity();
}

function clearInputErrors() {
  ["#authEmailInput", "#emailInput", "#birthdateInput", "#phoneInput", "#cityInput"].forEach((selector) => setInputError(selector, ""));
}

function showProfileValidationError(title, message, selector) {
  roleHelp.querySelector("strong").textContent = title;
  roleHelp.querySelector("span").textContent = message;
  setInputError(selector, message);
  document.querySelector(selector)?.focus();
  return false;
}

function validateProfileData({ requireEmail = false } = {}) {
  clearInputErrors();
  profile.email = cleanEmail(profile.email);
  profile.phone = normalizePhone(profile.phone);
  profile.city = cleanCity(profile.city);

  const emailInput = document.querySelector("#emailInput");
  const phoneInput = document.querySelector("#phoneInput");
  const cityInput = document.querySelector("#cityInput");
  if (emailInput) emailInput.value = profile.email;
  if (phoneInput) phoneInput.value = profile.phone;
  if (cityInput) cityInput.value = profile.city;

  if ((requireEmail || profile.email) && !isValidEmail(profile.email)) {
    return showProfileValidationError(
      "Email no válido",
      "Escribe un email real, por ejemplo nombre@email.com.",
      "#emailInput"
    );
  }

  if (!isValidBirthdate(profile.birthdate)) {
    return showProfileValidationError(
      "Fecha no válida",
      "La fecha de nacimiento no puede ser futura ni anterior a 1900.",
      "#birthdateInput"
    );
  }

  if (!isValidPhone(profile.phone)) {
    return showProfileValidationError(
      "Teléfono no válido",
      "Introduce solo números, con prefijo si quieres. Debe tener entre 7 y 15 cifras.",
      "#phoneInput"
    );
  }

  if (!isValidCity(profile.city)) {
    return showProfileValidationError(
      "Ciudad no válida",
      "Escribe una ciudad reconocible, sin emails, números ni símbolos extraños.",
      "#cityInput"
    );
  }

  return true;
}

function validateAuthEmailInput(input, messageTarget = updateAuthPanel) {
  const email = cleanEmail(input?.value || "");
  if (input) input.value = email;
  setInputError("#authEmailInput", "");
  if (!isValidEmail(email)) {
    const message = "Introduce un email válido, por ejemplo nombre@email.com.";
    setInputError("#authEmailInput", message);
    messageTarget(message);
    return "";
  }
  return email;
}

function setBirthdateLimit() {
  const input = document.querySelector("#birthdateInput");
  if (input) input.max = new Date().toISOString().slice(0, 10);
}

async function ensureAccountBeforeSaving() {
  if (isRemoteMode()) {
    if (!validateSignupLegalConsent()) return false;
    if (!dataProvider.hasLegalConsent?.()) {
      await dataProvider.acceptLegalConsent?.(signupLegalPayload());
      updateSignupLegalState();
    }
    return true;
  }

  if (!validateSignupLegalConsent()) return false;

  const email = cleanEmail(profile.email);
  const password = signupPasswordInput?.value || "";
  const confirmation = signupPasswordConfirmInput?.value || "";
  profile.email = email;

  if (!email) {
    roleHelp.querySelector("strong").textContent = "Falta el email";
    roleHelp.querySelector("span").textContent = "Introduce el email de cuenta para crear tu acceso antes de guardar el perfil.";
    setInputError("#emailInput", "Introduce el email de cuenta para crear tu acceso.");
    document.querySelector("#emailInput")?.focus();
    return false;
  }

  if (!isValidEmail(email)) {
    roleHelp.querySelector("strong").textContent = "Email no válido";
    roleHelp.querySelector("span").textContent = "Escribe un email real, por ejemplo nombre@email.com.";
    setInputError("#emailInput", "Escribe un email real, por ejemplo nombre@email.com.");
    document.querySelector("#emailInput")?.focus();
    return false;
  }

  if (password.length < 6) {
    roleHelp.querySelector("strong").textContent = "Falta contraseña";
    roleHelp.querySelector("span").textContent = "La contraseña debe tener al menos 6 caracteres.";
    return false;
  }

  if (password !== confirmation) {
    roleHelp.querySelector("strong").textContent = "Las contraseñas no coinciden";
    roleHelp.querySelector("span").textContent = "Revisa la contraseña y su confirmación antes de crear la cuenta.";
    return false;
  }

  setAuthLoading(true);
  try {
    await dataProvider.signUp({
      email,
      password,
      role: profile.role,
      name: profile.name
    });
    await dataProvider.acceptLegalConsent?.(signupLegalPayload());
    updateSignupLegalState();
    clearSignupCredentials();
    updateAuthPanel("Cuenta creada. Guardando tu perfil en Supabase...");
    return true;
  } catch (error) {
    roleHelp.querySelector("strong").textContent = "No se pudo crear la cuenta";
    roleHelp.querySelector("span").textContent = error.message || "Revisa email y contraseña e inténtalo de nuevo.";
    updateAuthPanel(error.message || "No se pudo crear la cuenta.");
    return false;
  } finally {
    setAuthLoading(false);
  }
}

function loadOwnRemoteProfile() {
  const user = currentUser();
  if (!user) return null;

  const ownProfile = dataProvider.listProfiles().find((item) => item.id === user.id);
  if (ownProfile) {
    Object.keys(profile).forEach((key) => delete profile[key]);
    Object.assign(profile, createBlankProfile(ownProfile.role), ownProfile, {
      email: user.email || ownProfile.email || "",
      phone: ownProfile.phone || profile.phone || ""
    });
  } else {
    profile.email = user.email || profile.email;
  }

  setFormFromProfile();
  setRoleButtonState();
  updateRoleCopy();
  resetRequestBox();
  renderRequestHistory();
  updateProfileStatus();
  refreshMatches();
  return ownProfile || null;
}

async function handleAuth(action) {
  if (!authEmailInput || !authPasswordInput) return;

  const email = validateAuthEmailInput(authEmailInput);
  const password = authPasswordInput.value;

  if (!email || !password) {
    if (!email) return;
    updateAuthPanel("Introduce email y contraseña para continuar.");
    return;
  }

  if (password.length < 6) {
    updateAuthPanel("La contraseña debe tener al menos 6 caracteres.");
    return;
  }

  setAuthLoading(true);

  try {
    if (action === "signup") {
      await dataProvider.signUp({
        email,
        password,
        role: profile.role,
        name: profile.name
      });
      profile.email = email;
      setFormFromProfile();
      clearAuthInputs();
      loadOwnRemoteProfile();
      updateAuthPanel(isRemoteMode()
        ? "Cuenta creada y conectada. Ahora guarda tu perfil."
        : "Cuenta creada, pero aún no hay sesión activa. Pulsa Ingresar y después guarda tu perfil.");
    } else {
      const requestedRole = profile.role;
      await dataProvider.signIn({ email, password });
      clearAuthInputs();
      const registeredRoute = accountRoute();

      if (registeredRoute && registeredRoute !== requestedRole) {
        const realRole = roleLabel(registeredRoute).toLowerCase();
        const selectedRole = roleLabel(requestedRole).toLowerCase();
        await dataProvider.signOut();
        resetProfileState(requestedRole);
        updateAuthPanel(`Esta cuenta está registrada como ${realRole}. Para entrar como ${selectedRole}, usa otro email.`);
        showView("account");
        return;
      }

      const ownProfile = loadOwnRemoteProfile();

      if (ownProfile && ownProfile.role !== requestedRole) {
        const realRole = roleLabel(ownProfile.role).toLowerCase();
        const selectedRole = roleLabel(requestedRole).toLowerCase();
        await dataProvider.signOut();
        resetProfileState(requestedRole);
        updateAuthPanel(`Esta cuenta está registrada como ${realRole}. Para entrar como ${selectedRole}, usa otro email.`);
        showView("account");
        return;
      }

      updateAuthPanel(ownProfile
        ? "Sesión iniciada. Este es tu espacio personal."
        : "Sesión iniciada. Completa tu perfil para calcular matches.");
      showView(ownProfile ? "account" : "register");
    }
  } catch (error) {
    updateAuthPanel(error.message || "No se pudo completar la autenticación.");
  } finally {
    setAuthLoading(false);
  }
}

function createElement(tagName, className, text) {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  if (text !== undefined && text !== null) element.textContent = text;
  return element;
}

function getInitials(name) {
  return (name || "FM")
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function setAvatarContent(element, person = profile) {
  if (!element) return;
  const photo = person?.photo || "";
  element.replaceChildren();
  element.classList.toggle("has-photo", Boolean(photo));

  if (photo) {
    const image = document.createElement("img");
    image.src = photo;
    image.alt = person?.name ? `Foto de ${person.name}` : "Foto de perfil";
    element.append(image);
    return;
  }

  element.textContent = getInitials(person?.name || "FM");
  element.style.background = person?.color || "";
}

function updatePhotoPreview() {
  setAvatarContent(photoPreview, profile);
  if (removePhotoButton) removePhotoButton.hidden = !profile.photo;
}

function resizeProfilePhoto(file) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith("image/")) {
      reject(new Error("Elige un archivo de imagen."));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const maxSize = 360;
        const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
        const width = Math.max(1, Math.round(image.width * scale));
        const height = Math.max(1, Math.round(image.height * scale));
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.72));
      };
      image.onerror = () => reject(new Error("No se pudo leer la foto. Prueba con JPG, PNG o WebP."));
      image.src = reader.result;
    };
    reader.onerror = () => reject(new Error("No se pudo cargar la imagen."));
    reader.readAsDataURL(file);
  });
}

function proSubscriptionFor(person = profile) {
  return dataProvider.getProSubscription?.(person.id) || {
    status: person.proStatus || "FREE",
    plan: person.proPlan || "free",
    trialEndsAt: person.proTrialEndsAt || "",
    startedAt: person.proStartedAt || "",
    proInterest: Boolean(person.proInterest),
    profileScore: Number(person.profileScore) || 0,
    profileRecommendations: Array.isArray(person.profileRecommendations) ? [...person.profileRecommendations] : []
  };
}

function proStatusLabel(subscription = {}) {
  const status = String(subscription.status || "FREE").toUpperCase();
  if (status === "PRO") return "PRO activo";
  if (status === "TRIAL") return "TRIAL";
  if (status === "EXPIRED") return "Expirado";
  if (status === "CANCELLED") return "Cancelado";
  return "FREE";
}

function isProVisible(person = {}) {
  return person.role === "professional" && ["PRO", "TRIAL"].includes(String(person.proStatus || "").toUpperCase());
}

function createProBadge(person) {
  if (person.role !== "professional") return null;
  const status = String(person.proStatus || "FREE").toUpperCase();
  const verified = Boolean(person.verified);
  if (!verified && !["PRO", "TRIAL"].includes(status)) return null;
  const badge = createElement("span", `pro-mini-badge ${status === "TRIAL" ? "is-trial" : ""}`, verified ? "Verificado" : "FIT MATCH PRO");
  badge.title = verified
    ? "Profesional verificado. La verificación no depende del pago."
    : "Fit Match PRO mejora herramientas y visibilidad moderada, no compra posiciones.";
  return badge;
}

function profileQualityFor(person = {}) {
  const values = [person.photo, person.bio, person.availability, person.services?.length, person.sport || person.notes, person.price];
  return values.filter(Boolean).length;
}

function recentActivityScore(person = {}) {
  const value = person.updatedAt || person.createdAt;
  const time = value ? new Date(value).getTime() : 0;
  if (!Number.isFinite(time) || !time) return 0;
  const ageDays = Math.max(0, (Date.now() - time) / 86400000);
  return Math.max(0, Math.round(365 - ageDays));
}

function matchTieBreakScore(person = {}) {
  const verified = person.verified ? 1000000 : 0;
  const quality = profileQualityFor(person) * 10000;
  const activity = recentActivityScore(person) * 100;
  const pro = isProVisible(person) ? 50 : 0;
  const rating = Math.round((ratingSummaryFor(person).average || 0) * 10);
  return verified + quality + activity + pro + rating;
}

function renderProList(container, items = []) {
  if (!container) return;
  container.replaceChildren();
  items.forEach((item) => container.append(createElement("li", "", item)));
}

function koroScoreActions(profileScore = 0, profileData = profile) {
  const actions = [];
  if (!profileData.photo) actions.push("Añadir foto de perfil +8");
  actions.push("Añadir vídeo de presentación +8");
  if (!profileData.verified) actions.push("Verificar identidad profesional +5");
  if (!profileData.availability) actions.push("Completar disponibilidad +4");
  actions.push("Añadir certificaciones visibles +7");
  if (!profileData.bio || profileData.bio.length < 80) actions.push("Mejorar descripción profesional +6");
  if (!profileData.city) actions.push("Completar ciudad o zona +4");
  return actions.slice(0, 5);
}

function renderProPanel({ matchCount = 0, activeContacts = 0 } = {}) {
  if (!proPanel) return;
  const visible = hasSavedProfile() && profile.role === "professional";
  proPanel.hidden = !visible;
  if (!visible) return;

  const subscription = proSubscriptionFor(profile);
  const status = String(subscription.status || "FREE").toUpperCase();
  const hasInterest = Boolean(subscription.proInterest || profile.proInterest);
  const isFullPro = status === "PRO";
  const metrics = dataProvider.getProMetrics?.(profile) || { matches: matchCount, contacts: activeContacts, conversion: 0, profileStrength: profileCompleteness() };
  const recommendations = dataProvider.getProRecommendations?.(profile) || [];
  const profileScore = metrics.profileStrength || profileCompleteness();

  proPanel.dataset.proStatus = isFullPro ? "pro" : "building";
  if (proStatusBadge) proStatusBadge.textContent = isFullPro ? "PRO activo" : "En construcción";
  if (proPanelTitle) proPanelTitle.textContent = "Próximamente · Fit Match PRO";
  if (proPanelCopy) proPanelCopy.textContent = "Más visibilidad. Más confianza. Más oportunidades.";
  if (proProfileScore) proProfileScore.textContent = `${profileScore} / 100`;
  if (proScoreState) proScoreState.textContent = isFullPro ? "Análisis completo activo." : "Vista previa limitada. Disponible próximamente en Fit Match PRO.";
  renderProList(proScoreActions, koroScoreActions(profileScore, profile));
  if (proMetricViews) proMetricViews.textContent = `${profileCompleteness()}%`;
  if (proMetricMatches) proMetricMatches.textContent = isFullPro ? String(metrics.matches || matchCount) : "Preview";
  if (proMetricContacts) proMetricContacts.textContent = isFullPro ? String(metrics.contacts || activeContacts) : "Preview";
  if (proMetricConversion) proMetricConversion.textContent = isFullPro ? `${metrics.conversion || 0}%` : "Preview";
  renderProList(proRecommendations, isFullPro ? recommendations : recommendations.slice(0, 3));
  if (proLockMessage) proLockMessage.textContent = isFullPro
    ? "Análisis completo disponible para tu plan PRO."
    : "Disponible próximamente en Fit Match PRO.";

  if (proInterestButton) {
    proInterestButton.disabled = hasInterest;
    proInterestButton.textContent = hasInterest ? "Interés registrado" : "Quiero probar Fit Match PRO";
  }
  if (proPaymentNote) {
    proPaymentNote.classList.toggle("pro-payment-note-active", hasInterest);
    proPaymentNote.textContent = hasInterest
      ? "Te avisaremos cuando Fit Match PRO esté disponible."
      : "Fit Match PRO todavía no cobra ni activa suscripciones. Este botón solo registra tu interés para avisarte cuando esté disponible.";
  }
}

function renderProfileHome() {
  const isReady = hasSavedProfile();
  const state = dataProvider.getAuthState?.() || {};
  const isConnected = Boolean(state.isRemote);
  const showAccountIdentity = isReady || isConnected;

  if (accountHeaderActionButton) {
    accountHeaderActionButton.textContent = showAccountIdentity ? "Ir a perfil" : "Volver al inicio";
    accountHeaderActionButton.dataset.view = showAccountIdentity ? "register" : "home";
  }

  if (accountWelcomeCard) accountWelcomeCard.hidden = showAccountIdentity;
  if (profileHomeCard) profileHomeCard.hidden = !showAccountIdentity;
  if (accountWorkspace) accountWorkspace.hidden = !isReady;
  if (accountRatingCard) accountRatingCard.hidden = !isReady;
  if (proPanel) proPanel.hidden = !isReady || profile.role !== "professional";
  if (accountProgressCard) accountProgressCard.hidden = !isReady;
  if (accountActivityCard) accountActivityCard.hidden = !isReady;

  const accountActions = profileHomeCard?.querySelectorAll(".account-quick-actions .button") || [];
  const [matchesAction, contactsAction, editAction, signOutAction] = accountActions;

  if (!isReady) {
    const connectedEmail = state.user?.email || currentUser()?.email || profile.email || "Cuenta conectada";
    const roleText = roleLabel(profile.role);
    setAvatarContent(profileHomePhoto, { name: connectedEmail, photo: profile.photo, color: profile.color });
    if (profileHomeName) profileHomeName.textContent = isConnected ? "Cuenta conectada" : "Bienvenido de nuevo.";
    if (profileHomeSummary) profileHomeSummary.textContent = isConnected
      ? `${roleText} · Perfil pendiente. Completa tus datos para activar matches y contactos.`
      : "Entra y continúa tu recorrido en Fit Match.";
    if (accountEmailValue) accountEmailValue.textContent = isConnected ? connectedEmail : "Sin email";
    if (accountRoleValue) accountRoleValue.textContent = roleText;
    if (accountCityValue) accountCityValue.textContent = "Pendiente";
    if (accountGoalValue) accountGoalValue.textContent = "Pendiente";
    if (accountStatusValue) accountStatusValue.textContent = isConnected ? "Perfil pendiente" : "Sin sesión";
    if (accountCompletionValue) accountCompletionValue.textContent = "0% completo";
    if (accountContextScore) accountContextScore.textContent = "0%";
    if (accountContextTitle) accountContextTitle.textContent = isConnected ? "Tu perfil genera confianza." : "Bienvenido de nuevo.";
    if (accountContextCopy) accountContextCopy.textContent = isConnected
      ? "Ya pueden conocerte antes del primer contacto."
      : "Entra y continúa tu recorrido en Fit Match.";
    if (accountContextMatches) accountContextMatches.textContent = "0";
    if (accountContextContacts) accountContextContacts.textContent = "0";
    if (accountContextMessages) accountContextMessages.textContent = "0";
    if (accountContextDelta) accountContextDelta.textContent = "--";
    if (profileHomeUnreadAlert) profileHomeUnreadAlert.hidden = true;
    if (matchesAction) {
      matchesAction.textContent = isConnected ? "Completar perfil" : "Iniciar sesión";
      matchesAction.dataset.view = isConnected ? "register" : "account";
      matchesAction.hidden = false;
    }
    if (contactsAction) contactsAction.hidden = true;
    if (editAction) editAction.hidden = true;
    if (signOutAction) signOutAction.hidden = !isConnected;
    if (accountAsideLabel) accountAsideLabel.textContent = isConnected ? "Perfil pendiente" : "Cuenta Fit Match";
    if (accountAsideTitle) accountAsideTitle.textContent = isConnected ? "Completa tu perfil" : "Bienvenido de nuevo.";
    if (accountAsideCopy) accountAsideCopy.textContent = isConnected
      ? "Tu cuenta ya está activa. Completa el perfil para desbloquear matches, contactos y recomendaciones."
      : "Entra y continúa tu recorrido en Fit Match.";
    renderProPanel();
    return;
  }

  if (matchesAction) {
    matchesAction.textContent = "Ver matches";
    matchesAction.dataset.view = "matches";
    matchesAction.hidden = false;
  }
  if (contactsAction) contactsAction.hidden = false;
  if (editAction) editAction.hidden = false;
  if (signOutAction) signOutAction.hidden = false;

  const matchScores = accountMatchScores();
  const matchCount = matchScores.length;
  const averageAffinity = accountAverageAffinity(matchScores);
  const allRequests = dataProvider.listContactRequests(profile.role, { profileId: profile.id });
  const incomingRequests = dataProvider.listContactRequests(profile.role, { profileId: profile.id, direction: "incoming" });
  const unreadRequests = incomingRequests.filter((request) => !request.readAt).length;
  const activeRequests = allRequests.filter((request) => !["rejected", "cancelled"].includes(request.status));
  const pendingRequests = allRequests.filter((request) => request.status === "pending").length;
  const completion = profileCompletionDetails();
  const completedLabels = completion.completed.map((item) => item.label);
  const pendingLabels = completion.pending.map((item) => item.label);
  const roleText = roleLabel(profile.role);
  const cityText = profile.city || "Ciudad pendiente";
  const primaryLabel = profile.role === "client" ? "Objetivo principal" : "Especialidad principal";
  const primaryValue = label("goals", profile.goal) || "Pendiente";
  const secondaryValue = label("modes", profile.mode) || "Pendiente";
  const lastTimestamps = [profile.updatedAt, profile.createdAt, ...allRequests.map((request) => request.createdAt)]
    .filter(Boolean)
    .sort((a, b) => new Date(b) - new Date(a));
  const lastActivityText = formatAccountDate(lastTimestamps[0]);
  const emailText = profile.email || currentUser()?.email || "Email privado";
  const statusText = accountProfileStatus(completion.percent);
  const ownRatingSummary = ratingSummaryFor(profile);

  setAvatarContent(profileHomePhoto, profile);
  if (profileHomeName) profileHomeName.textContent = profile.name || `Perfil ${roleText.toLowerCase()}`;
  if (profileHomeSummary) {
    profileHomeSummary.textContent = `${roleText} · ${cityText} · ${primaryValue}.`;
  }
  if (accountEmailValue) accountEmailValue.textContent = emailText;
  if (accountRoleValue) accountRoleValue.textContent = roleText;
  if (accountCityValue) accountCityValue.textContent = cityText;
  if (accountGoalValue) accountGoalValue.textContent = primaryValue;
  const subscription = proSubscriptionFor(profile);
  const subscriptionLabel = profile.role === "professional" ? ` · ${proStatusLabel(subscription)}` : "";
  if (accountStatusValue) accountStatusValue.textContent = `${statusText}${subscriptionLabel}`;
  if (accountCompletionValue) accountCompletionValue.textContent = `${completion.percent}% completo`;
  if (profileHomeMatches) profileHomeMatches.textContent = String(matchCount);
  if (profileHomeContacts) profileHomeContacts.textContent = String(activeRequests.length);
  if (profileHomeMessages) profileHomeMessages.textContent = String(allRequests.length);
  if (profileHomeAffinity) profileHomeAffinity.textContent = averageAffinity;
  if (accountContextScore) accountContextScore.textContent = `${completion.percent}%`;
  if (accountContextTitle) accountContextTitle.textContent = "Tu perfil genera confianza.";
  if (accountContextCopy) accountContextCopy.textContent = "Ya pueden conocerte antes del primer contacto.";
  if (accountContextMatches) accountContextMatches.textContent = String(matchCount);
  if (accountContextContacts) accountContextContacts.textContent = String(activeRequests.length);
  if (accountContextMessages) accountContextMessages.textContent = String(allRequests.length);
  if (accountContextDelta) accountContextDelta.textContent = averageAffinity;

  const firstContactRatings = ratingsForPerson(profile, "first_contact");
  const serviceRatings = ratingsForPerson(profile, "service");
  const firstContactAverage = firstContactRatings.length
    ? roundRating(firstContactRatings.reduce((sum, rating) => sum + Number(rating.averageScore || 0), 0) / firstContactRatings.length)
    : 0;
  const serviceAverage = serviceRatings.length
    ? roundRating(serviceRatings.reduce((sum, rating) => sum + Number(rating.averageScore || 0), 0) / serviceRatings.length)
    : 0;
  if (accountRatingTitle) accountRatingTitle.textContent = "Tu reputación";
  if (accountRatingCopy) accountRatingCopy.textContent = "La confianza también se construye.";
  if (accountRatingAverage) accountRatingAverage.textContent = ownRatingSummary.count ? `${ownRatingSummary.average}/5` : "--";
  if (accountRatingCount) accountRatingCount.textContent = ownRatingSummary.count ? `${ownRatingSummary.count} valoración${ownRatingSummary.count === 1 ? "" : "es"}` : "sin datos";
  if (accountRatingFirstContact) accountRatingFirstContact.textContent = firstContactRatings.length ? `${firstContactAverage}/5` : "--";
  if (accountRatingService) accountRatingService.textContent = serviceRatings.length ? `${serviceAverage}/5` : "--";

  if (accountWorkspaceTitle) accountWorkspaceTitle.textContent = profile.role === "client" ? "Tu búsqueda cliente" : "Tu espacio profesional";
  if (accountWorkspaceCopy) accountWorkspaceCopy.textContent = profile.role === "client"
    ? "Tus preferencias, necesidades y señales principales para encontrar profesionales compatibles."
    : "Haz crecer tu negocio conectando con clientes compatibles.";
  if (accountDetailPrimaryLabel) accountDetailPrimaryLabel.textContent = primaryLabel;
  if (accountDetailPrimary) accountDetailPrimary.textContent = primaryValue;
  if (accountDetailSecondaryLabel) accountDetailSecondaryLabel.textContent = profile.role === "client" ? "Modalidad preferida" : "Modalidad ofrecida";
  if (accountDetailSecondary) accountDetailSecondary.textContent = secondaryValue;
  if (accountDetailCity) accountDetailCity.textContent = cityText;
  if (accountDetailLevel) accountDetailLevel.textContent = label("levels", profile.level) || "Pendiente";
  if (accountDetailMatches) accountDetailMatches.textContent = String(matchCount);
  if (accountDetailContactsLabel) accountDetailContactsLabel.textContent = profile.role === "client" ? "Profesionales contactados" : "Clientes contactados";
  if (accountDetailContacts) accountDetailContacts.textContent = String(activeRequests.length);
  if (accountDetailCompletion) accountDetailCompletion.textContent = `${completion.percent}%`;
  if (accountDetailActivity) accountDetailActivity.textContent = lastActivityText;

  if (accountAsideLabel) accountAsideLabel.textContent = "Panel personal";
  if (accountAsideTitle) accountAsideTitle.textContent = "Tu Fit Match está listo";
  if (accountAsideCopy) accountAsideCopy.textContent = profile.role === "client"
    ? "Desde aquí puedes revisar profesionales compatibles, contactos abiertos y mejorar tu perfil para recibir mejores resultados."
    : "Desde aquí puedes revisar clientes compatibles, conversaciones abiertas y mejorar tu perfil para aparecer con más precisión.";

  if (accountProgressTitle) accountProgressTitle.textContent = `Perfil completado: ${completion.percent}%`;
  if (accountProgressBar) accountProgressBar.style.width = `${completion.percent}%`;
  renderAccountFieldList(accountCompletedFields, completedLabels, "Datos principales completos");
  renderAccountFieldList(accountPendingFields, pendingLabels, "Nada pendiente importante");
  if (accountProfileRecommendation) accountProfileRecommendation.textContent = accountRecommendation(pendingLabels);

  if (accountActivityMatches) accountActivityMatches.textContent = String(matchCount);
  if (accountActivityContacts) accountActivityContacts.textContent = String(activeRequests.length);
  if (accountActivityPending) accountActivityPending.textContent = String(pendingRequests);
  if (accountActivityUpdated) accountActivityUpdated.textContent = lastActivityText;

  if (profileHomeUnreadAlert) {
    profileHomeUnreadAlert.hidden = unreadRequests === 0;
    profileHomeUnreadAlert.textContent = unreadRequests === 1
      ? "Tienes 1 mensaje nuevo pendiente de leer."
      : `Tienes ${unreadRequests} mensajes nuevos pendientes de leer.`;
  }

  renderProPanel({ matchCount, activeContacts: activeRequests.length });
}


function setServiceSelections(services) {
  document.querySelectorAll('input[name="services"]').forEach((input) => {
    input.checked = services.includes(input.value);
  });
}

function setFormFromProfile() {
  document.querySelector("#nameInput").value = profile.name || "";
  document.querySelector("#emailInput").value = profile.email || "";
  document.querySelector("#birthdateInput").value = profile.birthdate || "";
  document.querySelector("#phoneInput").value = profile.phone || "";
  document.querySelector("#cityInput").value = profile.city || "";
  updatePhotoPreview();
  document.querySelector("#goalInput").value = profile.goal || "fuerza";
  document.querySelector("#sportInput").value = profile.sport || "";
  document.querySelector("#modeInput").value = profile.mode || "online";
  document.querySelector("#levelInput").value = profile.level || "principiante";
  document.querySelector("#priceInput").value = profile.price || "";
  document.querySelector("#availabilityInput").value = profile.availability || "";
  document.querySelector("#bioInput").value = profile.bio || "";
  document.querySelector("#notesInput").value = profile.notes || "";
  setServiceSelections(profile.services || []);
}

function readForm() {
  const checkedServices = Array.from(
    document.querySelectorAll('input[name="services"]:checked')
  ).map((input) => input.value);

  profile.name = document.querySelector("#nameInput").value.trim();
  profile.email = cleanEmail(document.querySelector("#emailInput").value);
  profile.birthdate = document.querySelector("#birthdateInput").value;
  profile.phone = normalizePhone(document.querySelector("#phoneInput").value);
  profile.city = cleanCity(document.querySelector("#cityInput").value);
  profile.goal = document.querySelector("#goalInput").value;
  profile.sport = document.querySelector("#sportInput").value.trim();
  profile.mode = document.querySelector("#modeInput").value;
  profile.level = document.querySelector("#levelInput").value;
  profile.price = document.querySelector("#priceInput").value;
  profile.availability = document.querySelector("#availabilityInput").value.trim();
  profile.bio = document.querySelector("#bioInput").value.trim();
  profile.notes = document.querySelector("#notesInput").value.trim();
  profile.services = checkedServices;
}

function saveDraft() {
  dataProvider.saveProfileDraft(profile);
  updateProfileStatus();
}

function profileCompletionDetails() {
  const goalLabelText = profile.role === "client" ? "Objetivo" : "Especialidad";
  const priceLabelText = profile.role === "client" ? "Presupuesto" : "Precio";
  const items = [
    { label: "Nombre", value: profile.name },
    { label: "Email", value: profile.email || currentUser()?.email },
    { label: "Ciudad", value: profile.city },
    { label: goalLabelText, value: profile.goal },
    { label: "Foto", value: profile.photo },
    { label: "Deporte o notas", value: profile.sport || profile.notes },
    { label: "Modalidad", value: profile.mode },
    { label: "Nivel", value: profile.level },
    { label: "Servicios", value: profile.services?.length },
    { label: priceLabelText, value: profile.price },
    { label: "Disponibilidad", value: profile.availability },
    { label: "Presentación", value: profile.bio || profile.notes }
  ];
  const completed = items.filter((item) => Boolean(item.value));
  const pending = items.filter((item) => !item.value);
  return {
    completed,
    pending,
    percent: Math.round((completed.length / items.length) * 100)
  };
}

function profileCompleteness() {
  return profileCompletionDetails().percent;
}

function formatAccountDate(value) {
  if (!value) return "Sin actividad";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Sin actividad";
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

function accountProfileStatus(percent) {
  if (percent >= 85) return "Perfil fuerte";
  if (percent >= 60) return "Perfil activo";
  return "Perfil inicial";
}

function accountRecommendation(pendingLabels) {
  if (!pendingLabels.length) return "Tu perfil tiene las señales principales para recibir recomendaciones de calidad.";
  const priority = pendingLabels.slice(0, 2).join(" y ").toLowerCase();
  return `Completa ${priority} para mejorar tus resultados de matching.`;
}

function accountMatchScores() {
  return activeDirectory().map((person) => calculateScore(person));
}

function accountAverageAffinity(scores) {
  if (!scores.length) return "--";
  const total = scores.reduce((sum, score) => sum + score, 0);
  return `${Math.round(total / scores.length)}%`;
}

function renderAccountFieldList(container, labelsList, emptyText) {
  if (!container) return;
  container.replaceChildren();
  const labelsToRender = labelsList.length ? labelsList.slice(0, 5) : [emptyText];
  labelsToRender.forEach((text) => {
    const item = document.createElement("li");
    item.textContent = text;
    container.append(item);
  });
}

function profileTitle(person) {
  if (person.title) return person.title;

  if (person.role === "client") {
    const sportText = person.sport ? ` · ${person.sport}` : "";
    return `Busca ${label("goals", person.goal).toLowerCase()}${sportText}`;
  }

  const serviceNames = (person.services || []).map((service) => label("services", service)).join(" + ");
  const sportText = person.sport ? ` · ${person.sport}` : "";
  return serviceNames ? `${serviceNames}${sportText} · ${label("modes", person.mode)}` : "Profesional fitness";
}

function priceText(person) {
  if (!Number(person.price)) return person.role === "client" ? "Sin presupuesto" : "Sin precio";
  return person.role === "client" ? `Hasta ${person.price}€/sesión` : `${person.price}€/sesión`;
}

function hasSavedProfile() {
  return Boolean(profile.id) && dataProvider.listProfiles(profile.role).some((item) => item.id === profile.id);
}

function routeForProtectedView(viewName) {
  const requestedView = normalizeView(viewName);
  if (requestedView === "admin") return currentUser() && isAdminSession() ? "admin" : "account";
  if (!["register", "matches", "contacts", "ratings"].includes(requestedView)) return requestedView;

  if (requestedView === "register") {
    return currentUser() || hasSavedProfile() ? "register" : "account";
  }

  if (hasSavedProfile()) return requestedView;
  return currentUser() ? "register" : "account";
}

function adminSetText(element, value) {
  if (element) element.textContent = value;
}

const ADMIN_REPORT_REASONS = [
  ["perfil_falso", "Perfil falso"],
  ["informacion_enganosa", "Información engañosa"],
  ["conducta_inapropiada", "Conducta inapropiada"],
  ["acoso", "Acoso"],
  ["discriminacion", "Discriminación"],
  ["fraude", "Fraude o intento de estafa"],
  ["suplantacion", "Suplantación de identidad"],
  ["contenido_ofensivo", "Contenido ofensivo"],
  ["spam", "Spam"],
  ["sin_cualificacion", "Profesional sin cualificación declarada"],
  ["conducta", "Incumplimiento del código de conducta"],
  ["otro", "Otro"]
];

const ADMIN_REPORT_STATUS = {
  pendiente: "Pendiente",
  en_revision: "En revisión",
  requiere_informacion: "Requiere información",
  resuelta: "Resuelta",
  descartada: "Descartada"
};

const ADMIN_REPORT_PRIORITY = {
  baja: "Baja",
  media: "Media",
  alta: "Alta",
  critica: "Crítica"
};

const ADMIN_REPUTATION_RULES = {
  attention: { minRatings: 3, maxAverage: 2.5, label: "Atención" },
  high: { minRatings: 5, maxAverage: 2, label: "Alta" },
  critical: { minRatings: 10, maxAverage: 1.5, label: "Crítica" }
};

function adminReportReasonLabel(reason = "") {
  return ADMIN_REPORT_REASONS.find(([value]) => value === reason)?.[1]
    || String(reason || "otro").replaceAll("_", " ");
}

function adminAllContactRequests() {
  const allRequests = dataProvider.listAllContactRequests?.()
    || [
      ...dataProvider.listContactRequests("client", { direction: "all", profileId: "" }),
      ...dataProvider.listContactRequests("professional", { direction: "all", profileId: "" })
    ];
  const unique = new Map();
  allRequests.forEach((request) => {
    if (request?.id && !unique.has(request.id)) unique.set(request.id, request);
  });
  return Array.from(unique.values());
}

function adminProfileCompletionFor(person = {}) {
  const fields = [
    person.name,
    person.email,
    person.city,
    person.goal,
    person.sport,
    person.mode,
    person.level,
    (person.services || []).length,
    person.availability,
    person.bio,
    person.notes || person.matchNotes,
    person.photo
  ];
  const completed = fields.filter((value) => Array.isArray(value) ? value.length : Boolean(value)).length;
  return Math.round((completed / fields.length) * 100);
}

function adminTokenize(value = "") {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(/[^a-z0-9]+/)
    .filter((word) => word.length > 3);
}

function adminCompatibilityScore(client = {}, professional = {}) {
  let score = 10;
  const clientServices = client.services || [];
  const professionalServices = professional.services || [];
  const sharedServices = clientServices.filter((service) => professionalServices.includes(service));
  const clientCity = normalizeText(client.city);
  const professionalCity = normalizeText(professional.city);
  const clientSport = normalizeText(client.sport);
  const professionalSport = normalizeText(professional.sport);
  const notesA = adminTokenize([client.notes, client.matchNotes, client.bio, client.sport].join(" "));
  const notesB = new Set(adminTokenize([professional.notes, professional.matchNotes, professional.bio, professional.sport].join(" ")));
  const sharedNotes = notesA.filter((word) => notesB.has(word));

  if (client.goal && client.goal === professional.goal) score += 25;
  if (client.mode && client.mode === professional.mode) score += 20;
  if (client.level && client.level === professional.level) score += 15;
  if (clientCity && professionalCity && professionalCity !== "online" && (clientCity === professionalCity || clientCity.includes(professionalCity) || professionalCity.includes(clientCity))) score += 10;
  score += Math.min(sharedServices.length * 12, 24);
  if (clientSport && professionalSport && (clientSport === professionalSport || clientSport.includes(professionalSport) || professionalSport.includes(clientSport))) score += 12;
  score += Math.min(sharedNotes.length * 4, 16);

  return Math.min(score, 99);
}

function adminAllMatchPairs(clients = [], professionals = []) {
  const pairs = [];
  clients.forEach((client) => {
    professionals.forEach((professional) => {
      pairs.push({ client, professional, score: adminCompatibilityScore(client, professional) });
    });
  });
  return pairs.sort((a, b) => b.score - a.score);
}

function adminPotentialMatches(clients = [], professionals = []) {
  return adminAllMatchPairs(clients, professionals).filter((match) => match.score >= 45);
}

function adminDateLabel(value, withYear = false) {
  if (!value) return "sin fecha";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "sin fecha";
  return date.toLocaleString("es-ES", {
    day: "2-digit",
    month: "short",
    ...(withYear ? { year: "numeric" } : {}),
    hour: "2-digit",
    minute: "2-digit"
  });
}

function adminDateMs(value) {
  const time = new Date(value || 0).getTime();
  return Number.isNaN(time) ? 0 : time;
}

function adminPeriodConfig() {
  const key = adminPeriodFilter?.value || "all";
  const now = Date.now();
  const days = key === "today" ? 1 : key === "7d" ? 7 : key === "30d" ? 30 : 0;
  return {
    key,
    label: key === "today" ? "Hoy" : key === "7d" ? "Últimos 7 días" : key === "30d" ? "Últimos 30 días" : "Desde el inicio",
    start: days ? now - days * 24 * 60 * 60 * 1000 : 0,
    now
  };
}

function adminInPeriod(item, period, field = "createdAt") {
  if (!period?.start) return true;
  const time = adminDateMs(item?.[field] || item?.created_at || item);
  return time >= period.start && time <= period.now;
}

function adminCountSince(items = [], days = 0, field = "createdAt") {
  if (!items.length) return 0;
  const start = Date.now() - days * 24 * 60 * 60 * 1000;
  return items.filter((item) => adminDateMs(item?.[field] || item?.created_at || item) >= start).length;
}

function adminTrendText(items = [], field = "createdAt") {
  if (!items.length) return "Sin histórico suficiente";
  return `Hoy ${adminCountSince(items, 1, field)} · 7d ${adminCountSince(items, 7, field)} · 30d ${adminCountSince(items, 30, field)}`;
}

function adminPercent(value, total) {
  if (!total) return "--";
  return Math.round((value / total) * 100) + "%";
}

function adminAverage(values = []) {
  const clean = values.map(Number).filter((value) => Number.isFinite(value));
  if (!clean.length) return 0;
  return clean.reduce((sum, value) => sum + value, 0) / clean.length;
}

function adminMedian(values = []) {
  const clean = values.map(Number).filter((value) => Number.isFinite(value)).sort((a, b) => a - b);
  if (!clean.length) return 0;
  const middle = Math.floor(clean.length / 2);
  return clean.length % 2 ? clean[middle] : (clean[middle - 1] + clean[middle]) / 2;
}

function adminDurationLabel(ms) {
  if (!ms || ms < 0) return "Sin histórico suficiente";
  const minutes = Math.round(ms / 60000);
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.round(minutes / 60);
  if (hours < 48) return `${hours} h`;
  return `${Math.round(hours / 24)} días`;
}

function adminProfileName(person = {}) {
  return person.name || person.email || person.id || "Usuario Fit Match";
}

function adminProfileById(profiles = []) {
  return new Map(profiles.map((person) => [person.id, person]));
}

function adminRequestUserIds(request = {}) {
  return [request.sender?.id, request.recipient?.id].filter(Boolean);
}

function adminHasConversation(request = {}) {
  return Boolean(request.readAt || request.contactStartedBy?.length || request.status === "accepted");
}

function adminRenderMetricRow(container, labelText, value, note = "") {
  if (!container) return;
  const row = createElement("div", "admin-metric-row");
  const labelNode = createElement("span", "", labelText);
  const valueNode = createElement("strong", "", value);
  row.append(labelNode, valueNode);
  if (note) row.append(createElement("small", "", note));
  container.append(row);
}

function adminRenderEmpty(container, text = "Todavía no hay datos suficientes.") {
  if (!container) return;
  container.replaceChildren(createElement("p", "empty-copy", text));
}

function adminRenderActivity(container, items = []) {
  if (!container) return;
  container.innerHTML = "";
  if (!items.length) {
    adminRenderEmpty(container, "Todavía no hay actividad suficiente para mostrar.");
    return;
  }

  const seen = new Set();
  items
    .sort((a, b) => adminDateMs(b.createdAt) - adminDateMs(a.createdAt))
    .filter((item) => {
      const key = [item.type, item.user, item.related, Math.floor(adminDateMs(item.createdAt) / 60000)].join(":");
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 10)
    .forEach((item) => {
      const row = createElement("article", "admin-activity-item");
      row.append(
        createElement("strong", "", item.title),
        createElement("span", "", `${item.user || "Usuario"} · ${adminDateLabel(item.createdAt)}`)
      );
      if (item.related) row.append(createElement("small", "", item.related));
      container.append(row);
    });
}

function adminRenderFunnel(container, stages = []) {
  if (!container) return;
  container.innerHTML = "";
  if (!stages.length) {
    adminRenderEmpty(container);
    return;
  }
  const total = stages[0]?.count || 0;
  stages.forEach((stage, index) => {
    const previous = index ? stages[index - 1].count : stage.count;
    const row = createElement("article", "admin-funnel-row");
    const header = createElement("div", "admin-funnel-main");
    header.append(createElement("span", "", `${index + 1}. ${stage.label}`), createElement("strong", "", String(stage.count)));
    const meta = createElement("div", "admin-funnel-meta");
    meta.append(
      createElement("span", "", `vs anterior ${adminPercent(stage.count, previous)}`),
      createElement("span", "", `vs total ${adminPercent(stage.count, total)}`),
      createElement("span", "", `abandono ${Math.max(previous - stage.count, 0)}`)
    );
    row.append(header, meta);
    container.append(row);
  });
}

function adminRenderDetailGroup(container, labelText, items = [], note = "") {
  if (!container) return;
  const details = createElement("details", "admin-detail-group");
  const summary = createElement("summary");
  summary.append(createElement("strong", "", labelText), createElement("span", "", String(items.length)));
  details.append(summary);
  if (note) details.append(createElement("p", "", note));
  const list = createElement("div", "admin-detail-items");
  if (!items.length) {
    list.append(createElement("small", "", "Sin usuarios en este grupo."));
  } else {
    items.slice(0, 12).forEach((item) => {
      list.append(createElement("span", "", `${adminProfileName(item)} · ${roleLabel(item.role) || "Perfil"}`));
    });
    if (items.length > 12) list.append(createElement("small", "", `+${items.length - 12} más`));
  }
  details.append(list);
  container.append(details);
}

function adminMissingFieldRows(profiles = []) {
  const definitions = [
    ["Foto", (person) => person.photo],
    ["Ciudad", (person) => person.city && normalizeText(person.city) !== "online"],
    ["Objetivo / especialidad", (person) => person.goal],
    ["Deporte", (person) => person.sport],
    ["Modalidad", (person) => person.mode],
    ["Precio / presupuesto", (person) => Number(person.price) > 0],
    ["Disponibilidad", (person) => person.availability && person.availability !== "Por definir"],
    ["Presentación", (person) => person.bio && !person.bio.includes("Perfil creado")],
    ["Criterio de trabajo", (person) => person.notes],
    ["Servicios", (person) => person.services?.length]
  ];
  return definitions.map(([labelText, test]) => {
    const missing = profiles.filter((profileItem) => !test(profileItem)).length;
    return { label: labelText, missing, percent: profiles.length ? Math.round((missing / profiles.length) * 100) : 0 };
  }).sort((a, b) => b.missing - a.missing);
}

function adminRatingsByTarget(ratings = []) {
  return ratings.reduce((map, rating) => {
    if (!rating.targetId) return map;
    const list = map.get(rating.targetId) || [];
    list.push(rating);
    map.set(rating.targetId, list);
    return map;
  }, new Map());
}

function adminRatingAlertFor(person, ratings = [], reports = []) {
  const ownRatings = ratings.filter((rating) => rating.targetId === person.id);
  const count = ownRatings.length;
  const average = count ? adminAverage(ownRatings.map((rating) => rating.averageScore)) : 0;
  const severeReports = reports.filter((report) => report.targetId === person.id && ["alta", "critica"].includes(report.priority) && !["resuelta", "descartada"].includes(report.status));
  let level = "";
  if (count >= ADMIN_REPUTATION_RULES.critical.minRatings && average <= ADMIN_REPUTATION_RULES.critical.maxAverage) level = "critical";
  else if (count >= ADMIN_REPUTATION_RULES.high.minRatings && average <= ADMIN_REPUTATION_RULES.high.maxAverage) level = "high";
  else if (count >= ADMIN_REPUTATION_RULES.attention.minRatings && average <= ADMIN_REPUTATION_RULES.attention.maxAverage) level = "attention";
  if (!level && severeReports.length >= 2 && count >= 3 && average <= 2.7) level = "critical";
  return { person, count, average, level, severeReports };
}

function adminBuildAlerts({ profiles, requests, reports, reputationAlerts }) {
  const pendingReports = reports.filter((report) => !["resuelta", "descartada"].includes(report.status));
  const criticalReports = pendingReports.filter((report) => report.priority === "critica");
  const unanswered = requests.filter((request) => !adminHasConversation(request));
  const incomplete = profiles.filter((item) => adminProfileCompletionFor(item) < 60);
  const alerts = [];
  if (criticalReports.length) alerts.push({ level: "critical", title: `${criticalReports.length} denuncias críticas pendientes`, note: "Revisión humana prioritaria." });
  if (reputationAlerts.some((alert) => alert.level === "critical")) alerts.push({ level: "critical", title: "Reputación crítica detectada", note: "Hay perfiles con media baja y volumen suficiente." });
  if (pendingReports.length && !criticalReports.length) alerts.push({ level: "attention", title: `${pendingReports.length} denuncias abiertas`, note: "Revisar estado, prioridad y notas internas." });
  if (unanswered.length >= 5) alerts.push({ level: "attention", title: `${unanswered.length} solicitudes sin respuesta`, note: "Puede afectar a la percepción de la beta." });
  if (incomplete.length) alerts.push({ level: "attention", title: `${incomplete.length} perfiles con poca información`, note: "Puede reducir la calidad del matching." });
  if (!alerts.length) alerts.push({ level: "normal", title: "La beta no muestra alertas graves", note: "Registros, perfiles y contactos se leen correctamente." });
  return alerts.sort((a, b) => ({ critical: 0, attention: 1, normal: 2 }[a.level] - { critical: 0, attention: 1, normal: 2 }[b.level]));
}

function adminRenderAlerts(container, alerts = []) {
  if (!container) return;
  container.innerHTML = "";
  alerts.forEach((alert) => {
    const row = createElement("article", `admin-alert-item ${alert.level}`);
    row.append(createElement("span", "", alert.level === "critical" ? "Crítico" : alert.level === "attention" ? "Atención" : "Normal"), createElement("strong", "", alert.title), createElement("p", "", alert.note));
    container.append(row);
  });
}

function adminRenderReports(container, reports = [], profiles = []) {
  if (!container) return;
  container.innerHTML = "";
  const statusFilter = adminReportStatusFilter?.value || "all";
  const reasonFilter = adminReportReasonFilter?.value || "all";
  const priorityFilter = adminReportPriorityFilter?.value || "all";
  const filtered = reports.filter((report) =>
    (statusFilter === "all" || report.status === statusFilter)
    && (reasonFilter === "all" || report.reason === reasonFilter)
    && (priorityFilter === "all" || report.priority === priorityFilter)
  );
  if (!filtered.length) {
    adminRenderEmpty(container, "Aún no hay denuncias con esos filtros.");
    return;
  }
  const reportsByTarget = filtered.reduce((map, report) => {
    const list = map.get(report.targetId) || [];
    list.push(report);
    map.set(report.targetId, list);
    return map;
  }, new Map());

  filtered.slice(0, 12).forEach((report) => {
    const target = profiles.find((person) => person.id === report.targetId);
    const article = createElement("article", `admin-report-item priority-${report.priority}`);
    article.dataset.reportId = report.id;
    const header = createElement("div", "admin-report-main");
    header.append(
      createElement("strong", "", report.targetName || adminProfileName(target)),
      createElement("span", "", `${adminReportReasonLabel(report.reason)} · ${adminDateLabel(report.createdAt)}`)
    );
    const chips = createElement("div", "admin-report-chips");
    chips.append(
      createElement("span", "", ADMIN_REPORT_STATUS[report.status] || report.status),
      createElement("span", "", `Prioridad ${ADMIN_REPORT_PRIORITY[report.priority] || report.priority}`),
      createElement("span", "", `${reportsByTarget.get(report.targetId)?.length || 1} denuncia(s) del perfil`)
    );
    const description = createElement("p", "", report.description || "Sin descripción adicional.");
    const controls = createElement("div", "admin-report-controls");
    const statusSelect = createElement("select");
    statusSelect.dataset.adminReportStatus = report.id;
    Object.entries(ADMIN_REPORT_STATUS).forEach(([value, labelText]) => {
      const option = createElement("option", "", labelText);
      option.value = value;
      option.selected = report.status === value;
      statusSelect.append(option);
    });
    const prioritySelect = createElement("select");
    prioritySelect.dataset.adminReportPriority = report.id;
    Object.entries(ADMIN_REPORT_PRIORITY).forEach(([value, labelText]) => {
      const option = createElement("option", "", labelText);
      option.value = value;
      option.selected = report.priority === value;
      prioritySelect.append(option);
    });
    const notes = createElement("textarea");
    notes.dataset.adminReportNotes = report.id;
    notes.placeholder = "Notas internas de moderación";
    notes.value = report.internalNotes || "";
    const saveButton = createElement("button", "button primary compact", "Guardar revisión");
    saveButton.type = "button";
    saveButton.dataset.adminReportSave = report.id;
    controls.append(statusSelect, prioritySelect, notes, saveButton);
    article.append(header, chips, description, controls);
    container.append(article);
  });
}

function adminRenderReputation(container, profiles = [], ratings = [], reports = []) {
  if (!container) return;
  container.innerHTML = "";
  if (!ratings.length) {
    adminRenderEmpty(container, "Aún no hay valoraciones para calcular reputación.");
    return;
  }
  const distribution = [5, 4, 3, 2, 1].map((star) => ratings.filter((rating) => Math.round(Number(rating.averageScore) || 0) === star).length);
  adminRenderMetricRow(container, "Media global", adminAverage(ratings.map((rating) => rating.averageScore)).toFixed(1) + "/5", `${ratings.length} valoraciones`);
  adminRenderMetricRow(container, "Distribución", distribution.map((count, index) => `${5 - index}★ ${count}`).join(" · "), "primer contacto y servicio real separados en detalle");
  const firstContact = ratings.filter((rating) => rating.ratingType === "first_contact");
  const service = ratings.filter((rating) => rating.ratingType === "service");
  adminRenderMetricRow(container, "Primer contacto", firstContact.length ? adminAverage(firstContact.map((rating) => rating.averageScore)).toFixed(1) + "/5" : "--", `${firstContact.length} señales`);
  adminRenderMetricRow(container, "Servicio real", service.length ? adminAverage(service.map((rating) => rating.averageScore)).toFixed(1) + "/5" : "--", `${service.length} señales`);

  const alerts = profiles.map((person) => adminRatingAlertFor(person, ratings, reports)).filter((alert) => alert.level);
  if (alerts.length) {
    alerts.slice(0, 5).forEach((alert) => {
      adminRenderMetricRow(container, adminProfileName(alert.person), `${alert.average.toFixed(1)}/5`, `${alert.count} valoraciones · alerta ${alert.level}`);
    });
  }
}

function adminRenderUsers(container, profiles = [], requests = [], ratings = [], reports = [], events = []) {
  if (!container) return;
  container.innerHTML = "";
  if (!profiles.length) {
    adminRenderEmpty(container, "Aún no hay usuarios registrados.");
    return;
  }
  const recentEventsByUser = events.reduce((map, event) => {
    const key = event.userId || event.email || "";
    if (!key) return map;
    const current = map.get(key);
    if (!current || adminDateMs(event.createdAt) > adminDateMs(current.createdAt)) map.set(key, event);
    return map;
  }, new Map());

  profiles
    .slice()
    .sort((aProfile, bProfile) => adminDateMs(bProfile.updatedAt) - adminDateMs(aProfile.updatedAt))
    .slice(0, 10)
    .forEach((person) => {
      const details = createElement("details", "admin-user-card");
      const summary = createElement("summary");
      summary.append(createElement("strong", "", adminProfileName(person)), createElement("span", "", `${roleLabel(person.role)} · ${person.city || "Online"}`));
      const body = createElement("div", "admin-user-body");
      const relatedRequests = requests.filter((request) => adminRequestUserIds(request).includes(person.id));
      const relatedRatings = ratings.filter((rating) => rating.targetId === person.id || rating.raterId === person.id);
      const receivedReports = reports.filter((report) => report.targetId === person.id);
      const madeReports = reports.filter((report) => report.reporterId === person.id || report.reporterEmail === person.email);
      const lastEvent = recentEventsByUser.get(person.id) || recentEventsByUser.get(person.email);
      body.append(
        createElement("span", "", `Email: ${person.email || "privado/no disponible"}`),
        createElement("span", "", `Perfil: ${adminProfileCompletionFor(person)}%`),
        createElement("span", "", `Solicitudes: ${relatedRequests.length}`),
        createElement("span", "", `Valoraciones: ${relatedRatings.length}`),
        createElement("span", "", `Denuncias recibidas: ${receivedReports.length}`),
        createElement("span", "", `Denuncias realizadas: ${madeReports.length}`),
        createElement("span", "", `Última actividad: ${lastEvent ? adminDateLabel(lastEvent.createdAt, true) : adminDateLabel(person.updatedAt, true)}`)
      );
      details.append(summary, body);
      container.append(details);
    });
}

function renderAdminDashboard() {
  updateAdminNavigation();
  const isAllowed = isAdminSession();
  if (adminDeniedCard) adminDeniedCard.hidden = isAllowed;
  if (adminDashboard) adminDashboard.hidden = !isAllowed;
  if (adminModeBadge) adminModeBadge.textContent = isAllowed ? "Admin activo" : "Solo admin";
  if (!isAllowed) return;

  const period = adminPeriodConfig();
  adminSetText(adminPeriodLabel, period.label);

  const profiles = dataProvider.listProfiles();
  const clients = profiles.filter((item) => item.role === "client");
  const professionals = profiles.filter((item) => item.role === "professional");
  const requests = adminAllContactRequests();
  const ratings = dataProvider.listRatings?.() || [];
  const reports = dataProvider.listReports?.() || [];
  const events = dataProvider.listAppEvents?.() || [];
  const possibleMatches = adminPotentialMatches(clients, professionals);
  const allMatchPairs = adminAllMatchPairs(clients, professionals);
  const pendingRequests = requests.filter((request) => request.status === "pending" && !adminHasConversation(request)).length;
  const averageRating = ratings.length
    ? (ratings.reduce((sum, rating) => sum + (Number(rating.averageScore) || 0), 0) / ratings.length).toFixed(1)
    : "--";
  const completedProfiles = profiles.filter((item) => adminProfileCompletionFor(item) >= 80);
  const activeToday = new Set(events.filter((event) => adminCountSince([event], 1)).map((event) => event.userId || event.email)).size;
  const pendingReports = reports.filter((report) => !["resuelta", "descartada"].includes(report.status));
  const reputationAlerts = profiles.map((person) => adminRatingAlertFor(person, ratings, reports)).filter((alert) => alert.level);

  adminSetText(adminMetricProfiles, String(profiles.length));
  adminSetText(adminMetricRoleSplit, `${clients.length} clientes · ${professionals.length} profesionales`);
  adminSetText(adminMetricClients, String(clients.length));
  adminSetText(adminMetricClientsTrend, adminTrendText(clients));
  adminSetText(adminMetricProfessionals, String(professionals.length));
  adminSetText(adminMetricProfessionalsTrend, adminTrendText(professionals));
  adminSetText(adminMetricActiveToday, String(activeToday));
  adminSetText(adminMetricActiveTrend, events.length ? `${adminCountSince(events, 7)} eventos 7d · ${adminCountSince(events, 30)} eventos 30d` : "Sin histórico suficiente");
  adminSetText(adminMetricCompleteProfiles, String(completedProfiles.length));
  adminSetText(adminMetricCompleteNote, profiles.length ? `${adminPercent(completedProfiles.length, profiles.length)} del total` : "Sin perfiles");
  adminSetText(adminMetricMatches, String(possibleMatches.length));
  adminSetText(adminMetricMatchesTrend, allMatchPairs.length ? `${allMatchPairs.filter((match) => match.score >= 70).length} altos · ${allMatchPairs.filter((match) => match.score >= 45 && match.score < 70).length} medios` : "Sin cruces todavía");
  adminSetText(adminMetricContacts, String(requests.length));
  adminSetText(adminMetricPending, String(pendingRequests));
  adminSetText(adminMetricRatings, String(ratings.length));
  adminSetText(adminMetricAverage, averageRating === "--" ? "--" : averageRating + "/5");
  adminSetText(adminMetricReports, String(pendingReports.length));
  adminSetText(adminMetricReportsNote, pendingReports.length ? `${pendingReports.filter((report) => ["alta", "critica"].includes(report.priority)).length} de alta prioridad` : "Sin incidencias abiertas");

  const matchedUserIds = new Set(possibleMatches.flatMap((match) => [match.client.id, match.professional.id]));
  const requestSenderIds = new Set(requests.map((request) => request.sender?.id).filter(Boolean));
  const conversationUserIds = new Set(requests.filter(adminHasConversation).flatMap(adminRequestUserIds));
  const ratedUserIds = new Set(ratings.map((rating) => rating.raterId).filter(Boolean));
  const funnelStages = [
    { label: "Registro iniciado", count: Math.max(profiles.length, new Set(events.map((event) => event.userId || event.email).filter(Boolean)).size) },
    { label: "Cuenta creada", count: profiles.length },
    { label: "Perfil empezado", count: profiles.filter((item) => adminProfileCompletionFor(item) >= 35).length },
    { label: "Perfil completado", count: completedProfiles.length },
    { label: "Primer match mostrado", count: matchedUserIds.size },
    { label: "Primera solicitud enviada", count: requestSenderIds.size },
    { label: "Primer contacto aceptado", count: conversationUserIds.size },
    { label: "Primera conversación iniciada", count: conversationUserIds.size },
    { label: "Primera experiencia valorada", count: ratedUserIds.size }
  ];
  adminRenderFunnel(adminFunnelList, funnelStages);

  if (adminTimeList) {
    adminTimeList.innerHTML = "";
    const durationFor = (predicate, targetDate) => profiles.map((person) => {
      if (!predicate(person)) return 0;
      return adminDateMs(targetDate(person)) - adminDateMs(person.createdAt);
    }).filter((value) => value > 0);
    const profileDurations = durationFor((person) => adminProfileCompletionFor(person) >= 80, (person) => person.updatedAt);
    const requestDurations = requests.map((request) => {
      const sender = profiles.find((person) => person.id === request.sender?.id);
      return sender ? adminDateMs(request.createdAt) - adminDateMs(sender.createdAt) : 0;
    }).filter((value) => value > 0);
    const conversationDurations = requests.filter(adminHasConversation).map((request) => adminDateMs(request.readAt || request.createdAt) - adminDateMs(request.createdAt)).filter((value) => value >= 0);
    const ratingDurations = ratings.map((rating) => {
      const rater = profiles.find((person) => person.id === rating.raterId);
      return rater ? adminDateMs(rating.createdAt) - adminDateMs(rater.createdAt) : 0;
    }).filter((value) => value > 0);
    [
      ["Registro → perfil completo", profileDurations],
      ["Registro → primera solicitud", requestDurations],
      ["Solicitud → primer contacto", conversationDurations],
      ["Registro → primera valoración", ratingDurations]
    ].forEach(([labelText, values]) => {
      adminRenderMetricRow(adminTimeList, labelText, values.length ? adminDurationLabel(adminAverage(values)) : "Sin histórico suficiente", values.length ? `mediana ${adminDurationLabel(adminMedian(values))}` : "Necesita más actividad real");
    });
  }

  if (adminNoProgressList) {
    adminNoProgressList.innerHTML = "";
    const usersWithRequests = new Set(requests.flatMap(adminRequestUserIds));
    const noMatches = profiles.filter((person) => !matchedUserIds.has(person.id));
    const matchesNoRequests = profiles.filter((person) => matchedUserIds.has(person.id) && !usersWithRequests.has(person.id));
    const unansweredUsers = profiles.filter((person) => requests.some((request) => adminRequestUserIds(request).includes(person.id) && !adminHasConversation(request)));
    const inactive7 = profiles.filter((person) => adminDateMs(person.updatedAt) < Date.now() - 7 * 24 * 60 * 60 * 1000);
    const inactive30 = profiles.filter((person) => adminDateMs(person.updatedAt) < Date.now() - 30 * 24 * 60 * 60 * 1000);
    adminRenderDetailGroup(adminNoProgressList, "Perfiles incompletos", profiles.filter((item) => adminProfileCompletionFor(item) < 80), "Menos de 80% de datos útiles.");
    adminRenderDetailGroup(adminNoProgressList, "Usuarios sin matches", noMatches, "Puede indicar desequilibrio oferta/demanda.");
    adminRenderDetailGroup(adminNoProgressList, "Matches sin solicitudes", matchesNoRequests, "Ven resultados pero todavía no contactan.");
    adminRenderDetailGroup(adminNoProgressList, "Solicitudes sin respuesta", unansweredUsers, "Contactos pendientes de lectura o avance.");
    adminRenderDetailGroup(adminNoProgressList, "Inactivos 7 días", inactive7, "No han actualizado su perfil en una semana.");
    adminRenderDetailGroup(adminNoProgressList, "Inactivos 30 días", inactive30, "Candidatos para reactivación futura.");
  }

  if (adminMatchQualityList) {
    adminMatchQualityList.innerHTML = "";
    const scores = allMatchPairs.map((match) => match.score);
    adminRenderMetricRow(adminMatchQualityList, "Afinidad alta", String(allMatchPairs.filter((match) => match.score >= 70).length), "70% o más");
    adminRenderMetricRow(adminMatchQualityList, "Afinidad media", String(allMatchPairs.filter((match) => match.score >= 45 && match.score < 70).length), "45% a 69%");
    adminRenderMetricRow(adminMatchQualityList, "Afinidad baja", String(allMatchPairs.filter((match) => match.score < 45).length), "menos de 45%");
    adminRenderMetricRow(adminMatchQualityList, "Media / mediana", scores.length ? `${adminAverage(scores).toFixed(0)}% / ${adminMedian(scores).toFixed(0)}%` : "--", "calidad general del cruce");
    adminRenderMetricRow(adminMatchQualityList, "Matches por cliente", clients.length ? (possibleMatches.length / clients.length).toFixed(1) : "--", "oferta visible");
    adminRenderMetricRow(adminMatchQualityList, "Clientes por profesional", professionals.length ? (clients.length / professionals.length).toFixed(1) : "--", "equilibrio mercado");
  }

  if (adminMissingFieldsList) {
    adminMissingFieldsList.innerHTML = "";
    adminMissingFieldRows(profiles).slice(0, 8).forEach((item) => {
      adminRenderMetricRow(adminMissingFieldsList, item.label, `${item.percent}%`, `${item.missing} perfiles sin completar`);
    });
  }

  const requestActivity = requests.map((request) => ({
    type: "request",
    title: adminHasConversation(request) ? "Contacto leído o iniciado" : "Solicitud enviada",
    user: `${request.sender?.name || "Usuario"} → ${request.recipient?.name || "Perfil"}`,
    related: `${request.score || 0}% de afinidad`,
    createdAt: request.createdAt
  }));
  const reportActivity = reports.map((report) => ({
    type: "report",
    title: "Denuncia enviada",
    user: report.reporterName || report.reporterEmail || "Usuario",
    related: report.targetName || report.targetId,
    createdAt: report.createdAt
  }));
  const eventActivity = events.map((event) => ({
    type: event.eventType,
    title: event.eventType === "view_opened" ? `Vista abierta: ${event.metadata?.view || "app"}` : event.eventType.replaceAll("_", " "),
    user: event.email || event.userId || "usuario",
    related: event.metadata?.targetId || event.metadata?.profileId || "",
    createdAt: event.createdAt
  }));
  adminRenderActivity(adminRecentActivity, [...requestActivity, ...reportActivity, ...eventActivity]);

  adminRenderAlerts(adminAlertList, adminBuildAlerts({ profiles, requests, reports, reputationAlerts }));
  adminRenderReports(adminReportList, reports, profiles);
  adminRenderReputation(adminReputationList, profiles, ratings, reports);
  adminRenderUsers(adminUserList, profiles, requests, ratings, reports, events);

  if (adminLastSync) adminLastSync.textContent = `Última actualización: ${adminDateLabel(new Date().toISOString(), true)} · ${period.label}`;
}

function updateProfileStatus() {
  if (!profileStatusTitle) return;

  const percent = profileCompleteness();
  const targetProfiles = dataProvider.listProfiles(oppositeRole(profile.role)).length;
  const requestCount = dataProvider.listContactRequests(profile.role, { profileId: profile.id }).length;
  const serviceText = profile.services.length === 0 ? "sin servicios marcados todavía" : profile.services.length === 1 ? "1 servicio seleccionado" : `${profile.services.length} servicios seleccionados`;
  const isRegistered = Boolean(profile.id) && dataProvider.listProfiles(profile.role).some((item) => item.id === profile.id);
  const savedText = isRegistered ? "Tu perfil está guardado" : "Tu perfil aún no está guardado";
  const storageText = isRemoteMode() ? "Guardado protegido en tu cuenta" : "Se guardará en este navegador hasta iniciar sesión";
  const targetText = targetProfiles === 1
    ? `1 ${profile.role === "client" ? "profesional compatible disponible" : "cliente compatible disponible"}`
    : `${targetProfiles} ${profile.role === "client" ? "profesionales compatibles disponibles" : "clientes compatibles disponibles"}`;

  profileStatusTitle.textContent = `${savedText} · ${percent}% completo`;
  profileStatusCopy.textContent = `${targetText} · ${serviceText}. Cuantos más campos completes, mejor será el match. ${storageText}.`;
  profileStatusBar.style.width = `${percent}%`;
  if (profileBuilderProgressValue) profileBuilderProgressValue.textContent = `${percent}%`;
  if (profileBuilderProgressBar) profileBuilderProgressBar.style.width = `${percent}%`;
  if (profileBuilderProgressCopy) {
    profileBuilderProgressCopy.textContent = percent >= 90
      ? "Tu perfil ya transmite mucha confianza."
      : "Solo te faltan unos pasos para mejorar tu visibilidad.";
  }
  savedRoleLabel.textContent = roleLabel(profile.role);
  savedRequestsCount.textContent = String(requestCount);
  updateProfileContextCard();
  if (matchesContextScore) matchesContextScore.textContent = `${Math.round(percent + 8 > 99 ? 99 : percent + 8)}%`;
  renderProfileHome();
}

function updateRoleCopy() {
  const copy = currentCopy();
  const activeRoleButton = document.querySelector(`.role-option[data-role="${profile.role}"]`);

  onboardingTitle.textContent = copy.onboardingTitle;
  onboardingCopy.textContent = copy.onboardingCopy;
  if (accountRoleTitle) accountRoleTitle.textContent = profile.role === "client" ? "Cliente: quiero encontrar profesional" : "Profesional: quiero aparecer en Fit Match";
  if (accountRoleCopy) accountRoleCopy.textContent = profile.role === "client"
    ? "Si ya tienes cuenta, entra para ver profesionales compatibles. Si no, crea tu cuenta cliente."
    : "Haz crecer tu negocio conectando con clientes compatibles.";
  if (createAccountRouteButton) createAccountRouteButton.textContent = profile.role === "client" ? "Crear cuenta cliente" : "Crear cuenta profesional";
  roleHelp.querySelector("strong").textContent = copy.roleHelpTitle;
  roleHelp.querySelector("span").textContent = copy.roleHelp;
  updateProfileFieldCopy();
  updateProfileContextCard();
  form.querySelector('button[type="submit"]').textContent = isRemoteMode()
    ? `${copy.submit} en Supabase`
    : "Crear cuenta y buscar matches";
  matchesTitle.textContent = copy.matchesTitle;
  matchesCopy.textContent = copy.matchesCopy;
  requestsTitle.textContent = "Conversaciones y próximos pasos";
  requestsCopy.textContent = "Aquí puedes leer mensajes, responder, avanzar al contacto y valorar experiencias reales.";
  modalTitle.textContent = copy.modalTitle;
  sendRequestButton.textContent = copy.sendAction;
  historyTitle.textContent = "Bandeja de contactos";

  if (activeRoleButton) {
    matchesPanel.setAttribute("aria-labelledby", activeRoleButton.id);
  }

  updateNavigationState(activeView);
}

function setRoleButtonState() {
  roleButtons.forEach((button) => {
    const selected = button.dataset.role === profile.role;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-selected", String(selected));
  });
  updateRoleModeClass();
}

function loadRoleProfile(role) {
  const draft = dataProvider.getProfileDraft(role);
  Object.keys(profile).forEach((key) => delete profile[key]);
  Object.assign(profile, createBlankProfile(role), draft || {});
  setFormFromProfile();
}

function activeDirectory() {
  return dataProvider.getDirectory(profile.role);
}

function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9ñ\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function profileKeywords(person) {
  const stopWords = new Set([
    "para", "como", "quiero", "busco", "ofrezco", "tengo", "con", "por", "una", "uno", "las", "los", "del", "que", "este", "esta", "online", "presencial", "hibrido"
  ]);
  const source = normalizeText(`${person.sport || ""} ${person.notes || ""} ${person.bio || ""}`);
  return new Set(
    source
      .split(" ")
      .map((word) => word.trim())
      .filter((word) => word.length >= 4 && !stopWords.has(word))
  );
}

function sharedObservationKeywords(person) {
  const ownKeywords = profileKeywords(profile);
  const otherKeywords = profileKeywords(person);
  return Array.from(ownKeywords).filter((word) => otherKeywords.has(word)).slice(0, 4);
}

function sameSport(person) {
  const ownSport = normalizeText(profile.sport);
  const otherSport = normalizeText(person.sport);
  if (!ownSport || !otherSport) return false;
  return ownSport === otherSport || ownSport.includes(otherSport) || otherSport.includes(ownSport);
}

function sameCity(person) {
  const ownCity = normalizeText(profile.city);
  const otherCity = normalizeText(person.city);
  if (!ownCity || !otherCity || otherCity === "online") return false;
  return ownCity === otherCity || ownCity.includes(otherCity) || otherCity.includes(ownCity);
}

function calculateScore(person) {
  let score = 10;

  if ((person.goals || []).includes(profile.goal)) score += 25;
  if ((person.modes || []).includes(profile.mode)) score += 20;
  if ((person.levels || []).includes(profile.level)) score += 15;
  if (sameCity(person)) score += 10;

  const sharedServices = profile.services.filter((service) =>
    (person.services || []).includes(service)
  );
  score += Math.min(sharedServices.length * 12, 24);

  if (sameSport(person)) score += 12;
  score += Math.min(sharedObservationKeywords(person).length * 4, 16);

  return Math.min(score, 99);
}

function scoreLevel(score) {
  if (score >= 85) return { className: "score-high", label: "Afinidad alta" };
  if (score >= 65) return { className: "score-medium", label: "Afinidad media" };
  return { className: "score-low", label: "Encaje exploratorio" };
}

function sharedServiceLabels(person) {
  return profile.services
    .filter((service) => (person.services || []).includes(service))
    .map((service) => label("services", service));
}

function getMatchReasons(person) {
  const reasons = [];
  const sharedServices = sharedServiceLabels(person);

  if ((person.goals || []).includes(profile.goal)) reasons.push("Coincide en objetivo");
  if (sameCity(person)) reasons.push("Disponible en tu ciudad");
  if ((person.modes || []).includes(profile.mode)) reasons.push("Modalidad compatible");
  if ((person.levels || []).includes(profile.level)) reasons.push("Nivel adecuado");
  if (sharedServices.length) reasons.push(`Servicio compartido: ${sharedServices[0]}`);
  if (sameSport(person)) reasons.push(`Mismo deporte: ${person.sport}`);

  const sharedKeywords = sharedObservationKeywords(person);
  if (sharedKeywords.length) reasons.push(`Coincide en notas: ${sharedKeywords.slice(0, 2).join(", ")}`);

  return reasons.length ? reasons.slice(0, 4) : ["Encaje parcial según tus filtros"];
}

function renderPills(container, values, group) {
  values.forEach((value) => {
    container.append(createElement("span", "pill", label(group, value)));
  });
}

function renderReasons(container, reasons) {
  reasons.forEach((reason) => {
    container.append(createElement("li", "", reason));
  });
}

function buildStat(labelText, valueText) {
  const stat = createElement("div", "stat");
  stat.append(
    createElement("span", "", labelText),
    createElement("strong", "", valueText)
  );
  return stat;
}

function showLoadingState() {
  resultsSummary.textContent = "Calculando afinidades con tus perfiles...";
  matchList.replaceChildren();

  for (let index = 0; index < 2; index += 1) {
    const loading = createElement("article", "match-card loading-card");
    loading.setAttribute("aria-hidden", "true");
    loading.append(
      createElement("div", "loading-line wide"),
      createElement("div", "loading-line"),
      createElement("div", "loading-line short")
    );
    matchList.append(loading);
  }
}

function renderEmptyState(message, detail, action) {
  const empty = createElement("article", "empty-state");
  empty.append(
    createElement("strong", "", message),
    createElement("p", "", detail)
  );

  if (action) {
    const button = createElement("button", "button primary", action.label);
    button.type = "button";
    button.dataset.action = action.type;
    empty.append(button);
  }

  matchList.replaceChildren(empty);
}

function matchIdentityKey(person = {}) {
  const role = person.role || "profile";
  const email = normalizeText(person.email || person.contactEmail || "");
  if (email) return `${role}:email:${email}`;

  const id = String(person.id || "").trim().toLowerCase();
  if (id) return `${role}:id:${id}`;

  return [
    role,
    "profile",
    normalizeText(person.name),
    normalizeText(person.city),
    normalizeText(person.goal),
    normalizeText(person.sport)
  ].join(":");
}

function matchFreshness(person = {}) {
  return new Date(person.updatedAt || person.createdAt || 0).getTime() || 0;
}

function shouldReplaceMatch(current, candidate) {
  if ((candidate.score || 0) !== (current.score || 0)) return (candidate.score || 0) > (current.score || 0);

  const candidateQuality = profileQualityFor(candidate);
  const currentQuality = profileQualityFor(current);
  if (candidateQuality !== currentQuality) return candidateQuality > currentQuality;

  const candidateRating = ratingSummaryFor(candidate);
  const currentRating = ratingSummaryFor(current);
  if ((candidateRating.average || 0) !== (currentRating.average || 0)) return (candidateRating.average || 0) > (currentRating.average || 0);
  if ((candidateRating.count || 0) !== (currentRating.count || 0)) return (candidateRating.count || 0) > (currentRating.count || 0);

  return matchFreshness(candidate) >= matchFreshness(current);
}

function uniqueMatchProfiles(matches = []) {
  const uniqueMatches = new Map();

  matches.forEach((person) => {
    const key = matchIdentityKey(person);
    const current = uniqueMatches.get(key);
    if (!current || shouldReplaceMatch(current, person)) uniqueMatches.set(key, person);
  });

  return Array.from(uniqueMatches.values());
}

function sortedMatches() {
  return uniqueMatchProfiles(
    activeDirectory().map((person) => ({
      ...person,
      score: calculateScore(person)
    }))
  )
    .sort((a, b) => {
      if (sortInput.value === "price") return (a.price || 99999) - (b.price || 99999);
      if (sortInput.value === "recent") return new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt);
      const scoreDiff = b.score - a.score;
      if (scoreDiff !== 0) return scoreDiff;
      return matchTieBreakScore(b) - matchTieBreakScore(a);
    });
}

function renderMatches() {
  const copy = currentCopy();
  matchList.replaceChildren();

  const allMatches = sortedMatches();
  if (matchesContextScore) matchesContextScore.textContent = allMatches.length ? `${allMatches[0].score}%` : "--";
  const visibleMatches = allMatches.filter((person) => !isMatchHidden(person.id));
  const matches = visibleMatches.slice(0, MAX_VISIBLE_MATCHES);

  if (!allMatches.length) {
    const targetRole = oppositeRole(profile.role);
    const targetLabel = targetRole === "professional" ? "profesionales" : "clientes";
    const accountLabel = targetRole === "professional" ? "profesional" : "cliente";
    resultsSummary.textContent = `Aún no hay ${targetLabel} disponibles.`;
    renderEmptyState(
      `Aún no hay ${targetLabel} compatibles`,
      `Cuando haya una cuenta ${accountLabel} activa con datos suficientes, aparecerá aquí con sus razones de afinidad.`,
      { type: "edit-profile", label: "Revisar mi perfil" }
    );
    return;
  }

  if (!visibleMatches.length) {
    resultsSummary.textContent = "Has eliminado todos los matches visibles de esta lista.";
    renderEmptyState(
      "Lista de matches despejada",
      "Puedes recuperar los perfiles ocultos si quieres volver a revisar todos los cruces disponibles.",
      { type: "restore-hidden-matches", label: "Recuperar matches" }
    );
    return;
  }

  const hiddenCount = allMatches.length - visibleMatches.length;
  const highMatches = matches.filter((person) => person.score >= 85).length;
  const targetLabel = profile.role === "client" ? "profesionales" : "clientes";
  const hiddenText = hiddenCount ? ` · ${hiddenCount} oculto${hiddenCount === 1 ? "" : "s"}` : "";
  resultsSummary.textContent = `Mostrando los ${matches.length} mejores de ${visibleMatches.length} ${targetLabel} disponibles · ${highMatches} con afinidad alta${hiddenText}.`;

  matches.forEach((person) => {
    const level = scoreLevel(person.score);
    const card = createElement("article", `match-card ${level.className}`);
    const top = createElement("div", "match-top");
    const avatar = createElement("div", "avatar");
    const heading = createElement("div");
    const score = createElement("span", `score ${level.className}`, `${person.score}%`);
    const scoreText = createElement("span", "score-label", level.label);
    const meta = createElement("div", "meta");
    const reasonsBlock = createElement("div", "reasons-block");
    const reasons = createElement("ul", "match-reasons");
    const stats = createElement("div", "stats");
    const actions = createElement("div", "match-actions");
    const button = createElement("button", "button primary", "Ver perfil completo");
    const hideButton = createElement("button", "button quiet match-hide-button", "Eliminar de la lista");

    setAvatarContent(avatar, person);
    score.setAttribute("aria-label", `${person.score}% · ${level.label}`);
    heading.append(
      createElement("h3", "", person.name),
      createElement("p", "", profileTitle(person))
    );
    heading.append(createRatingBadge(person));
    const proBadge = createProBadge(person);
    if (proBadge) heading.append(proBadge);
    top.append(avatar, heading, score);

    if (person.sport) meta.append(createElement("span", "pill sport-pill", person.sport));
    renderPills(meta, person.services || [], "services");
    renderPills(meta, person.modes || [], "modes");
    renderReasons(reasons, getMatchReasons(person));
    reasonsBlock.append(createElement("span", "micro-label", "Por qué encaja"), reasons);

    stats.append(
      buildStat(person.role === "client" ? "Presupuesto" : "Precio", priceText(person)),
      buildStat("Ciudad", person.city || "Online"),
      buildStat("Deporte", person.sport || "Por definir"),
      buildStat("Disponible", person.availability || "Por definir")
    );

    button.type = "button";
    button.dataset.request = person.id;
    button.setAttribute("aria-label", `Ver perfil completo de ${person.name}`);
    hideButton.type = "button";
    hideButton.dataset.hideMatch = person.id;
    hideButton.setAttribute("aria-label", `Eliminar ${person.name} de esta lista de matches`);
    actions.append(button, hideButton);
    card.dataset.request = person.id;

    card.append(top, scoreText, createElement("p", "", person.bio || "Sin descripción todavía."), reasonsBlock, meta, stats, actions);
    matchList.append(card);
  });
}
function refreshMatches({ simulateLoading = false } = {}) {
  window.clearTimeout(renderTimer);

  if (!simulateLoading) {
    renderMatches();
    return;
  }

  showLoadingState();
  renderTimer = window.setTimeout(renderMatches, 280);
}

function resetRequestBox() {
  const copy = currentCopy();
  requestBox.className = "request-box";
  requestBox.replaceChildren(
    createElement("strong", "", profile.role === "client" ? "Aún no hay contacto preparado" : "Aún no hay propuesta preparada"),
    createElement("p", "", profile.role === "client"
      ? "Elige un profesional compatible y pulsa “Solicitar servicio” para preparar el contacto."
      : "Elige un cliente compatible y pulsa “Proponer plan” para preparar el contacto.")
  );
  requestsTitle.textContent = "Conversaciones y próximos pasos";
  requestsCopy.textContent = "Aquí puedes leer mensajes, responder, avanzar al contacto y valorar experiencias reales.";
}

function updateRole(role, { persistCurrent = true, simulateLoading = true } = {}) {
  if (persistCurrent) {
    readForm();
    saveDraft();
  }

  loadRoleProfile(role);
  setRoleButtonState();
  updateRoleCopy();
  resetRequestBox();
  renderRequestHistory();
  updateProfileStatus();
  refreshMatches({ simulateLoading });
}


function resetProfileState(role = profile.role) {
  Object.keys(profile).forEach((key) => delete profile[key]);
  Object.assign(profile, createBlankProfile(role));
  dataProvider.clearProfileDraft();
  setFormFromProfile();
  clearSignupCredentials();
  resetRequestBox();
  renderRequestHistory();
  updateRoleCopy();
  updateProfileStatus();
  refreshMatches({ simulateLoading: false });
}

function startCleanProfile() {
  const activeRole = profile.role;
  Object.keys(profile).forEach((key) => delete profile[key]);
  Object.assign(profile, createBlankProfile(activeRole));
  dataProvider.clearProfileDraft(activeRole);
  setFormFromProfile();
  resetRequestBox();
  renderRequestHistory();
  updateProfileStatus();
  refreshMatches({ simulateLoading: true });
  document.querySelector("#nameInput").focus();
}

async function saveCurrentProfile() {
  readForm();

  if (!profile.name.trim()) {
    roleHelp.querySelector("strong").textContent = "Falta el nombre";
    roleHelp.querySelector("span").textContent = "El nombre es el único dato visible imprescindible para guardar el perfil.";
    return false;
  }

  if (!validateProfileData({ requireEmail: !isRemoteMode() })) return false;

  if (isRemoteMode()) {
    const registeredRoute = accountRoute();
    if (registeredRoute && registeredRoute !== profile.role) {
      roleHelp.querySelector("strong").textContent = "Ruta bloqueada";
      roleHelp.querySelector("span").textContent = `Esta cuenta ya está registrada como ${roleLabel(registeredRoute).toLowerCase()}. Usa otro email para crear una cuenta ${roleLabel(profile.role).toLowerCase()}.`;
      updateAuthPanel("Esta cuenta no puede guardar perfiles de otra ruta.");
      return false;
    }

    const ownProfile = dataProvider.listProfiles().find((item) => item.id === currentUser()?.id);
    if (ownProfile && ownProfile.role !== profile.role) {
      roleHelp.querySelector("strong").textContent = "Ruta bloqueada";
      roleHelp.querySelector("span").textContent = `Esta cuenta ya está registrada como ${roleLabel(ownProfile.role).toLowerCase()}. Usa otro email para crear una cuenta ${roleLabel(profile.role).toLowerCase()}.`;
      updateAuthPanel("Esta cuenta no puede guardar perfiles de otra ruta.");
      return false;
    }
  }

  if (!(await ensureAccountBeforeSaving())) return false;

  let saved;
  try {
    saved = await dataProvider.saveProfile(profile);
  } catch (error) {
    roleHelp.querySelector("strong").textContent = "No se pudo guardar";
    roleHelp.querySelector("span").textContent = error.message || "Revisa la sesión y vuelve a intentarlo.";
    updateAuthPanel(error.message || "Supabase no pudo guardar el perfil.");
    return false;
  }

  Object.keys(profile).forEach((key) => delete profile[key]);
  Object.assign(profile, saved);
  setFormFromProfile();
  clearSignupCredentials();
  updateRoleCopy();
  updateAuthPanel(isRemoteMode() ? "Perfil guardado en Supabase." : "Perfil guardado en modo local.");
  updateProfileStatus();
  renderRequestHistory();
  return true;
}

function getFocusableModalElements() {
  return Array.from(
    modal.querySelectorAll(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  );
}


function buildProfileReportBox(person) {
  const user = currentUser();
  if (!user || !person?.id || person.id === user.id) return null;
  const box = createElement("details", "profile-report-box");
  const summary = createElement("summary", "", "Informar de un problema con este perfil");
  const form = createElement("div", "profile-report-form");
  const labelNode = createElement("label", "", "Motivo");
  const select = createElement("select");
  select.dataset.reportReason = person.id;
  ADMIN_REPORT_REASONS.forEach(([value, labelText]) => {
    const option = createElement("option", "", labelText);
    option.value = value;
    select.append(option);
  });
  labelNode.append(select);
  const textareaLabel = createElement("label", "", "Descripción opcional");
  const textarea = createElement("textarea");
  textarea.dataset.reportDescription = person.id;
  textarea.placeholder = "Añade contexto para que podamos revisarlo mejor.";
  textareaLabel.append(textarea);
  const submit = createElement("button", "button primary compact", "Enviar denuncia");
  submit.type = "button";
  submit.dataset.submitReport = person.id;
  const feedback = createElement("p", "report-feedback");
  feedback.dataset.reportFeedback = person.id;
  form.append(labelNode, textareaLabel, submit, feedback);
  box.append(summary, form);
  return box;
}

async function handleSubmitProfileReport(event) {
  const button = event.target.closest("[data-submit-report]");
  if (!button) return;
  const targetId = button.dataset.submitReport;
  const target = findProfileForRatings(targetId) || selectedMatch;
  if (!target || target.id !== targetId || !currentUser()) return;
  const box = button.closest(".profile-report-box");
  const reason = box?.querySelector(`[data-report-reason="${targetId}"]`)?.value || "otro";
  const description = box?.querySelector(`[data-report-description="${targetId}"]`)?.value || "";
  const feedback = box?.querySelector(`[data-report-feedback="${targetId}"]`);
  button.disabled = true;
  button.textContent = "Enviando...";
  try {
    const reporter = dataProvider.listProfiles().find((item) => item.id === currentUser()?.id) || { id: currentUser()?.id, email: currentUser()?.email, name: currentUser()?.email };
    await dataProvider.createReport?.({ reporter, target, reason, description });
    if (feedback) feedback.textContent = "Denuncia enviada. La revisaremos de forma manual.";
    button.textContent = "Enviada";
    renderAdminDashboard();
  } catch (error) {
    if (feedback) feedback.textContent = "No se pudo enviar ahora. Inténtalo de nuevo.";
    button.disabled = false;
    button.textContent = "Enviar denuncia";
  }
}

async function handleAdminReportSave(event) {
  const button = event.target.closest("[data-admin-report-save]");
  if (!button) return;
  const reportId = button.dataset.adminReportSave;
  const card = button.closest("[data-report-id]");
  const status = card?.querySelector(`[data-admin-report-status="${reportId}"]`)?.value || "pendiente";
  const priority = card?.querySelector(`[data-admin-report-priority="${reportId}"]`)?.value || "media";
  const internalNotes = card?.querySelector(`[data-admin-report-notes="${reportId}"]`)?.value || "";
  button.disabled = true;
  const previousText = button.textContent;
  button.textContent = "Guardando...";
  try {
    await dataProvider.updateReport?.(reportId, { status, priority, internalNotes });
    await dataProvider.refreshRemoteData?.();
    renderAdminDashboard();
  } finally {
    button.disabled = false;
    button.textContent = previousText;
  }
}

function renderProfileDetail(person) {
  if (!profileDetail) return;
  const matchScore = calculateScore(person);
  const reasons = createElement("ul", "match-reasons profile-detail-reasons");
  renderReasons(reasons, getMatchReasons(person));

  const identity = createElement("div", "profile-detail-section profile-detail-identity");
  const detailHero = createElement("div", "profile-detail-hero");
  const detailAvatar = createElement("div", "avatar profile-detail-avatar");
  const detailCopy = createElement("div");
  setAvatarContent(detailAvatar, person);
  detailCopy.append(
    createElement("span", "micro-label", person.role === "client" ? "Perfil cliente" : "Perfil profesional"),
    createElement("strong", "", profileTitle(person)),
    createElement("p", "", person.bio || "Este perfil aún no tiene una descripción amplia.")
  );
  detailHero.append(detailAvatar, detailCopy);

  const tags = createElement("div", "meta profile-detail-tags");
  const tagTexts = [
    roleLabel(person.role),
    label("goals", person.goal),
    person.sport,
    label("modes", person.mode),
    label("levels", person.level),
    ...(person.services || []).map((service) => label("services", service))
  ].filter(Boolean);
  [...new Set(tagTexts)].forEach((tagText) => tags.append(createElement("span", "pill", tagText)));
  identity.append(detailHero, tags);

  const detailStats = createElement("div", "stats profile-detail-stats");
  detailStats.append(
    buildStat(person.role === "client" ? "Presupuesto" : "Precio", priceText(person)),
    buildStat("Ciudad", person.city || "Online"),
    buildStat("Disponibilidad", person.availability || "Por definir")
  );

  const level = scoreLevel(matchScore);
  const affinity = createElement("div", "profile-detail-section profile-detail-affinity profile-detail-affinity-compact");
  const affinityHeader = createElement("div", "profile-affinity-header");
  affinityHeader.append(
    createElement("span", "micro-label", "Por qué encaja"),
    createElement("strong", "profile-affinity-score", `${matchScore}% · ${level.label}`)
  );
  affinity.append(affinityHeader, reasons);

  const ratingBreakdown = createRatingBreakdownSection(person);
  const publicComments = createPublicCommentsSection(person);
  const reportBox = buildProfileReportBox(person);

  profileDetail.hidden = false;
  profileDetail.replaceChildren(...[identity, detailStats, affinity, ratingBreakdown, publicComments, reportBox].filter(Boolean));
}

function findProfileForRatings(profileId) {
  if (!profileId) return null;
  if (selectedMatch?.id === profileId) return selectedMatch;
  return [
    ...dataProvider.listProfiles("client"),
    ...dataProvider.listProfiles("professional")
  ].find((item) => item.id === profileId) || null;
}

function createPublicCommentsSection(person) {
  const section = createElement("section", "ratings-comments-section");
  const comments = publicRatingCommentsFor(person).slice(0, 4);
  const heading = createElement("div", "ratings-comments-heading");
  heading.append(
    createElement("span", "micro-label", "Comentarios públicos"),
    createElement("strong", "", comments.length ? "Opiniones reales" : "Sin comentarios públicos")
  );
  section.append(heading);

  if (!comments.length) {
    const empty = createElement("article", "ratings-comment-empty");
    empty.append(
      createElement("strong", "", "Todavía sin comentarios")
    );
    section.append(empty);
    return section;
  }

  const list = createElement("div", "ratings-comment-list");
  comments.forEach((rating) => {
    const item = createElement("article", "ratings-comment-card");
    item.append(
      createElement("span", "rating-comment-score", `${rating.averageScore}/5`),
      createElement("p", "", `“${rating.publicComment}”`),
      createElement("small", "", ratingConfig(rating.ratingType || rating.criteria?._ratingType).label)
    );
    list.append(item);
  });
  section.append(list);
  return section;
}

function openRequestModal(matchId, opener) {
  selectedMatch = activeDirectory().find((person) => person.id === matchId);
  if (!selectedMatch) return;

  modalOpener = opener;
  const copy = currentCopy();
  modalTitle.textContent = selectedMatch.name;
  modalText.textContent = `${calculateScore(selectedMatch)}% de afinidad. Mira lo esencial y decide.`;
  renderProfileDetail(selectedMatch);
  messageInput.value = profile.role === "client"
    ? "Hola, he revisado tu perfil y me interesa saber disponibilidad, enfoque y cómo sería el primer plan."
    : "Hola, he revisado tu perfil y creo que puedo ayudarte. Me gustaría proponerte una primera valoración.";
  sendRequestButton.textContent = copy.sendAction;
  modal.classList.remove("hidden");
  modal.scrollTop = 0;
  modal.querySelector(".modal-card")?.scrollTo({ top: 0, left: 0 });
  modal.focus();
}

function closeModal() {
  modal.classList.add("hidden");
  if (profileDetail) profileDetail.hidden = true;
  if (modalOpener) {
    modalOpener.focus();
    modalOpener = null;
  }
}

function currentProfileContactPayload() {
  return {
    id: profile.id,
    role: profile.role,
    name: profile.name,
    title: profileTitle(profile),
    email: profile.email,
    contactEmail: profile.email,
    phone: profile.phone,
    photo: profile.photo,
    city: profile.city,
    goal: profile.goal,
    sport: profile.sport,
    mode: profile.mode,
    level: profile.level,
    services: [...profile.services],
    availability: profile.availability,
    bio: profile.bio,
    notes: profile.notes
  };
}

async function sendRequest() {
  if (!selectedMatch) return;

  const copy = currentCopy();
  const score = calculateScore(selectedMatch);
  const message = messageInput.value.trim() || "Mensaje inicial pendiente de completar.";
  let request;
  sendRequestButton.disabled = true;
  sendRequestButton.textContent = "Enviando...";
  try {
    request = await dataProvider.createContactRequest({
      role: profile.role,
      profile: currentProfileContactPayload(),
      target: {
        id: selectedMatch.id,
        role: selectedMatch.role,
        name: selectedMatch.name,
        title: profileTitle(selectedMatch),
        city: selectedMatch.city,
        goal: selectedMatch.goal,
        mode: selectedMatch.mode,
        level: selectedMatch.level,
        services: selectedMatch.services || [],
        sport: selectedMatch.sport || "",
        photo: selectedMatch.photo || "",
        availability: selectedMatch.availability || "",
        bio: selectedMatch.bio || "",
        notes: selectedMatch.notes || ""
      },
      score,
      message,
      reasons: getMatchReasons(selectedMatch)
    });
  } catch (error) {
    modalText.textContent = error.message || "No se pudo crear la solicitud. Revisa la sesión y vuelve a intentarlo.";
    sendRequestButton.disabled = false;
    sendRequestButton.textContent = copy.sendAction;
    return;
  }
  sendRequestButton.disabled = false;
  sendRequestButton.textContent = copy.sendAction;
  const title = `${copy.sentPrefix} ${request.target.name}`;
  const nextSteps = createElement("ol", "next-steps");

  nextSteps.append(
    createElement("li", "", `La ${profile.role === "client" ? "solicitud" : "propuesta"} queda en la bandeja de entrada de ${request.target.name}.`),
    createElement("li", "", copy.sentNext),
    createElement("li", "", isRemoteMode() ? "Queda guardado en Supabase; al entrar con la otra cuenta podrá leerlo en Contactos." : "Esta prueba local aún no envía emails ni mensajes externos.")
  );

  requestBox.className = "request-box request-success";
  requestBox.replaceChildren(
    createElement("span", "success-kicker", profile.role === "client" ? "Solicitud enviada" : "Propuesta enviada"),
    createElement("strong", "", title),
    createElement("p", "", request.message),
    createElement("span", "pill", `${request.score}% de afinidad`),
    createElement("span", "pill", label("goals", profile.goal)),
    createElement("span", "pill", label("modes", profile.mode)),
    nextSteps
  );

  renderRequestHistory();
  closeModal();
  showView("contacts");
}

function formatDate(isoDate) {
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(isoDate));
}

function safeContactPhone(phone) {
  return String(phone || "").replace(/[^+0-9]/g, "");
}

function buildContactLink(type, value, request) {
  const labels = {
    email: "Enviar email",
    sms: "Enviar SMS",
    phone: "Llamar"
  };
  const link = createElement("a", `button secondary contact-button contact-button-${type}`, labels[type] || "Contactar");
  const encodedBody = encodeURIComponent(`Hola ${request.sender.name}, he recibido tu mensaje en Fit Match y me gustaría responderte.`);

  if (type === "email") {
    const subject = encodeURIComponent(`Respuesta desde Fit Match para ${request.sender.name}`);
    link.href = `mailto:${value}?subject=${subject}&body=${encodedBody}`;
  } else if (type === "sms") {
    link.href = `sms:${safeContactPhone(value)}?body=${encodedBody}`;
  } else {
    link.href = `tel:${safeContactPhone(value)}`;
  }

  link.setAttribute("aria-label", `${labels[type] || "Contactar"} con ${request.sender.name}`);
  return link;
}

function buildContactMethod(title, value, availableText, unavailableText, children = []) {
  const method = createElement("div", `contact-method ${value ? "contact-method-active" : "contact-method-missing"}`);
  method.append(
    createElement("span", "micro-label", title),
    createElement("p", "", value ? availableText : unavailableText)
  );
  children.forEach((child) => method.append(child));
  return method;
}

function buildContactActions(request) {
  const actions = createElement("div", "contact-actions");
  const contactEmail = request.sender.contactEmail || request.sender.email || "";
  const contactPhone = request.sender.phone || "";
  const cleanPhone = safeContactPhone(contactPhone);

  actions.append(
    createElement("strong", "", "Contacto directo"),
    createElement("p", "", "Usa estas vías si quieres salir del mensaje interno y contactar directamente.")
  );

  const emailButtons = contactEmail ? createElement("div", "contact-buttons") : null;
  if (emailButtons) emailButtons.append(buildContactLink("email", contactEmail, request));

  const phoneButtons = cleanPhone ? createElement("div", "contact-buttons") : null;
  if (phoneButtons) {
    phoneButtons.append(
      buildContactLink("sms", contactPhone, request),
      buildContactLink("phone", contactPhone, request)
    );
  }

  actions.append(
    buildContactMethod(
      "Email",
      contactEmail,
      contactEmail,
      "Email no disponible en esta solicitud.",
      emailButtons ? [emailButtons] : []
    ),
    buildContactMethod(
      "Teléfono",
      cleanPhone,
      contactPhone,
      "Teléfono no disponible en esta solicitud. Para verlo aquí, la otra persona debe haberlo rellenado en su registro antes de enviar el mensaje.",
      phoneButtons ? [phoneButtons] : []
    )
  );

  return actions;
}

function buildReplyComposer(request) {
  const composer = createElement("div", "reply-composer");
  const labelElement = createElement("label", "reply-field");
  const labelText = createElement("span", "", "Respuesta rápida dentro de Fit Match");
  const textarea = document.createElement("textarea");
  const button = createElement("button", "button primary reply-button", "Enviar respuesta");

  textarea.rows = 3;
  textarea.dataset.replyMessage = request.id;
  textarea.placeholder = `Escribe una respuesta para ${request.sender.name}`;
  textarea.value = `Hola ${request.sender.name}, he recibido tu mensaje en Fit Match y me gustaría seguir hablando.`;

  button.type = "button";
  button.dataset.replyRequest = request.id;
  button.setAttribute("aria-label", `Enviar respuesta a ${request.sender.name}`);

  labelElement.append(labelText, textarea);
  composer.append(labelElement, button);
  return composer;
}

function requestCardTitle(request, direction) {
  if (direction === "incoming") {
    return request.senderRole === "client"
      ? `Solicitud de ${request.sender.name}`
      : `Propuesta de ${request.sender.name}`;
  }

  return profile.role === "client"
    ? `Solicitud a ${request.recipient.name}`
    : `Propuesta a ${request.recipient.name}`;
}

function requestStatusText(request, direction) {
  if (direction === "incoming") return request.readAt ? "Leído" : "Nuevo";
  return request.readAt ? "Leído" : "Pendiente";
}

async function markIncomingRequestAsRead(requestId) {
  const request = dataProvider.listContactRequests(profile.role, { profileId: profile.id, direction: "incoming" })
    .find((item) => item.id === requestId);
  if (!request || request.readAt) return;

  try {
    await dataProvider.markContactRequestRead?.(requestId);
    const updatedIncoming = dataProvider.listContactRequests(profile.role, { profileId: profile.id, direction: "incoming" });
    const unreadRequests = updatedIncoming.filter((item) => !item.readAt).length;
    historyTitle.textContent = unreadRequests ? `Bandeja · ${unreadRequests} nuevo${unreadRequests === 1 ? "" : "s"}` : "Bandeja de contactos";

    const card = Array.from(requestList?.querySelectorAll("[data-request-id]") || [])
      .find((item) => item.dataset.requestId === requestId);
    if (card) {
      card.classList.remove("unread-card");
      card.classList.add("read-card");
      const badge = card.querySelector(".status-badge");
      if (badge) {
        badge.textContent = "Leído";
        badge.classList.remove("status-unread");
        badge.classList.add("status-read");
      }
    }

    const conversation = card?.closest(".conversation-card");
    if (conversation) {
      const groupKey = conversation.dataset.conversationId;
      const group = groupRequestsByConversation(updatedIncoming, "incoming").find((item) => item.key === groupKey);
      const badge = conversation.querySelector(":scope > .conversation-summary .status-badge");
      if (badge && group) {
        badge.textContent = group.unreadCount ? `${group.unreadCount} nuevo${group.unreadCount === 1 ? "" : "s"}` : "Leído";
        badge.classList.toggle("status-unread", Boolean(group.unreadCount));
        badge.classList.toggle("status-read", !group.unreadCount);
      }
    }
  } catch (error) {
    // Si la política remota no permite marcar leído todavía, mantenemos la bandeja abierta y estable.
  }
}


function ratingTargetForRequest(request, direction) {
  return direction === "incoming" ? request.sender : request.recipient;
}

function currentViewerId() {
  return profile.id || currentUser()?.id || "local";
}

function requestMarkerIncludes(request, key) {
  const users = Array.isArray(request?.[key]) ? request[key] : [];
  return users.includes(currentViewerId());
}

function requestContactStarted(request) {
  return requestMarkerIncludes(request, "contactStartedBy");
}

function requestServiceCompleted(request) {
  return requestMarkerIncludes(request, "serviceCompletedBy");
}

function requestRatingFor(request, direction, ratingType = "service") {
  const target = ratingTargetForRequest(request, direction);
  const type = normalizeRatingType(ratingType);
  const targetIds = relatedProfileIdsForPerson(target);
  for (const targetId of targetIds) {
    const rating = dataProvider.getRatingForRequest?.(request.id, currentViewerId(), targetId, type);
    if (rating) return rating;
  }
  return null;
}

function requestCanBeRated(request, direction, ratingType = "service") {
  const type = normalizeRatingType(ratingType);
  if (type === "first_contact") return requestContactStarted(request);
  return requestServiceCompleted(request);
}

function ratingStateForRequest(request, direction, ratingType = "service") {
  const target = ratingTargetForRequest(request, direction);
  const type = normalizeRatingType(ratingType);
  const config = ratingConfig(type);
  const existing = requestRatingFor(request, direction, type);
  const canRate = requestCanBeRated(request, direction, type);

  if (existing) {
    return {
      className: "rating-step-done",
      title: config.savedLabel,
      text: `Ya has puntuado ${config.label.toLowerCase()} con ${target.name}. La media se suma a su perfil público.`
    };
  }

  if (canRate) {
    return {
      className: "rating-step-active",
      title: config.availableLabel,
      text: type === "first_contact"
        ? "Valora solo la primera conversación: claridad, respeto, respuesta e impresión inicial."
        : "Valora únicamente si ya hubo sesión, servicio o trabajo real. Así la reputación gana sentido."
    };
  }

  return {
    className: "rating-step-waiting",
    title: type === "first_contact" ? "Primer contacto pendiente" : "Servicio real pendiente",
    text: type === "first_contact"
      ? "Confirma primero que ya hubo una conversación real fuera del simple envío de solicitud."
      : "Esta valoración se activará cuando confirmes que ya hubo servicio real o trabajo conjunto."
  };
}

function buildContactStagePanel(request, direction) {
  const contactDone = requestContactStarted(request);
  const serviceDone = requestServiceCompleted(request);
  const firstState = ratingStateForRequest(request, direction, "first_contact");
  const serviceState = ratingStateForRequest(request, direction, "service");
  const panel = createElement("div", `contact-stage ${serviceDone ? serviceState.className : firstState.className}`);
  const contactLabel = direction === "incoming" ? "Solicitud recibida" : "Solicitud enviada";
  const openLabel = request.readAt ? "Mensaje leído" : (direction === "incoming" ? "Mensaje abierto" : "Pendiente de lectura");

  const steps = createElement("div", "contact-stage-steps");
  [
    { text: contactLabel, done: true },
    { text: openLabel, done: Boolean(request.readAt) || direction === "incoming" },
    { text: "Primer contacto", done: contactDone },
    { text: "Servicio real", done: serviceDone }
  ].forEach((stepInfo) => {
    const step = createElement("span", `contact-stage-step ${stepInfo.done ? "contact-stage-step-done" : ""}`, stepInfo.text);
    steps.append(step);
  });

  const actions = createElement("div", "contact-stage-actions");
  if (!contactDone) {
    const button = createElement("button", "button primary contact-stage-action", "Confirmar primer contacto");
    button.type = "button";
    button.dataset.markContactStarted = request.id;
    button.dataset.ratingDirection = direction;
    actions.append(button);
  } else if (!serviceDone) {
    const button = createElement("button", "button primary contact-stage-action", "Confirmar servicio real");
    button.type = "button";
    button.dataset.markServiceCompleted = request.id;
    button.dataset.ratingDirection = direction;
    actions.append(button);
  }

  panel.append(
    createElement("strong", "", serviceDone ? serviceState.title : firstState.title),
    createElement("p", "", serviceDone ? serviceState.text : firstState.text),
    steps
  );
  if (actions.childElementCount) panel.append(actions);
  return panel;
}

function buildRatingLockedPanel(request, direction, ratingType = "service") {
  const target = ratingTargetForRequest(request, direction);
  const type = normalizeRatingType(ratingType);
  const panel = createElement("div", `rating-panel rating-panel-locked rating-panel-${type}`);
  const heading = createElement("div", "rating-heading");
  heading.append(
    createElement("strong", "", type === "first_contact" ? "Primer contacto sin confirmar" : "Servicio real sin confirmar"),
    createElement("p", "", type === "first_contact"
      ? `Primero confirma que ya hubo una conversación real con ${target.name}. No valoramos solo por recibir o enviar un mensaje.`
      : `Esta parte se activa cuando confirmes que ya hubo una sesión, servicio o trabajo real con ${target.name}.`)
  );
  panel.append(heading);
  return panel;
}

function buildRatingPanel(request, direction, ratingType = "service") {
  const type = normalizeRatingType(ratingType);
  if (!requestCanBeRated(request, direction, type)) return buildRatingLockedPanel(request, direction, type);

  const target = ratingTargetForRequest(request, direction);
  const existing = requestRatingFor(request, direction, type);
  const targetRole = target.role || oppositeRole(profile.role);
  const criteria = ratingCriteriaForRole(targetRole, type);
  const config = ratingConfig(type);
  const panel = createElement("div", `rating-panel rating-panel-actionable rating-panel-${type}`);
  panel.dataset.ratingType = type;
  panel.dataset.ratingRequest = request.id;
  const heading = createElement("div", "rating-heading");
  const title = createElement("strong", "", existing ? config.savedLabel : config.actionLabel);
  const copy = createElement("p", "", existing
    ? `Tu puntuación para ${target.name}: ${existing.averageScore}/5. Puedes actualizarla si la experiencia cambia.`
    : `${config.publicHint} Puedes añadir un comentario público y, si quieres, una nota privada para ti.`);
  heading.append(title, copy);
  panel.append(heading);

  criteria.forEach(([key, text]) => {
    const value = Number(existing?.criteria?.[key]) || 0;
    const row = createElement("div", "rating-row");
    row.dataset.ratingField = key;
    row.dataset.ratingValue = String(value || "");
    row.append(createElement("span", "", text));
    const stars = createElement("div", "rating-stars");
    for (let star = 1; star <= 5; star += 1) {
      const button = createElement("button", star <= value ? "rating-star active" : "rating-star", "★");
      button.type = "button";
      button.dataset.ratingStar = String(star);
      button.setAttribute("aria-label", `${star} de 5 en ${text}`);
      button.setAttribute("aria-pressed", String(star <= value));
      stars.append(button);
    }
    row.append(stars);
    panel.append(row);
  });

  const publicLabel = createElement("label", "rating-textarea-field");
  const publicComment = document.createElement("textarea");
  publicComment.className = "rating-comment rating-public-comment";
  publicComment.rows = 2;
  publicComment.placeholder = `Comentario público opcional. ${config.commentPlaceholder}`;
  publicComment.setAttribute("aria-label", `Comentario público sobre ${target.name}`);
  publicComment.value = existing?.publicComment || existing?.criteria?._publicComment || "";
  publicComment.dataset.ratingPublicComment = request.id;
  publicLabel.append(
    createElement("span", "", "Comentario público opcional"),
    publicComment,
    createElement("small", "", "Podrá aparecer en el perfil para ayudar a otras personas. No incluyas datos sensibles.")
  );

  const privateLabel = createElement("label", "rating-textarea-field rating-private-field");
  const comment = document.createElement("textarea");
  comment.className = "rating-comment rating-private-comment";
  comment.rows = 2;
  comment.placeholder = "Nota privada opcional para recordar esta valoración.";
  comment.setAttribute("aria-label", `Nota privada sobre ${target.name}`);
  comment.value = existing?.comment || "";
  comment.dataset.ratingComment = request.id;
  privateLabel.append(
    createElement("span", "", "Nota privada opcional"),
    comment,
    createElement("small", "", "Solo se usa como apunte interno de esta valoración.")
  );

  const actions = createElement("div", "rating-actions");
  const button = createElement("button", "button primary rating-save-button", existing ? "Actualizar valoración" : "Guardar valoración");
  button.type = "button";
  button.dataset.saveRating = request.id;
  button.dataset.ratingDirection = direction;
  button.dataset.ratingTarget = target.id;
  button.dataset.ratingType = type;
  actions.append(button);
  panel.append(publicLabel, privateLabel, actions);
  return panel;
}

function setRatingRowValue(row, value) {
  row.dataset.ratingValue = String(value);
  row.querySelectorAll("[data-rating-star]").forEach((starButton) => {
    const active = Number(starButton.dataset.ratingStar) <= value;
    starButton.classList.toggle("active", active);
    starButton.setAttribute("aria-pressed", String(active));
  });
}

async function saveRequestRating(requestId, direction, button) {
  const requests = dataProvider.listContactRequests(profile.role, { profileId: profile.id, direction });
  const request = requests.find((item) => item.id === requestId);
  if (!request) return;
  const target = resolveConversationPerson(ratingTargetForRequest(request, direction));
  const panel = button.closest(".rating-panel");
  const inferredRatingType = panel?.dataset.ratingType
    || (panel?.classList.contains("rating-panel-first_contact") ? "first_contact" : "service");
  const ratingType = normalizeRatingType(button.dataset.ratingType || inferredRatingType);
  if (panel) panel.dataset.ratingType = ratingType;
  button.dataset.ratingType = ratingType;
  const criteria = {};
  let completed = true;

  panel.querySelectorAll("[data-rating-field]").forEach((row) => {
    const value = Number(row.dataset.ratingValue || 0);
    if (!value) completed = false;
    criteria[row.dataset.ratingField] = value;
  });

  if (!completed) {
    panel.classList.add("rating-panel-warning");
    panel.querySelector(".rating-heading p").textContent = "Completa las cinco puntuaciones para guardar la valoración.";
    return;
  }

  const originalButtonText = button.textContent;
  button.disabled = true;
  button.textContent = "Guardando...";
  try {
    await dataProvider.saveRating?.({
      requestId,
      raterId: profile.id || currentUser()?.id || "local",
      raterRole: profile.role,
      target,
      targetRole: target.role || oppositeRole(profile.role),
      ratingType,
      criteria,
      publicComment: panel.querySelector("[data-rating-public-comment]")?.value.trim() || "",
      comment: panel.querySelector("[data-rating-comment]")?.value.trim() || ""
    });
    await dataProvider.refreshRemoteData?.();
    const savedFeedback = ratingSavedFeedback(target, ratingType);
    const feedbackKey = `${direction}:${requestId}`;
    recentRatingFeedback.set(feedbackKey, {
      ratingType,
      targetName: target.name,
      ...savedFeedback
    });
    openRatingIds.add(feedbackKey);
    renderRequestHistory();
    refreshMatches();
    updateProfileStatus();
    renderProfileHome();
  } catch (error) {
    panel.classList.add("rating-panel-warning");
    const errorText = error.message || "No se pudo guardar la valoración.";
    panel.querySelector(".rating-heading p").textContent = errorText;
  } finally {
    button.disabled = false;
    button.textContent = originalButtonText;
  }
}

function buildRequestCard(request, direction) {
  const card = document.createElement("details");
  card.className = `history-card ${direction === "incoming" ? "incoming-card" : "outgoing-card"} ${request.readAt ? "read-card" : "unread-card"}`;
  card.dataset.requestId = request.id;
  card.dataset.direction = direction;

  const summary = document.createElement("summary");
  summary.className = "history-summary";
  const person = direction === "incoming" ? request.sender : request.recipient;
  const avatar = createElement("div", "avatar message-avatar");
  const summaryText = createElement("div", "history-summary-text");
  const title = createElement("strong", "", requestCardTitle(request, direction));
  const meta = createElement(
    "span",
    "",
    `${request.score}% · ${label("goals", person.goal)} · ${formatDate(request.createdAt)}`
  );
  const badge = createElement("span", `status-badge ${request.readAt ? "status-read" : "status-unread"}`, requestStatusText(request, direction));
  const selector = document.createElement("input");
  selector.type = "checkbox";
  selector.className = "request-select";
  selector.dataset.selectRequest = request.id;
  selector.checked = selectedRequestIds.has(request.id);
  selector.setAttribute("aria-label", `Seleccionar ${requestCardTitle(request, direction)}`);
  selector.addEventListener("click", (event) => event.stopPropagation());

  setAvatarContent(avatar, person);
  summaryText.append(title, meta);
  summary.append(selector, avatar, summaryText, badge);
  card.classList.toggle("selected-card", selector.checked);
  card.append(summary);

  const body = createElement("div", "history-card-body");
  const messageFocus = createElement("section", "contact-message-focus");
  const messageLabel = direction === "incoming" ? "Mensaje recibido" : "Mensaje enviado";
  const messageText = (request.message || "").trim() || "Sin mensaje escrito.";
  messageFocus.append(
    createElement("span", "micro-label", messageLabel),
    createElement("p", "history-message", messageText)
  );
  body.append(messageFocus);

  if (direction === "incoming") {
    body.append(
      buildReplyComposer(request),
      buildContactActions(request)
    );
  } else {
    body.append(createElement(
      "p",
      "history-note",
      request.readAt ? "La otra persona ya abrió este mensaje." : "La otra persona todavía no ha abierto este mensaje."
    ));
  }

  const actions = createElement("div", "history-card-actions");
  const deleteButton = createElement("button", "button quiet danger-button", "Eliminar mensaje");
  deleteButton.type = "button";
  deleteButton.dataset.deleteRequest = request.id;
  deleteButton.setAttribute("aria-label", `Eliminar ${requestCardTitle(request, direction)}`);
  actions.append(deleteButton);
  body.append(actions);

  card.append(body);
  card.open = openRequestIds.has(request.id);
  card.addEventListener("toggle", () => {
    if (card.open) {
      openRequestIds.add(request.id);
      if (direction === "incoming") markIncomingRequestAsRead(request.id);
      return;
    }
    openRequestIds.delete(request.id);
  });
  return card;
}

function findReplyMessage(requestId) {
  return Array.from(requestList.querySelectorAll("[data-reply-message]")).find((item) => item.dataset.replyMessage === requestId);
}

async function sendInboxReply(requestId, button) {
  const incomingRequests = dataProvider.listContactRequests(profile.role, { profileId: profile.id, direction: "incoming" });
  const originalRequest = incomingRequests.find((request) => request.id === requestId);
  const messageInputElement = findReplyMessage(requestId);
  if (!originalRequest || !messageInputElement) return;

  const message = messageInputElement.value.trim();
  if (!message) {
    messageInputElement.focus();
    return;
  }

  button.disabled = true;
  button.textContent = "Enviando...";

  try {
    const reply = await dataProvider.createContactRequest({
      role: profile.role,
      profile: currentProfileContactPayload(),
      target: {
        id: originalRequest.sender.id,
        name: originalRequest.sender.name,
        role: originalRequest.sender.role,
        title: originalRequest.sender.title || originalRequest.sender.name,
        city: originalRequest.sender.city,
        goal: originalRequest.sender.goal,
        mode: originalRequest.sender.mode,
        level: originalRequest.sender.level,
        services: originalRequest.sender.services || [],
        sport: originalRequest.sender.sport || "",
        photo: originalRequest.sender.photo || "",
        availability: originalRequest.sender.availability || "",
        bio: originalRequest.sender.bio || "",
        notes: originalRequest.sender.notes || ""
      },
      score: originalRequest.score,
      message,
      reasons: originalRequest.reasons || []
    });

    requestBox.className = "request-box request-success";
    requestBox.replaceChildren(
      createElement("span", "success-kicker", "Respuesta enviada"),
      createElement("strong", "", `Respuesta para ${reply.target.name}`),
      createElement("p", "", reply.message),
      createElement("span", "pill", "Guardada en Fit Match")
    );
    await dataProvider.refreshRemoteData?.();
    renderRequestHistory();
  } catch (error) {
    requestBox.className = "request-box";
    requestBox.replaceChildren(
      createElement("strong", "", "No se pudo enviar la respuesta"),
      createElement("p", "", error.message || "Revisa la sesión y vuelve a intentarlo.")
    );
  } finally {
    button.disabled = false;
    button.textContent = "Enviar respuesta";
  }
}

function buildRatingCard(request, direction) {
  const target = ratingTargetForRequest(request, direction);
  const firstExisting = requestRatingFor(request, direction, "first_contact");
  const serviceExisting = requestRatingFor(request, direction, "service");
  const firstReady = requestCanBeRated(request, direction, "first_contact") && !firstExisting;
  const serviceReady = requestCanBeRated(request, direction, "service") && !serviceExisting;
  const cardState = firstExisting && serviceExisting ? "rating-contact-done" : (firstReady || serviceReady) ? "rating-contact-ready" : "rating-contact-waiting";
  const card = document.createElement("details");
  card.className = `rating-contact-card rating-contact-collapsible ${cardState}`;

  const summary = document.createElement("summary");
  summary.className = "rating-contact-summary";
  const header = createElement("div", "rating-contact-header");
  const avatar = createElement("div", "avatar message-avatar");
  const headerText = createElement("div", "rating-contact-title");
  const title = createElement("strong", "", target.name || "Contacto Fit Match");
  const meta = createElement("span", "", `${direction === "incoming" ? "Recibido" : "Enviado"} · ${request.score}% de afinidad · ${formatDate(request.createdAt)}`);
  const state = serviceExisting ? ratingStateForRequest(request, direction, "service") : ratingStateForRequest(request, direction, "first_contact");
  const badge = createElement("span", `status-badge ${firstExisting || serviceExisting ? "status-read" : firstReady || serviceReady ? "status-unread" : "status-waiting"}`, state.title);
  const toggle = createElement("span", "button primary rating-card-toggle", "Gestionar valoración");

  setAvatarContent(avatar, target);
  headerText.append(title, meta);
  header.append(avatar, headerText, badge);
  summary.append(header, toggle);

  const body = createElement("div", "rating-contact-body");
  const contactDone = requestContactStarted(request);
  const serviceDone = requestServiceCompleted(request);
  const cardKey = `${direction}:${request.id}`;
  const feedback = recentRatingFeedback.get(cardKey);

  if (feedback) {
    const feedbackBox = createElement("div", "request-box request-success rating-save-feedback");
    feedbackBox.append(
      createElement("span", "success-kicker", "Valoración guardada"),
      createElement("strong", "", `Has valorado ${ratingConfig(feedback.ratingType).label.toLowerCase()} con ${feedback.targetName}`),
      createElement("p", "", feedback.profileText),
      createElement("p", "rating-save-summary", feedback.summaryText),
      createElement("span", "pill", feedback.routeText)
    );
    body.append(feedbackBox);
  }

  body.append(buildContactStagePanel(request, direction));
  if (contactDone) body.append(buildRatingPanel(request, direction, "first_contact"));
  if (serviceDone) body.append(buildRatingPanel(request, direction, "service"));

  card.dataset.ratingCard = cardKey;
  card.open = openRatingIds.has(cardKey);
  card.addEventListener("toggle", () => {
    if (card.open) {
      openRatingIds.add(cardKey);
      return;
    }
    openRatingIds.delete(cardKey);
  });

  card.append(summary, body);
  return card;
}


function ratingItemPriority(item) {
  const { request, direction } = item;
  return [
    requestRatingFor(request, direction, "service") ? 80 : 0,
    requestRatingFor(request, direction, "first_contact") ? 60 : 0,
    requestCanBeRated(request, direction, "service") ? 30 : 0,
    requestCanBeRated(request, direction, "first_contact") ? 20 : 0,
    request.readAt ? 5 : 0,
    new Date(request.updatedAt || request.createdAt || 0).getTime() / 10000000000000
  ].reduce((sum, value) => sum + value, 0);
}

function ratingItemIdentityKeys(item = {}) {
  const target = resolveConversationPerson(ratingTargetForRequest(item.request, item.direction) || {});
  const role = target.role || "profile";
  const keys = new Set();
  const addKey = (type, value) => {
    const cleanValue = normalizeText(value || "");
    if (cleanValue) keys.add(`${role}:${type}:${cleanValue}`);
  };

  addKey("canonical", canonicalPersonKey(target));
  relatedProfileIdsForPerson(target).forEach((id) => addKey("id", id));
  addKey("email", personIdentityEmail(target));
  addKey("phone", personIdentityPhone(target));
  addKey("name", personIdentityName(target));
  if (!keys.size && item.request?.id) keys.add(`request:${item.request.id}`);
  return Array.from(keys);
}

function uniqueRatingItems(items = []) {
  const map = new Map();
  const aliases = new Map();
  items.forEach((item) => {
    const keys = ratingItemIdentityKeys(item);
    const key = keys.map((itemKey) => aliases.get(itemKey) || itemKey).find((itemKey) => map.has(itemKey)) || keys[0] || item.request.id;
    const current = map.get(key);
    if (!current || ratingItemPriority(item) >= ratingItemPriority(current)) {
      map.set(key, item);
    }
    keys.forEach((itemKey) => aliases.set(itemKey, key));
  });
  return Array.from(map.values()).sort((a, b) => new Date(b.request.updatedAt || b.request.createdAt || 0) - new Date(a.request.updatedAt || a.request.createdAt || 0));
}

function buildRatingHistorySection(items) {
  const section = createElement("section", "rating-lane");
  const uniqueItems = uniqueRatingItems(items);
  const readyCount = uniqueItems.reduce((count, { request, direction }) => {
    return count + ["first_contact", "service"].filter((type) => requestCanBeRated(request, direction, type) && !requestRatingFor(request, direction, type)).length;
  }, 0);
  const doneCount = uniqueItems.reduce((count, { request, direction }) => {
    return count + ["first_contact", "service"].filter((type) => requestRatingFor(request, direction, type)).length;
  }, 0);

  if (ratingHistoryTitle) {
    ratingHistoryTitle.textContent = readyCount
      ? `Valoraciones · ${readyCount} pendiente${readyCount === 1 ? "" : "s"}`
      : doneCount
        ? `Valoraciones · ${doneCount} enviada${doneCount === 1 ? "" : "s"}`
        : "Experiencia y reputación";
  }


  if (!uniqueItems.length) {
    const empty = createElement("article", "history-empty rating-empty");
    empty.append(
      createElement("strong", "", "Aún no hay experiencias que valorar."),
      createElement("p", "", "Cuando hayas hablado o trabajado con alguien, podrás dejar una valoración útil.")
    );
    section.append(empty);
    return section;
  }

  uniqueItems.forEach(({ request, direction }) => section.append(buildRatingCard(request, direction)));
  return section;
}

function requestCounterpart(request, direction) {
  return direction === "incoming" ? request.sender : request.recipient;
}

function contactDirectoryProfiles() {
  return [
    ...dataProvider.listProfiles("client"),
    ...dataProvider.listProfiles("professional")
  ];
}

function personIdentityEmail(person = {}) {
  return normalizeText(person.email || person.contactEmail || person.contact_email || "");
}

function personIdentityPhone(person = {}) {
  return normalizeText(person.phone || person.telephone || person.telefono || "");
}

function personIdentityId(person = {}) {
  return normalizeText(person.id || person.userId || person.user_id || "");
}

function personIdentityName(person = {}) {
  return normalizeText(person.name || person.displayName || person.display_name || "");
}

function resolveKnownProfileForPerson(person = {}) {
  const role = person.role || "";
  const id = personIdentityId(person);
  const email = personIdentityEmail(person);
  const phone = personIdentityPhone(person);
  const name = personIdentityName(person);
  const city = normalizeText(person.city || "");
  const profiles = contactDirectoryProfiles();
  const matchesRole = (item) => !role || !item.role || item.role === role;

  return profiles.find((item) => {
    if (!matchesRole(item)) return false;
    const itemId = personIdentityId(item);
    const itemEmail = personIdentityEmail(item);
    const itemPhone = personIdentityPhone(item);
    if (id && itemId && id === itemId) return true;
    if (email && itemEmail && email === itemEmail) return true;
    if (phone && itemPhone && phone === itemPhone) return true;
    return false;
  }) || profiles.find((item) => {
    if (!matchesRole(item)) return false;
    const itemCity = normalizeText(item.city || "");
    return name && personIdentityName(item) === name && (!city || !itemCity || itemCity === city);
  }) || (() => {
    if (!name) return null;
    const sameName = profiles.filter((item) => matchesRole(item) && personIdentityName(item) === name);
    return sameName.length === 1 ? sameName[0] : null;
  })();
}

function resolveConversationPerson(person = {}) {
  const known = resolveKnownProfileForPerson(person);
  if (!known) return person;
  return {
    ...person,
    ...known,
    services: known.services?.length ? known.services : person.services || []
  };
}

function personDisplayQuality(person = {}) {
  return [person.id, person.email || person.contactEmail, person.name, person.photo, person.city, person.goal, person.sport, person.phone]
    .filter(Boolean).length + (Array.isArray(person.services) ? person.services.length : 0);
}

function canonicalPersonKey(person = {}) {
  const resolved = resolveConversationPerson(person);
  const role = resolved.role || person.role || "profile";
  const email = personIdentityEmail(resolved) || personIdentityEmail(person);
  if (email) return `${role}:email:${email}`;

  const phone = personIdentityPhone(resolved) || personIdentityPhone(person);
  if (phone) return `${role}:phone:${phone}`;

  const id = personIdentityId(resolved) || personIdentityId(person);
  if (id) return `${role}:id:${id}`;

  const name = personIdentityName(resolved) || personIdentityName(person);
  if (name) return `${role}:legacy:${name}`;

  return "";
}

function relatedProfileIdsForPerson(person = {}) {
  const ids = new Set([person.id, resolveConversationPerson(person).id].filter(Boolean));
  const key = canonicalPersonKey(person);
  if (key) {
    contactDirectoryProfiles().forEach((item) => {
      if (canonicalPersonKey(item) === key && item.id) ids.add(item.id);
    });
  }
  return ids.size ? Array.from(ids) : [person.id].filter(Boolean);
}

function conversationKeyForRequest(request, direction) {
  const person = requestCounterpart(request, direction) || {};
  return `${direction}:${canonicalPersonKey(person) || request.id}`;
}

function groupRequestsByConversation(requests = [], direction) {
  const groups = new Map();
  requests.forEach((request) => {
    const key = conversationKeyForRequest(request, direction);
    const person = resolveConversationPerson(requestCounterpart(request, direction) || {});
    if (!groups.has(key)) {
      groups.set(key, { key, direction, person, requests: [] });
    } else if (personDisplayQuality(person) > personDisplayQuality(groups.get(key).person)) {
      groups.get(key).person = person;
    }
    groups.get(key).requests.push(request);
  });

  return Array.from(groups.values()).map((group) => {
    group.requests.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    group.latest = group.requests[0];
    group.unreadCount = direction === "incoming" ? group.requests.filter((request) => !request.readAt).length : 0;
    return group;
  }).sort((a, b) => new Date(b.latest?.createdAt || 0) - new Date(a.latest?.createdAt || 0));
}

function buildConversationCard(group) {
  const card = document.createElement("details");
  card.className = `conversation-card conversation-card-${group.direction}`;
  card.dataset.conversationId = group.key;

  const summary = document.createElement("summary");
  summary.className = "conversation-summary";
  const person = group.person || {};
  const avatar = createElement("div", "avatar message-avatar conversation-avatar");
  const identity = createElement("div", "conversation-identity");
  const copy = createElement("div", "conversation-copy");
  const title = createElement("strong", "", person.name || "Contacto Fit Match");
  const latest = group.latest || {};
  const messageCount = group.requests.length;
  const countText = `${messageCount} mensaje${messageCount === 1 ? "" : "s"}`;
  const meta = createElement("span", "", `${countText} · ${latest.score || 0}% · ${label("goals", person.goal)} · ${formatDate(latest.createdAt)}`);
  const statusText = group.unreadCount
    ? `${group.unreadCount} nuevo${group.unreadCount === 1 ? "" : "s"}`
    : group.direction === "incoming" ? "Leído" : "Enviado";
  const badge = createElement("span", `status-badge ${group.unreadCount ? "status-unread" : "status-read"}`, statusText);
  const action = createElement("span", "conversation-open-label", "Abrir conversación");

  setAvatarContent(avatar, person);
  copy.append(title, meta);
  identity.append(avatar, copy);
  summary.append(identity, badge, action);
  card.append(summary);

  const thread = createElement("div", "conversation-thread-list");
  group.requests.forEach((request) => thread.append(buildRequestCard(request, group.direction)));
  card.append(thread);

  const conversationActions = createElement("div", "conversation-actions");
  const deleteConversationButton = createElement("button", "button quiet danger-button conversation-delete-button", "Eliminar conversación");
  deleteConversationButton.type = "button";
  deleteConversationButton.dataset.deleteConversation = group.requests.map((request) => request.id).join(",");
  deleteConversationButton.setAttribute("aria-label", `Eliminar conversación con ${person.name || "este contacto"}`);
  conversationActions.append(deleteConversationButton);
  card.append(conversationActions);

  card.open = openConversationIds.has(group.key);
  card.addEventListener("toggle", () => {
    if (card.open) {
      openConversationIds.add(group.key);
      return;
    }
    openConversationIds.delete(group.key);
  });
  return card;
}

function buildRequestSection({ title, kicker, requests, emptyTitle, emptyText, direction }) {
  const section = createElement("section", `request-lane request-lane-${direction}`);
  const groups = groupRequestsByConversation(requests, direction);
  const heading = createElement("div", "request-lane-heading");
  const headingText = createElement("div");
  const groupedTitle = groups.length
    ? `${groups.length} conversación${groups.length === 1 ? "" : "es"} ${direction === "incoming" ? "recibida" : "enviada"}${groups.length === 1 ? "" : "s"}`
    : title;
  headingText.append(
    createElement("span", "micro-label", kicker),
    createElement("strong", "", groupedTitle)
  );
  heading.append(headingText);
  if (requests.length) {
    const selectLaneButton = createElement("button", "button quiet lane-select-button", "Seleccionar todos");
    selectLaneButton.type = "button";
    selectLaneButton.dataset.selectLane = direction;
    heading.append(selectLaneButton);
  }
  section.append(heading);

  if (!requests.length) {
    const empty = createElement("article", "history-empty");
    empty.append(
      createElement("strong", "", emptyTitle),
      createElement("p", "", emptyText)
    );
    section.append(empty);
    return section;
  }

  groups.forEach((group) => section.append(buildConversationCard(group)));
  return section;
}

function updateRequestDeleteButton(visibleCount = 0) {
  if (!clearRequestsButton) return;
  const selectedCount = selectedRequestIds.size;
  clearRequestsButton.hidden = visibleCount === 0;
  clearRequestsButton.disabled = selectedCount === 0;
  clearRequestsButton.textContent = selectedCount
    ? `Eliminar ${selectedCount} seleccionado${selectedCount === 1 ? "" : "s"}`
    : "Selecciona mensajes";
}

function pruneSelectedRequests(visibleIds) {
  const visibleSet = new Set(visibleIds);
  selectedRequestIds = new Set(Array.from(selectedRequestIds).filter((id) => visibleSet.has(id)));
  openRequestIds = new Set(Array.from(openRequestIds).filter((id) => visibleSet.has(id)));
  const visibleConversations = new Set([
    ...groupRequestsByConversation(
      dataProvider.listContactRequests(profile.role, { profileId: profile.id, direction: "incoming" }),
      "incoming"
    ).map((group) => group.key),
    ...groupRequestsByConversation(
      dataProvider.listContactRequests(profile.role, { profileId: profile.id, direction: "outgoing" }),
      "outgoing"
    ).map((group) => group.key)
  ]);
  openConversationIds = new Set(Array.from(openConversationIds).filter((id) => visibleConversations.has(id)));
}

function requestIdsForLane(direction) {
  return Array.from(requestList.querySelectorAll(`.request-lane-${direction} [data-select-request]`))
    .map((input) => input.dataset.selectRequest)
    .filter(Boolean);
}

async function deleteSelectedRequests(requestIds) {
  const ids = Array.isArray(requestIds) ? requestIds.filter(Boolean) : [requestIds].filter(Boolean);
  if (!ids.length) return;
  const confirmed = window.confirm(ids.length === 1
    ? "¿Eliminar este mensaje de tu bandeja?"
    : `¿Eliminar ${ids.length} mensajes seleccionados de tu bandeja?`);
  if (!confirmed) return;

  if (clearRequestsButton) clearRequestsButton.disabled = true;
  try {
    await dataProvider.deleteContactRequests?.(ids, { role: profile.role, profileId: profile.id });
    ids.forEach((id) => selectedRequestIds.delete(id));
    resetRequestBox();
    renderRequestHistory();
  } catch (error) {
    requestBox.className = "request-box";
    requestBox.replaceChildren(
      createElement("strong", "", "No se pudo eliminar"),
      createElement("p", "", error.message || "Revisa la sesión y vuelve a intentarlo.")
    );
    renderRequestHistory();
  }
}

function renderRequestHistory() {
  if (!requestList) return;

  const requestOptions = { profileId: profile.id };
  const incomingRequests = dataProvider.listContactRequests(profile.role, { ...requestOptions, direction: "incoming" });
  const sentRequests = dataProvider.listContactRequests(profile.role, { ...requestOptions, direction: "outgoing" });
  const unreadRequests = incomingRequests.filter((request) => !request.readAt).length;
  const visibleRequestIds = [...incomingRequests, ...sentRequests].map((request) => request.id);
  pruneSelectedRequests(visibleRequestIds);
  requestList.replaceChildren();
  ratingList?.replaceChildren();
  updateRequestDeleteButton(visibleRequestIds.length);
  historyTitle.textContent = unreadRequests ? `Bandeja · ${unreadRequests} nuevo${unreadRequests === 1 ? "" : "s"}` : "Bandeja de contactos";

  requestList.append(
    buildRequestSection({
      title: incomingRequests.length ? `${incomingRequests.length} contacto${incomingRequests.length === 1 ? "" : "s"} recibido${incomingRequests.length === 1 ? "" : "s"}` : "Recibidos",
      kicker: unreadRequests ? `${unreadRequests} nuevo${unreadRequests === 1 ? "" : "s"}` : "Recibidos",
      requests: incomingRequests,
      emptyTitle: "Sin solicitudes recibidas todavía",
      emptyText: profile.role === "client"
        ? "Cuando un profesional te envíe una propuesta, aparecerá aquí."
        : "Cuando un cliente solicite contacto, aparecerá aquí para que puedas leerlo.",
      direction: "incoming"
    }),
    buildRequestSection({
      title: sentRequests.length ? `${sentRequests.length} contacto${sentRequests.length === 1 ? "" : "s"} enviado${sentRequests.length === 1 ? "" : "s"}` : "Enviados",
      kicker: "Enviados",
      requests: sentRequests,
      emptyTitle: profile.role === "client" ? "Sin solicitudes enviadas" : "Sin propuestas enviadas",
      emptyText: "Cuando contactes desde Matches, tu solicitud o propuesta quedará aquí para seguimiento.",
      direction: "outgoing"
    })
  );

  if (ratingList) {
    const ratingItems = [
      ...incomingRequests.map((request) => ({ request, direction: "incoming" })),
      ...sentRequests.map((request) => ({ request, direction: "outgoing" }))
    ];
    ratingList.append(buildRatingHistorySection(ratingItems));
  }

  updateRequestDeleteButton(visibleRequestIds.length);
  updateProfileStatus();
}

authForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  handleAuth("signin");
});


async function signOutForNewAccount() {
  setAuthLoading(true);
  await dataProvider.signOut();
  setAuthLoading(false);
  clearAuthInputs();
  resetProfileState(profile.role);
  updateAuthPanel("Sesión cerrada. Ahora puedes registrar un email y contraseña nuevos.");
  showView("register");
  window.setTimeout(() => document.querySelector("#emailInput")?.focus(), 80);
}

authPanel?.addEventListener("click", async (event) => {
  const authButton = event.target.closest("[data-auth-action]");
  if (authButton) {
    event.preventDefault();
    handleAuth(authButton.dataset.authAction);
    return;
  }

  if (event.target.closest("#signOutButton") || event.target.closest("[data-sign-out]")) {
    event.preventDefault();
    setAuthLoading(true);
    await dataProvider.signOut();
    setAuthLoading(false);
    clearAuthInputs();
    resetProfileState(profile.role);
    updateAuthPanel("Sesión cerrada. Puedes iniciar otra ruta desde el inicio.");
    showView("home");
  }
});

signupSignOutButton?.addEventListener("click", async (event) => {
  event.preventDefault();
  await signOutForNewAccount();
});

photoInput?.addEventListener("change", async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  isProcessingPhoto = true;
  roleHelp.querySelector("strong").textContent = "Procesando foto";
  roleHelp.querySelector("span").textContent = "Estamos preparando una versión ligera para tu perfil.";

  try {
    profile.photo = await resizeProfilePhoto(file);
    updatePhotoPreview();
    saveDraft();

    if (hasSavedProfile()) {
      await saveCurrentProfile();
      refreshMatches();
      updateAuthPanel("Foto actualizada en tu perfil.");
      roleHelp.querySelector("strong").textContent = "Foto guardada";
      roleHelp.querySelector("span").textContent = "La foto ya queda asociada a tu perfil y se verá en matches.";
    } else {
      roleHelp.querySelector("strong").textContent = "Foto añadida";
      roleHelp.querySelector("span").textContent = "La foto se guardará con tu perfil cuando pulses guardar.";
    }
  } catch (error) {
    roleHelp.querySelector("strong").textContent = "No se pudo añadir la foto";
    roleHelp.querySelector("span").textContent = error.message || "Prueba con otra imagen.";
  } finally {
    isProcessingPhoto = false;
    event.target.value = "";
  }
});

removePhotoButton?.addEventListener("click", async () => {
  profile.photo = "";
  updatePhotoPreview();
  saveDraft();
  if (hasSavedProfile()) {
    await saveCurrentProfile();
    refreshMatches();
    updateAuthPanel("Foto eliminada de tu perfil.");
  }
});

document.addEventListener("click", (event) => {
  const roleStartButton = event.target.closest("[data-start-role]");
  if (roleStartButton) {
    event.preventDefault();
    const requestedRole = roleStartButton.dataset.startRole;
    if (isRemoteMode() && requestedRole !== profile.role && !roleStartButton.closest("#home")) {
      updateAuthPanel("Cierra sesión y vuelve al inicio para crear una cuenta de otro tipo.");
      showView("account");
      return;
    }
    if (isRemoteMode() && requestedRole !== profile.role && roleStartButton.closest("#home")) {
      updateAuthPanel("Ya tienes una sesión activa. Cierra sesión antes de iniciar otra ruta.");
      showView("account");
      return;
    }
    updateRole(requestedRole, {
      persistCurrent: activeView === "register",
      simulateLoading: false
    });
    const nextView = "account";
    showView(nextView);
    return;
  }

  const viewButton = event.target.closest("[data-view]");
  if (!viewButton) return;

  event.preventDefault();
  const requestedView = normalizeView(viewButton.dataset.view);
  const nextView = viewButton.classList.contains("nav-link") ? routeForProtectedView(requestedView) : requestedView;

  if (nextView !== requestedView) {
    if (nextView === "account") {
      updateAuthPanel("Primero entra con tu cuenta o crea una nueva para seguir esta ruta.");
    }
    if (nextView === "register") {
      roleHelp.querySelector("strong").textContent = "Completa tu perfil";
      roleHelp.querySelector("span").textContent = "Guarda tu perfil con nombre y cuenta. El resto de campos solo mejora la precisión del match.";
    }
  }

  showView(nextView);

  const scrollTarget = viewButton.dataset.scrollTarget;
  if (scrollTarget) {
    window.requestAnimationFrame(() => {
      if (scrollTarget === "#accountLegalCenter") {
        markTrustCenterVisited();
        updateSignupLegalState();
        openAccountLegalCenter()?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      document.querySelector(scrollTarget)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
});

adminPeriodFilter?.addEventListener("change", renderAdminDashboard);
adminReportStatusFilter?.addEventListener("change", renderAdminDashboard);
adminReportReasonFilter?.addEventListener("change", renderAdminDashboard);
adminReportPriorityFilter?.addEventListener("change", renderAdminDashboard);
adminDashboard?.addEventListener("click", handleAdminReportSave);

adminRefreshButton?.addEventListener("click", async () => {
  const previousText = adminRefreshButton.textContent;
  adminRefreshButton.disabled = true;
  adminRefreshButton.textContent = "Actualizando...";
  try {
    await dataProvider.refreshRemoteData?.();
    renderAdminDashboard();
  } finally {
    adminRefreshButton.disabled = false;
    adminRefreshButton.textContent = previousText;
  }
});

window.addEventListener("popstate", (event) => {
  showView(event.state?.view || window.location.hash, { push: false });
});

roleButtons.forEach((button) => {
  button.addEventListener("click", () => updateRole(button.dataset.role));
  button.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "Enter", " "].includes(event.key)) return;
    event.preventDefault();

    if (event.key === "Enter" || event.key === " ") {
      updateRole(button.dataset.role);
      return;
    }

    const roles = Array.from(roleButtons);
    const currentIndex = roles.indexOf(button);
    const nextIndex =
      event.key === "ArrowRight"
        ? (currentIndex + 1) % roles.length
        : (currentIndex - 1 + roles.length) % roles.length;

    roles[nextIndex].focus();
    updateRole(roles[nextIndex].dataset.role);
  });
});

async function submitProfileAndOpenMatches() {
  if (isSavingProfile) return;
  isSavingProfile = true;
  const previousText = profileSubmitButton?.textContent || "Guardar perfil y buscar matches";
  if (profileSubmitButton) {
    profileSubmitButton.disabled = true;
    profileSubmitButton.textContent = "Guardando perfil...";
  }

  try {
    if (!(await saveCurrentProfile())) return;
    resetRequestBox();
    refreshMatches({ simulateLoading: true });
    showView("matches");
    updateAuthPanel(isRemoteMode() ? "Perfil guardado en Supabase." : "Perfil guardado en modo local.");
  } finally {
    isSavingProfile = false;
    if (profileSubmitButton) {
      profileSubmitButton.disabled = false;
      profileSubmitButton.textContent = previousText;
    }
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  await submitProfileAndOpenMatches();
});

form.addEventListener("input", (event) => {
  if (isProcessingPhoto || event.target === photoInput) return;
  readForm();
  saveDraft();
});

form.addEventListener("change", (event) => {
  if (isProcessingPhoto || event.target === photoInput) return;
  readForm();
  saveDraft();
});

sortInput.addEventListener("change", () => {
  readForm();
  saveDraft();
  refreshMatches();
});

resetProfileButton?.addEventListener("click", startCleanProfile);

clearProfilesButton.addEventListener("click", async () => {
  const wasRemote = isRemoteMode();
  const targetText = wasRemote
    ? "eliminar tu cuenta de acceso, tu perfil y datos asociados en Supabase"
    : "eliminar tu perfil guardado en este navegador";
  const confirmed = window.confirm(`¿Quieres ${targetText}?`);
  if (!confirmed) return;
  try {
    const deletionResult = await dataProvider.clearProfiles(profile.role);
    if (wasRemote) {
      await dataProvider.signOut();
      resetProfileState(profile.role);
      const deletionMessage = deletionResult?.authDeleted
        ? "Cuenta de acceso, perfil y datos de Fit Match eliminados de Supabase. Sesión cerrada."
        : "Perfil de Fit Match eliminado. Para borrar tambien email y contrasena, ejecuta docs/supabase-account-delete.sql en Supabase.";
      updateAuthPanel(deletionMessage);
      showView("home");
      return;
    }
    startCleanProfile();
    updateAuthPanel("Perfil eliminado. Puedes completar uno nuevo cuando quieras.");
  } catch (error) {
    profileStatusTitle.textContent = "No se pudo eliminar";
    profileStatusCopy.textContent = error.message || "Revisa la sesión y vuelve a intentarlo.";
    updateAuthPanel(error.message || "No se pudo eliminar el perfil guardado.");
  }
});

clearRequestsButton.addEventListener("click", async () => {
  await deleteSelectedRequests(Array.from(selectedRequestIds));
});

async function markRequestContactStage(requestId, stage = "contact", button) {
  if (!requestId) return;
  const originalText = button?.textContent || "";
  const isService = stage === "service";
  if (button) {
    button.disabled = true;
    button.textContent = "Guardando...";
  }
  try {
    if (isService) {
      await dataProvider.markServiceCompleted?.(requestId);
    } else {
      await dataProvider.markContactStarted?.(requestId);
    }
    await dataProvider.refreshRemoteData?.();
    openRatingIds.add(`${button?.dataset.ratingDirection || ""}:${requestId}`);
    requestBox.className = "request-box request-success";
    requestBox.replaceChildren(
      createElement("span", "success-kicker", isService ? "Servicio real confirmado" : "Primer contacto confirmado"),
      createElement("strong", "", isService ? "Ya puedes valorar la experiencia real." : "Ya puedes valorar la primera conversación."),
      createElement("p", "", isService
        ? "La valoración de servicio se activa ahora para construir una reputación más completa."
        : "La valoración de primer contacto se activa ahora, separada del servicio real.")
    );
    renderRequestHistory();
    refreshMatches();
    updateProfileStatus();
  } catch (error) {
    const errorText = error.message || "No se pudo guardar este paso.";
    requestBox.className = "request-box";
    requestBox.replaceChildren(
      createElement("strong", "", "No se pudo guardar este paso"),
      createElement("p", "", errorText)
    );
    if (button) button.textContent = "No se pudo guardar";
  } finally {
    if (button) {
      button.disabled = false;
      button.textContent = originalText;
    }
  }
}

function handleContactPanelClick(event) {
  const ratingStar = event.target.closest("[data-rating-star]");
  if (ratingStar) {
    event.preventDefault();
    event.stopPropagation();
    setRatingRowValue(ratingStar.closest("[data-rating-field]"), Number(ratingStar.dataset.ratingStar));
    return;
  }

  const ratingButton = event.target.closest("[data-save-rating]");
  if (ratingButton) {
    event.preventDefault();
    event.stopPropagation();
    saveRequestRating(ratingButton.dataset.saveRating, ratingButton.dataset.ratingDirection, ratingButton);
    return;
  }

  const contactStartedButton = event.target.closest("[data-mark-contact-started]");
  if (contactStartedButton) {
    event.preventDefault();
    event.stopPropagation();
    markRequestContactStage(contactStartedButton.dataset.markContactStarted, "contact", contactStartedButton);
    return;
  }

  const serviceCompletedButton = event.target.closest("[data-mark-service-completed]");
  if (serviceCompletedButton) {
    event.preventDefault();
    event.stopPropagation();
    markRequestContactStage(serviceCompletedButton.dataset.markServiceCompleted, "service", serviceCompletedButton);
    return;
  }

  const deleteConversationButton = event.target.closest("[data-delete-conversation]");
  if (deleteConversationButton) {
    event.preventDefault();
    event.stopPropagation();
    const ids = String(deleteConversationButton.dataset.deleteConversation || "")
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean);
    deleteSelectedRequests(ids);
    return;
  }

  const deleteButton = event.target.closest("[data-delete-request]");
  if (deleteButton) {
    event.preventDefault();
    deleteSelectedRequests([deleteButton.dataset.deleteRequest]);
    return;
  }

  const selectLaneButton = event.target.closest("[data-select-lane]");
  if (selectLaneButton) {
    event.preventDefault();
    const ids = requestIdsForLane(selectLaneButton.dataset.selectLane);
    const allSelected = ids.length > 0 && ids.every((id) => selectedRequestIds.has(id));
    ids.forEach((id) => {
      if (allSelected) {
        selectedRequestIds.delete(id);
      } else {
        selectedRequestIds.add(id);
      }
    });
    renderRequestHistory();
    return;
  }

  const replyButton = event.target.closest("[data-reply-request]");
  if (!replyButton) return;
  event.preventDefault();
  sendInboxReply(replyButton.dataset.replyRequest, replyButton);
}

requestList?.addEventListener("click", handleContactPanelClick);
ratingList?.addEventListener("click", handleContactPanelClick);

requestList?.addEventListener("change", (event) => {
  const checkbox = event.target.closest("[data-select-request]");
  if (!checkbox) return;
  if (checkbox.checked) {
    selectedRequestIds.add(checkbox.dataset.selectRequest);
  } else {
    selectedRequestIds.delete(checkbox.dataset.selectRequest);
  }
  checkbox.closest(".history-card")?.classList.toggle("selected-card", checkbox.checked);
  updateRequestDeleteButton(requestList.querySelectorAll("[data-select-request]").length);
});

function openMatchFromTrigger(trigger) {
  if (!trigger?.dataset?.request) return;
  openRequestModal(trigger.dataset.request, trigger);
}

matchList.addEventListener("click", (event) => {
  const actionButton = event.target.closest("[data-action]");
  if (actionButton?.dataset.action === "switch-role") {
    updateAuthPanel("Cierra sesión y vuelve al inicio para crear una cuenta de otro tipo.");
    showView("account");
    return;
  }

  if (actionButton?.dataset.action === "restore-hidden-matches") {
    restoreHiddenMatches();
    refreshMatches({ simulateLoading: true });
    updateProfileStatus();
    return;
  }

  const hideButton = event.target.closest("[data-hide-match]");
  if (hideButton) {
    event.preventDefault();
    event.stopPropagation();
    hideMatch(hideButton.dataset.hideMatch);
    refreshMatches({ simulateLoading: true });
    updateProfileStatus();
    return;
  }

  const button = event.target.closest("[data-request]");
  if (!button) return;
  openMatchFromTrigger(button);
});


document.querySelector("#closeModal").addEventListener("click", closeModal);
sendRequestButton.addEventListener("click", sendRequest);

profileDetail?.addEventListener("click", handleSubmitProfileReport);

modal.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});

proInterestButton?.addEventListener("click", async () => {
  if (profile.role !== "professional") return;
  proInterestButton.disabled = true;
  proInterestButton.textContent = "Registrando interés...";
  try {
    const subscription = await dataProvider.registerProInterest?.(profile);
    if (subscription) {
      Object.assign(profile, {
        proInterest: subscription.proInterest,
        profileScore: subscription.profileScore,
        profileRecommendations: subscription.profileRecommendations
      });
    }
    renderProPanel();
  } catch (error) {
    if (proPaymentNote) proPaymentNote.textContent = error.message || "No se pudo registrar tu interés todavía.";
  }
});

document.addEventListener("click", (event) => {
  const docButton = event.target.closest("[data-open-legal-doc]");
  if (!docButton) return;
  event.preventDefault();
  renderLegalDocument(docButton.dataset.openLegalDoc);
});

closeLegalDocModalButton?.addEventListener("click", closeLegalDocModal);
legalDocModal?.addEventListener("click", (event) => {
  if (event.target === legalDocModal) closeLegalDocModal();
});

requestAccountDeletionButton?.addEventListener("click", () => {
  renderLegalDocument("rights");
  window.setTimeout(() => {
    if (legalDocIntro) {
      legalDocIntro.textContent = "Puedes revisar tus derechos y solicitar cambios o eliminación de tus datos desde esta zona de confianza.";
    }
  }, 20);
});

signupLegalChecks.forEach((check) => {
  check.addEventListener("change", updateSignupLegalState);
});

legalChecks.forEach((check) => {
  check.addEventListener("change", updateLegalAcceptState);
});

acceptLegalTermsButton?.addEventListener("click", async () => {
  if (acceptLegalTermsButton.disabled) return;
  acceptLegalTermsButton.disabled = true;
  acceptLegalTermsButton.textContent = "Guardando...";
  const payload = Array.from(legalChecks).reduce((items, check) => {
    items[check.dataset.legalCheck] = check.checked;
    return items;
  }, { role: profile.role });
  try {
    await dataProvider.acceptLegalConsent?.(payload);
    closeLegalModal();
    updateSignupLegalState();
  } finally {
    acceptLegalTermsButton.textContent = "Aceptar y continuar";
    updateLegalAcceptState();
  }
});

document.addEventListener("keydown", (event) => {
  const legalDocModalIsOpen = legalDocModal && !legalDocModal.classList.contains("hidden");
  const legalModalIsOpen = legalModal && !legalModal.classList.contains("hidden");
  const baseModalIsOpen = !modal.classList.contains("hidden");
  const modalIsOpen = legalDocModalIsOpen || legalModalIsOpen || baseModalIsOpen;

  if (event.key === "Escape" && legalDocModalIsOpen) {
    closeLegalDocModal();
    return;
  }

  if (event.key === "Escape" && !legalModalIsOpen && baseModalIsOpen) {
    closeModal();
  }

  if (event.key !== "Tab" || !modalIsOpen) return;

  const activeModal = legalDocModalIsOpen ? legalDocModal : legalModalIsOpen ? legalModal : modal;
  const focusableElements = Array.from(
    activeModal.querySelectorAll('a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])')
  );
  if (!focusableElements.length) return;

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (document.activeElement === activeModal) {
    event.preventDefault();
    if (event.shiftKey) {
      lastElement.focus();
    } else {
      firstElement.focus();
    }
    return;
  }

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault();
    lastElement.focus();
  }

  if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault();
    firstElement.focus();
  }
});

async function startApp() {
  await dataProvider.init?.();
  updateSignupLegalState();
  clearAuthInputs();
  window.setTimeout(clearAuthInputs, 120);
  setBirthdateLimit();
  setFormFromProfile();
  setRoleButtonState();
  updateRoleCopy();
  resetRequestBox();
  renderRequestHistory();
  updateProfileStatus();
  renderMatches();

  if (currentUser()) {
    loadOwnRemoteProfile();
  }

  updateAdminNavigation();
  updateAuthPanel();
  const initialView = window.location.hash || (currentUser() ? "account" : "home");
  showView(initialView, { push: false, focus: false });
}

startApp();
