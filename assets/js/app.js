const dataProvider = window.FitMatchDataProvider;
const labels = dataProvider.getLabels();

const ROLE_COPY = {
  client: {
    onboardingTitle: "Ruta cliente",
    onboardingCopy:
      "Esta pantalla es solo para clientes: define qué necesitas, tu contexto y el tipo de profesional que tendría sentido para ti.",
    roleHelpTitle: "Perfil cliente",
    roleHelp:
      "Completa qué necesitas. Después Fit Match cruzará tu búsqueda con profesionales compatibles.",
    submit: "Guardar perfil cliente y ver profesionales",
    matchesTitle: "Profesionales compatibles",
    matchesCopy:
      "Los resultados usan profesionales disponibles en Supabase cuando hay sesión, o perfiles locales mientras pruebas sin entrar.",
    requestTitle: "Solicitudes preparadas",
    requestCopy:
      "Elige un profesional compatible y prepara una solicitud. Con sesión iniciada quedará registrada en Supabase.",
    cardAction: "Solicitar servicio",
    modalTitle: "Solicitar servicio",
    modalText:
      "Vas a preparar una solicitud local con el perfil del cliente y el profesional seleccionado.",
    sendAction: "Enviar solicitud",
    sentPrefix: "Solicitud preparada para",
    sentNext:
      "Con cuentas reales, el profesional recibirá el perfil y podrá responder o proponer una primera llamada."
  },
  professional: {
    onboardingTitle: "Ruta profesional",
    onboardingCopy:
      "Esta pantalla es solo para profesionales: define qué ofreces, tu método y el tipo de cliente con el que puedes trabajar bien.",
    roleHelpTitle: "Perfil profesional",
    roleHelp:
      "Completa tu especialidad, servicios, disponibilidad y criterio. Después Fit Match te mostrará clientes compatibles.",
    submit: "Guardar perfil profesional y ver clientes",
    matchesTitle: "Clientes compatibles",
    matchesCopy:
      "Los resultados usan clientes disponibles en Supabase cuando hay sesión, o perfiles locales mientras pruebas sin entrar.",
    requestTitle: "Propuestas preparadas",
    requestCopy:
      "Elige un cliente compatible y prepara una propuesta. Con sesión iniciada quedará registrada en Supabase.",
    cardAction: "Proponer plan",
    modalTitle: "Proponer plan",
    modalText:
      "Vas a preparar una propuesta local con el perfil profesional y el cliente seleccionado.",
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
    goalHint: "Elige el objetivo principal que quieres trabajar.",
    sportLabel: "Deporte o disciplina que practicas",
    sportHint: "Si buscas algo concreto, escríbelo aquí para afinar el match.",
    modeLabel: "Cómo quieres trabajar",
    modeHint: "Online, presencial o híbrido según tu disponibilidad real.",
    levelLabel: "Tu nivel actual",
    levelHint: "Ayuda a encontrar profesionales que sepan acompañar tu punto de partida.",
    servicesLegend: "Qué tipo de ayuda necesitas",
    servicesHint: "Marca los servicios que te gustaría recibir.",
    priceLabel: "Presupuesto por sesión",
    priceHint: "Indica cuánto puedes invertir aproximadamente por sesión.",
    availabilityLabel: "Cuándo puedes entrenar o reunirte",
    availabilityHint: "Ej. tardes, mañanas, fines de semana, online entre semana.",
    bioLabel: "Cuéntanos qué buscas",
    bioHint: "Se mostrará en la tarjeta de match sin enseñar tu email.",
    notesLabel: "Detalles importantes para afinar el match",
    notesHint: "Lesiones, objetivos concretos, deporte, horarios o preferencias.",
    bioPlaceholder: "Qué quieres conseguir, qué has probado antes o qué tipo de acompañamiento buscas.",
    notesPlaceholder: "Ej. lesión de rodilla, media maratón, perder grasa, pádel competitivo, disponibilidad mañanas."
  },
  professional: {
    goalLabel: "Tu especialidad principal",
    goalHint: "Elige el área donde puedes ayudar mejor.",
    sportLabel: "Deportes o disciplinas que trabajas",
    sportHint: "Escribe disciplinas concretas para cruzarlas con búsquedas de clientes.",
    modeLabel: "Cómo ofreces tus servicios",
    modeHint: "Online, presencial o híbrido según tu forma real de trabajo.",
    levelLabel: "Nivel de cliente que atiendes mejor",
    levelHint: "Ayuda a evitar propuestas poco ajustadas.",
    servicesLegend: "Servicios que ofreces",
    servicesHint: "Marca los servicios que puedes prestar.",
    priceLabel: "Precio por sesión",
    priceHint: "Indica tu precio orientativo por sesión.",
    availabilityLabel: "Disponibilidad profesional",
    availabilityHint: "Ej. mañanas, tardes, online, fines de semana, plazas limitadas.",
    bioLabel: "Presentación profesional",
    bioHint: "Se mostrará en tu tarjeta para clientes compatibles.",
    notesLabel: "Criterio de trabajo y casos ideales",
    notesHint: "Describe lesiones, objetivos, deportes o perfiles de cliente con los que trabajas bien.",
    bioPlaceholder: "Tu enfoque, experiencia, especialidades y tipo de acompañamiento que ofreces.",
    notesPlaceholder: "Ej. pérdida de grasa, fuerza, running, readaptación, clientes principiantes, seguimiento online."
  }
};


const RATING_CRITERIA = {
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

function ratingSummaryFor(person) {
  return dataProvider.getRatingSummary?.(person?.id) || person?.ratingSummary || { average: 0, count: 0, label: "Sin valoraciones" };
}

function ratingText(summary) {
  if (!summary?.count) return "Sin valoraciones";
  return `${summary.average}/5 · ${summary.count} valoración${summary.count === 1 ? "" : "es"}`;
}

function createRatingBadge(person, className = "rating-badge") {
  const summary = ratingSummaryFor(person);
  const badge = createElement("span", className, summary.count ? `★ ${summary.average}/5` : "★ Nuevo");
  badge.setAttribute("aria-label", summary.count ? ratingText(summary) : "Sin valoraciones todavía");
  return badge;
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
    notes: ""
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
const savedRoleLabel = document.querySelector("#savedRoleLabel");
const savedRequestsCount = document.querySelector("#savedRequestsCount");
const requestList = document.querySelector("#requestList");
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
const legalModal = document.querySelector("#legalModal");
const acceptLegalTermsButton = document.querySelector("#acceptLegalTerms");
const legalChecks = document.querySelectorAll("[data-legal-check]");
const authActionButtons = document.querySelectorAll("[data-auth-action]");
const appViews = document.querySelectorAll(".app-view");
const viewButtons = document.querySelectorAll("[data-view]");
const roleStartButtons = document.querySelectorAll("[data-start-role]");
const reviewToggle = document.querySelector("#reviewToggle");
const REVIEW_MODE_KEY = "fit-match.review-mode";
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
  solicitudes: "contacts"
};
let activeView = "home";

function normalizeView(viewName) {
  const cleanName = String(viewName || "home").replace("#", "").trim();
  return viewAliases[cleanName] || "home";
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

  if (nextView === "account") {
    updateAuthPanel();
  }

  if (nextView === "matches") {
    refreshMatches();
  }

  if (nextView === "contacts") {
    renderRequestHistory();
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

function setReviewMode(enabled) {
  document.body.classList.toggle("review-mode", enabled);
  if (!reviewToggle) return;
  reviewToggle.classList.toggle("active", enabled);
  reviewToggle.setAttribute("aria-pressed", String(enabled));
  reviewToggle.textContent = enabled ? "Montaje activo" : "Montaje";
}

function initReviewMode() {
  const stored = window.localStorage.getItem(REVIEW_MODE_KEY);
  const isLocalFile = window.location.protocol === "file:";
  setReviewMode(stored === null ? isLocalFile : stored === "true");
}


function updateLegalAcceptState() {
  if (!acceptLegalTermsButton) return;
  acceptLegalTermsButton.disabled = !Array.from(legalChecks).every((check) => check.checked);
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
    if (authTitle) authTitle.textContent = isProfileReady ? "Tu espacio Fit Match" : "Cuenta conectada";
    if (authStatus) authStatus.textContent = message || (isProfileReady
      ? "Este es tu punto de entrada personal. Revisa matches, contactos o edita tu perfil."
      : "Ya estás dentro. Completa tu perfil para activar tus matches.");
  } else {
    if (authTitle) authTitle.textContent = "Bienvenido a Fit Match";
    if (authStatus) authStatus.textContent = message || "Inicia sesión para acceder a tus matches, contactos y perfil.";
  }

  renderProfileHome();
  if (isConnected) maybePromptLegalConsent();
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
  if (profileContextKicker) profileContextKicker.textContent = isClient ? "Tu perfil y tus matches" : "Tu visibilidad en Fit Match";
  if (profileContextTitle) profileContextTitle.textContent = isClient ? "Vas por buen camino." : "Tu perfil conecta con intención.";
  if (profileContextCopy) profileContextCopy.textContent = isClient
    ? "Completa tu perfil para recibir profesionales más precisos y conversaciones con más contexto."
    : "Cuanto más clara sea tu metodología, mejor aparecerás ante clientes que buscan lo que ofreces.";
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
  updateGoalOptions();
}

function clearSignupCredentials() {
  if (signupPasswordInput) signupPasswordInput.value = "";
  if (signupPasswordConfirmInput) signupPasswordConfirmInput.value = "";
}

async function ensureAccountBeforeSaving() {
  if (isRemoteMode()) return true;

  const email = profile.email.trim();
  const password = signupPasswordInput?.value || "";
  const confirmation = signupPasswordConfirmInput?.value || "";

  if (!email) {
    roleHelp.querySelector("strong").textContent = "Falta el email";
    roleHelp.querySelector("span").textContent = "Introduce el email de cuenta para crear tu acceso antes de guardar el perfil.";
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

  const email = authEmailInput.value.trim();
  const password = authPasswordInput.value;

  if (!email || !password) {
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

function renderProfileHome() {
  const isReady = hasSavedProfile();
  const state = dataProvider.getAuthState?.() || {};
  const isConnected = Boolean(state.isRemote);

  if (accountWelcomeCard) accountWelcomeCard.hidden = isReady;
  if (profileHomeCard) profileHomeCard.hidden = !isReady;
  if (accountWorkspace) accountWorkspace.hidden = !isReady;
  if (accountProgressCard) accountProgressCard.hidden = !isReady;
  if (accountActivityCard) accountActivityCard.hidden = !isReady;

  if (!isReady) {
    if (accountAsideLabel) accountAsideLabel.textContent = isConnected ? "Perfil pendiente" : "Cuenta Fit Match";
    if (accountAsideTitle) accountAsideTitle.textContent = isConnected ? "Completa tu perfil" : "Bienvenido a Fit Match";
    if (accountAsideCopy) accountAsideCopy.textContent = isConnected
      ? "Tu cuenta ya está activa. Completa el perfil para desbloquear matches, contactos y recomendaciones."
      : "Inicia sesión para acceder a tus matches, contactos y perfil.";
    return;
  }

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
    profileHomeSummary.textContent = `${roleText} · ${cityText} · ${primaryValue}. Tu punto de entrada para avanzar con menos ruido.`;
  }
  if (accountEmailValue) accountEmailValue.textContent = emailText;
  if (accountRoleValue) accountRoleValue.textContent = roleText;
  if (accountCityValue) accountCityValue.textContent = cityText;
  if (accountGoalValue) accountGoalValue.textContent = primaryValue;
  if (accountStatusValue) accountStatusValue.textContent = statusText;
  if (accountCompletionValue) accountCompletionValue.textContent = `${completion.percent}% completo`;
  if (profileHomeMatches) profileHomeMatches.textContent = String(matchCount);
  if (profileHomeContacts) profileHomeContacts.textContent = String(activeRequests.length);
  if (profileHomeMessages) profileHomeMessages.textContent = String(allRequests.length);
  if (profileHomeAffinity) profileHomeAffinity.textContent = averageAffinity;
  if (accountContextScore) accountContextScore.textContent = `${completion.percent}%`;
  if (accountContextTitle) accountContextTitle.textContent = completion.percent >= 85 ? "Rendimiento excelente" : "Rendimiento en construcción";
  if (accountContextCopy) accountContextCopy.textContent = ownRatingSummary.count
    ? `Tu perfil público ya muestra ${ratingText(ownRatingSummary)}. Las valoraciones refuerzan la confianza antes del contacto.`
    : (matchCount
      ? "Tus coincidencias ya tienen señales útiles. Sigue afinando el perfil para mejorar la calidad del contacto."
      : "Completa más señales para activar recomendaciones con mejor encaje.");
  if (accountContextMatches) accountContextMatches.textContent = String(matchCount);
  if (accountContextContacts) accountContextContacts.textContent = String(activeRequests.length);
  if (accountContextMessages) accountContextMessages.textContent = String(allRequests.length);
  if (accountContextDelta) accountContextDelta.textContent = averageAffinity;

  if (accountWorkspaceTitle) accountWorkspaceTitle.textContent = profile.role === "client" ? "Tu búsqueda cliente" : "Tu espacio profesional";
  if (accountWorkspaceCopy) accountWorkspaceCopy.textContent = profile.role === "client"
    ? "Tus preferencias, necesidades y señales principales para encontrar profesionales compatibles."
    : "Tu propuesta, especialidades y señales principales para aparecer ante clientes adecuados.";
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
  profile.email = document.querySelector("#emailInput").value.trim();
  profile.birthdate = document.querySelector("#birthdateInput").value;
  profile.phone = document.querySelector("#phoneInput").value.trim();
  profile.city = document.querySelector("#cityInput").value.trim();
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
  if (!["register", "matches", "contacts"].includes(requestedView)) return requestedView;

  if (requestedView === "register") {
    return currentUser() || hasSavedProfile() ? "register" : "account";
  }

  if (hasSavedProfile()) return requestedView;
  return currentUser() ? "register" : "account";
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
    : "Si ya tienes cuenta, entra para ver clientes compatibles. Si no, crea tu cuenta profesional.";
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
  requestsTitle.textContent = "Entrada de solicitudes";
  requestsCopy.textContent = "Aquí se guardan las solicitudes y propuestas que envías o recibes dentro de Fit Match.";
  modalTitle.textContent = copy.modalTitle;
  sendRequestButton.textContent = copy.sendAction;
  historyTitle.textContent = profile.role === "client" ? "Solicitudes enviadas" : "Propuestas enviadas";

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

function calculateScore(person) {
  let score = 10;

  if ((person.goals || []).includes(profile.goal)) score += 25;
  if ((person.modes || []).includes(profile.mode)) score += 20;
  if ((person.levels || []).includes(profile.level)) score += 15;
  if (person.city && profile.city && person.city.toLowerCase() === profile.city.toLowerCase()) score += 10;

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
  if (person.city && profile.city && person.city.toLowerCase() === profile.city.toLowerCase()) reasons.push("Misma ciudad");
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

function sortedMatches() {
  return activeDirectory()
    .map((person) => ({
      ...person,
      score: calculateScore(person)
    }))
    .sort((a, b) => {
      if (sortInput.value === "price") return (a.price || 99999) - (b.price || 99999);
      if (sortInput.value === "recent") return new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt);
      return b.score - a.score;
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
    resultsSummary.textContent = `No hay ${targetLabel} registrados todavía.`;
    renderEmptyState(
      `Aún no hay ${targetLabel} para comparar`,
      `Para probar el cruce real, cierra sesión, vuelve al inicio y crea una cuenta ${accountLabel} con otro email.`,
      null
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
  requestsTitle.textContent = "Entrada de solicitudes";
  requestsCopy.textContent = "Aquí se guardan las solicitudes y propuestas que envías o recibes dentro de Fit Match.";
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

function renderProfileDetail(person) {
  if (!profileDetail) return;
  const reasons = createElement("ul", "match-reasons");
  renderReasons(reasons, getMatchReasons(person));

  const identity = createElement("div", "profile-detail-section");
  const detailHero = createElement("div", "profile-detail-hero");
  const detailAvatar = createElement("div", "avatar profile-detail-avatar");
  const detailCopy = createElement("div");
  setAvatarContent(detailAvatar, person);
  detailCopy.append(
    createElement("span", "micro-label", "Perfil completo"),
    createElement("strong", "", profileTitle(person)),
    createElement("p", "", person.bio || "Este perfil aún no tiene una descripción amplia.")
  );
  detailHero.append(detailAvatar, detailCopy);
  identity.append(detailHero);

  const detailStats = createElement("div", "stats profile-detail-stats");
  detailStats.append(
    buildStat("Valoración", ratingText(ratingSummaryFor(person))),
    buildStat(person.role === "client" ? "Presupuesto" : "Precio", priceText(person)),
    buildStat("Ciudad", person.city || "Online"),
    buildStat("Modalidad", label("modes", person.mode)),
    buildStat("Nivel", label("levels", person.level)),
    buildStat("Deporte", person.sport || "Por definir"),
    buildStat("Disponibilidad", person.availability || "Por definir")
  );

  const services = createElement("div", "meta");
  renderPills(services, person.services || [], "services");

  const notes = createElement("div", "profile-detail-section muted-section");
  notes.append(
    createElement("span", "micro-label", "Notas de afinidad"),
    createElement("p", "", person.notes || "Sin observaciones adicionales."),
    reasons
  );

  profileDetail.hidden = false;
  profileDetail.replaceChildren(identity, detailStats, services, notes);
}

function openRequestModal(matchId, opener) {
  selectedMatch = activeDirectory().find((person) => person.id === matchId);
  if (!selectedMatch) return;

  modalOpener = opener;
  const copy = currentCopy();
  modalTitle.textContent = selectedMatch.name;
  modalText.textContent = `${calculateScore(selectedMatch)}% de afinidad. Revisa el perfil completo antes de preparar el contacto.`;
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
    renderRequestHistory();
  } catch (error) {
    // Si la política remota no permite marcar leído todavía, mantenemos la lectura visual sin romper la bandeja.
  }
}


function ratingTargetForRequest(request, direction) {
  return direction === "incoming" ? request.sender : request.recipient;
}

function buildRatingPanel(request, direction) {
  const target = ratingTargetForRequest(request, direction);
  const existing = dataProvider.getRatingForRequest?.(request.id, profile.id || currentUser()?.id || "local", target.id);
  const targetRole = target.role || oppositeRole(profile.role);
  const criteria = RATING_CRITERIA[targetRole] || RATING_CRITERIA.professional;
  const panel = createElement("div", "rating-panel");
  const heading = createElement("div", "rating-heading");
  const title = createElement("strong", "", existing ? "Valoración enviada" : `Valorar ${targetRole === "professional" ? "profesional" : "cliente"}`);
  const copy = createElement("p", "", existing
    ? `Tu puntuación para ${target.name}: ${existing.averageScore}/5.`
    : "Puntúa esta conexión en cinco aspectos. El resumen se mostrará en el perfil público.");
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

  const comment = document.createElement("textarea");
  comment.className = "rating-comment";
  comment.rows = 2;
  comment.placeholder = "Comentario privado opcional para recordar esta valoración.";
  comment.value = existing?.comment || "";
  comment.dataset.ratingComment = request.id;

  const actions = createElement("div", "rating-actions");
  const button = createElement("button", "button secondary rating-save-button", existing ? "Actualizar valoración" : "Guardar valoración");
  button.type = "button";
  button.dataset.saveRating = request.id;
  button.dataset.ratingDirection = direction;
  button.dataset.ratingTarget = target.id;
  actions.append(button);
  panel.append(comment, actions);
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
  const target = ratingTargetForRequest(request, direction);
  const panel = button.closest(".rating-panel");
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

  button.disabled = true;
  button.textContent = "Guardando...";
  try {
    await dataProvider.saveRating?.({
      requestId,
      raterId: profile.id || currentUser()?.id || "local",
      raterRole: profile.role,
      target,
      targetRole: target.role || oppositeRole(profile.role),
      criteria,
      comment: panel.querySelector("[data-rating-comment]")?.value.trim() || ""
    });
    await dataProvider.refreshRemoteData?.();
    requestBox.className = "request-box request-success";
    requestBox.replaceChildren(
      createElement("span", "success-kicker", "Valoración guardada"),
      createElement("strong", "", `Has valorado a ${target.name}`),
      createElement("p", "", "La puntuación ya se suma al perfil público de esa cuenta.")
    );
    renderRequestHistory();
    refreshMatches();
    updateProfileStatus();
  } catch (error) {
    panel.classList.add("rating-panel-warning");
    panel.querySelector(".rating-heading p").textContent = error.message || "No se pudo guardar la valoración.";
  } finally {
    button.disabled = false;
    button.textContent = "Guardar valoración";
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
  const message = createElement("p", "history-message", request.message);
  body.append(message, buildRatingPanel(request, direction));

  if (direction === "incoming") {
    body.append(
      buildContactActions(request),
      buildReplyComposer(request),
      createElement("p", "history-note", "Puedes responder dentro de Fit Match o usar email/teléfono si están disponibles.")
    );
    card.addEventListener("toggle", () => {
      if (card.open) markIncomingRequestAsRead(request.id);
    });
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

function buildRequestSection({ title, kicker, requests, emptyTitle, emptyText, direction }) {
  const section = createElement("section", `request-lane request-lane-${direction}`);
  const heading = createElement("div", "request-lane-heading");
  const headingText = createElement("div");
  headingText.append(
    createElement("span", "micro-label", kicker),
    createElement("strong", "", title)
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

  requests.forEach((request) => section.append(buildRequestCard(request, direction)));
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
  updateRequestDeleteButton(visibleRequestIds.length);
  historyTitle.textContent = unreadRequests ? `Entrada · ${unreadRequests} nuevo${unreadRequests === 1 ? "" : "s"}` : "Entrada y enviadas";

  requestList.append(
    buildRequestSection({
      title: incomingRequests.length ? `${incomingRequests.length} recibida${incomingRequests.length === 1 ? "" : "s"}` : "Bandeja de entrada",
      kicker: unreadRequests ? `${unreadRequests} nuevo${unreadRequests === 1 ? "" : "s"}` : "Entrada",
      requests: incomingRequests,
      emptyTitle: "Sin solicitudes recibidas todavía",
      emptyText: profile.role === "client"
        ? "Cuando un profesional te envíe una propuesta, aparecerá aquí."
        : "Cuando un cliente solicite contacto, aparecerá aquí para que puedas leerlo.",
      direction: "incoming"
    }),
    buildRequestSection({
      title: sentRequests.length ? `${sentRequests.length} enviada${sentRequests.length === 1 ? "" : "s"}` : "Enviadas",
      kicker: "Salida",
      requests: sentRequests,
      emptyTitle: profile.role === "client" ? "Sin solicitudes enviadas" : "Sin propuestas enviadas",
      emptyText: "Cuando prepares una desde Matches, quedará aquí como comprobante.",
      direction: "outgoing"
    })
  );

  updateRequestDeleteButton(visibleRequestIds.length);
  updateProfileStatus();
}

authForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  handleAuth("signin");
});

reviewToggle?.addEventListener("click", () => {
  const nextMode = !document.body.classList.contains("review-mode");
  window.localStorage.setItem(REVIEW_MODE_KEY, String(nextMode));
  setReviewMode(nextMode);
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
    ? "eliminar tu perfil, datos privados y solicitudes asociadas en Supabase"
    : "eliminar tu perfil guardado en este navegador";
  const confirmed = window.confirm(`¿Quieres ${targetText}?`);
  if (!confirmed) return;
  try {
    await dataProvider.clearProfiles(profile.role);
    if (wasRemote) {
      await dataProvider.signOut();
      resetProfileState(profile.role);
      updateAuthPanel("Perfil y datos de Fit Match eliminados de Supabase. Sesión cerrada.");
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

requestList?.addEventListener("click", (event) => {
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
});

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

modal.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
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
  } finally {
    acceptLegalTermsButton.textContent = "Aceptar y continuar";
    updateLegalAcceptState();
  }
});

document.addEventListener("keydown", (event) => {
  const legalModalIsOpen = legalModal && !legalModal.classList.contains("hidden");
  const modalIsOpen = !modal.classList.contains("hidden") || legalModalIsOpen;

  if (event.key === "Escape" && !legalModalIsOpen && !modal.classList.contains("hidden")) {
    closeModal();
  }

  if (event.key !== "Tab" || !modalIsOpen) return;

  const activeModal = legalModalIsOpen ? legalModal : modal;
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
  initReviewMode();
  clearAuthInputs();
  window.setTimeout(clearAuthInputs, 120);
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

  updateAuthPanel();
  maybePromptLegalConsent();
  const initialView = window.location.hash || (currentUser() ? "account" : "home");
  showView(initialView, { push: false, focus: false });
}

startApp();
