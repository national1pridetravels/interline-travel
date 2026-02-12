import {
  FEATURE_ICON_OPTIONS,
  TRIP_THEME_OPTIONS,
  deleteFeature,
  deleteTestimonial,
  deleteTrip,
  exportState,
  getSession,
  getState,
  importState,
  isCurrentUserAdmin,
  isRemoteEnabled,
  onAuthStateChange,
  resetState,
  signIn,
  signOut,
  signUp,
  subscribeState,
  tryBootstrapCurrentUserAsAdmin,
  updateHeroContent,
  upsertFeature,
  upsertTestimonial,
  upsertTrip,
} from "./data-store.js";

const ICON_LABELS = {
  price: "Price",
  technology: "Technology",
  support: "Support",
  finance: "Finance",
  globe: "Globe",
  ticket: "Ticket",
};

const THEME_LABELS = {
  coastal: "Coastal Blue",
  alpine: "Alpine Sky",
  desert: "Desert Glow",
  city: "City Sunset",
  island: "Island Aqua",
  heritage: "Heritage Gold",
};

const elements = {
  backendMode: document.getElementById("backend-mode"),
  authPanel: document.getElementById("auth-panel"),
  authForm: document.getElementById("auth-form"),
  authEmail: document.getElementById("auth-email"),
  authPassword: document.getElementById("auth-password"),
  authSignIn: document.getElementById("auth-signin"),
  authSignUp: document.getElementById("auth-signup"),
  authSignOut: document.getElementById("auth-signout"),
  authStatus: document.getElementById("auth-status"),
  workspace: document.getElementById("admin-workspace"),
  statTrips: document.getElementById("stat-trips"),
  statTestimonials: document.getElementById("stat-testimonials"),
  statFeatures: document.getElementById("stat-features"),
  message: document.getElementById("admin-message"),
  heroForm: document.getElementById("hero-form"),
  heroTitle: document.getElementById("hero-title-input"),
  heroSubtitle: document.getElementById("hero-subtitle-input"),
  testimonialForm: document.getElementById("testimonial-form"),
  testimonialId: document.getElementById("testimonial-id"),
  testimonialQuote: document.getElementById("testimonial-quote"),
  testimonialName: document.getElementById("testimonial-name"),
  testimonialHandle: document.getElementById("testimonial-handle"),
  testimonialTone: document.getElementById("testimonial-tone"),
  testimonialClear: document.getElementById("testimonial-clear"),
  testimonialList: document.getElementById("testimonial-list"),
  featureForm: document.getElementById("feature-form"),
  featureId: document.getElementById("feature-id"),
  featureTitle: document.getElementById("feature-title"),
  featureDescription: document.getElementById("feature-description"),
  featureIcon: document.getElementById("feature-icon"),
  featureClear: document.getElementById("feature-clear"),
  featureList: document.getElementById("feature-list"),
  tripForm: document.getElementById("trip-form"),
  tripId: document.getElementById("trip-id"),
  tripTitle: document.getElementById("trip-title"),
  tripDestination: document.getElementById("trip-destination"),
  tripDuration: document.getElementById("trip-duration"),
  tripPrice: document.getElementById("trip-price"),
  tripRating: document.getElementById("trip-rating"),
  tripSeats: document.getElementById("trip-seats"),
  tripDeparture: document.getElementById("trip-departure"),
  tripTheme: document.getElementById("trip-theme"),
  tripSummary: document.getElementById("trip-summary"),
  tripTags: document.getElementById("trip-tags"),
  tripFeatured: document.getElementById("trip-featured"),
  tripClear: document.getElementById("trip-clear"),
  tripList: document.getElementById("trip-list"),
  exportData: document.getElementById("export-data"),
  importData: document.getElementById("import-data"),
  resetData: document.getElementById("reset-data"),
  dataJson: document.getElementById("data-json"),
};

let stateCache = null;
let canEdit = false;
let messageTimeoutId = null;
let revealObserver;
let authUnsubscribe = null;

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Unknown";
  }
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function setMessage(text, type = "success") {
  elements.message.textContent = text;
  elements.message.dataset.type = type;

  if (messageTimeoutId) {
    clearTimeout(messageTimeoutId);
  }

  messageTimeoutId = window.setTimeout(() => {
    elements.message.textContent = "";
    elements.message.dataset.type = "";
    messageTimeoutId = null;
  }, 3200);
}

function setAuthStatus(text, type = "info") {
  elements.authStatus.textContent = text;
  elements.authStatus.dataset.type = type;
}

function initRevealObserver() {
  if (revealObserver) {
    return;
  }

  revealObserver = new IntersectionObserver(
    (entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) {
          continue;
        }
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -8% 0px",
    }
  );
}

function observeRevealElements() {
  initRevealObserver();
  const revealElements = document.querySelectorAll(".reveal");
  for (const element of revealElements) {
    if (element.dataset.revealObserved === "1") {
      continue;
    }
    element.dataset.revealObserved = "1";
    revealObserver.observe(element);
  }
}

function populateSelectOptions() {
  elements.featureIcon.innerHTML = FEATURE_ICON_OPTIONS.map(
    (icon) => `<option value="${icon}">${ICON_LABELS[icon] || icon}</option>`
  ).join("");
  elements.tripTheme.innerHTML = TRIP_THEME_OPTIONS.map(
    (theme) => `<option value="${theme}">${THEME_LABELS[theme] || theme}</option>`
  ).join("");
}

function clearTestimonialForm() {
  elements.testimonialId.value = "";
  elements.testimonialQuote.value = "";
  elements.testimonialName.value = "";
  elements.testimonialHandle.value = "";
  elements.testimonialTone.value = "tone-a";
}

function clearFeatureForm() {
  elements.featureId.value = "";
  elements.featureTitle.value = "";
  elements.featureDescription.value = "";
  elements.featureIcon.value = FEATURE_ICON_OPTIONS[0];
}

function clearTripForm() {
  elements.tripId.value = "";
  elements.tripTitle.value = "";
  elements.tripDestination.value = "";
  elements.tripDuration.value = "";
  elements.tripPrice.value = "";
  elements.tripRating.value = "";
  elements.tripSeats.value = "";
  elements.tripDeparture.value = "";
  elements.tripTheme.value = TRIP_THEME_OPTIONS[0];
  elements.tripSummary.value = "";
  elements.tripTags.value = "";
  elements.tripFeatured.checked = false;
}

function renderStats(state) {
  elements.statTrips.textContent = String(state.catalog.length);
  elements.statTestimonials.textContent = String(state.testimonials.length);
  elements.statFeatures.textContent = String(state.features.length);
}

function renderHeroForm(state) {
  elements.heroTitle.value = state.hero.title;
  elements.heroSubtitle.value = state.hero.subtitle;
}

function renderTestimonials(state) {
  if (!state.testimonials.length) {
    elements.testimonialList.innerHTML = '<p class="empty-line">No testimonials yet.</p>';
    return;
  }

  elements.testimonialList.innerHTML = state.testimonials
    .map(
      (testimonial) => `
      <article class="entity-item">
        <div>
          <h3>${escapeHTML(testimonial.name)} <span>${escapeHTML(testimonial.handle)}</span></h3>
          <p>${escapeHTML(testimonial.quote)}</p>
        </div>
        <div class="row-actions">
          <button type="button" data-type="testimonial" data-action="edit" data-id="${escapeHTML(testimonial.id)}">Edit</button>
          <button type="button" class="btn-danger" data-type="testimonial" data-action="delete" data-id="${escapeHTML(
            testimonial.id
          )}">Delete</button>
        </div>
      </article>
    `
    )
    .join("");
}

function renderFeatures(state) {
  if (!state.features.length) {
    elements.featureList.innerHTML = '<p class="empty-line">No features yet.</p>';
    return;
  }

  elements.featureList.innerHTML = state.features
    .map(
      (feature) => `
      <article class="entity-item">
        <div>
          <h3>${escapeHTML(feature.title)} <span>${escapeHTML(ICON_LABELS[feature.icon] || feature.icon)}</span></h3>
          <p>${escapeHTML(feature.description)}</p>
        </div>
        <div class="row-actions">
          <button type="button" data-type="feature" data-action="edit" data-id="${escapeHTML(feature.id)}">Edit</button>
          <button type="button" class="btn-danger" data-type="feature" data-action="delete" data-id="${escapeHTML(
            feature.id
          )}">Delete</button>
        </div>
      </article>
    `
    )
    .join("");
}

function renderTrips(state) {
  if (!state.catalog.length) {
    elements.tripList.innerHTML = '<p class="empty-line">No trips yet.</p>';
    return;
  }

  elements.tripList.innerHTML = state.catalog
    .map(
      (trip) => `
      <article class="trip-row">
        <div>
          <h3>${escapeHTML(trip.title)} <span>${escapeHTML(trip.destination)}</span></h3>
          <p>${escapeHTML(trip.summary)}</p>
          <small>${escapeHTML(trip.duration)} · ${escapeHTML(formatDate(trip.departure))} · ${
            trip.seats
          } seats · ${trip.rating.toFixed(1)} stars · ${escapeHTML(formatCurrency(trip.price))}</small>
        </div>
        <div class="row-actions">
          <button type="button" data-type="trip" data-action="edit" data-id="${escapeHTML(trip.id)}">Edit</button>
          <button type="button" class="btn-danger" data-type="trip" data-action="delete" data-id="${escapeHTML(
            trip.id
          )}">Delete</button>
        </div>
      </article>
    `
    )
    .join("");
}

function renderAll(state) {
  renderStats(state);
  renderHeroForm(state);
  renderTestimonials(state);
  renderFeatures(state);
  renderTrips(state);
  observeRevealElements();
}

function editEntity(type, id) {
  if (!stateCache) {
    return;
  }

  if (type === "testimonial") {
    const item = stateCache.testimonials.find((entry) => entry.id === id);
    if (!item) {
      return;
    }
    elements.testimonialId.value = item.id;
    elements.testimonialQuote.value = item.quote;
    elements.testimonialName.value = item.name;
    elements.testimonialHandle.value = item.handle;
    elements.testimonialTone.value = item.tone;
    elements.testimonialQuote.focus();
    return;
  }

  if (type === "feature") {
    const item = stateCache.features.find((entry) => entry.id === id);
    if (!item) {
      return;
    }
    elements.featureId.value = item.id;
    elements.featureTitle.value = item.title;
    elements.featureDescription.value = item.description;
    elements.featureIcon.value = item.icon;
    elements.featureTitle.focus();
    return;
  }

  if (type === "trip") {
    const item = stateCache.catalog.find((entry) => entry.id === id);
    if (!item) {
      return;
    }
    elements.tripId.value = item.id;
    elements.tripTitle.value = item.title;
    elements.tripDestination.value = item.destination;
    elements.tripDuration.value = item.duration;
    elements.tripPrice.value = String(item.price);
    elements.tripRating.value = String(item.rating);
    elements.tripSeats.value = String(item.seats);
    elements.tripDeparture.value = item.departure;
    elements.tripTheme.value = item.theme;
    elements.tripSummary.value = item.summary;
    elements.tripTags.value = (item.tags || []).join(", ");
    elements.tripFeatured.checked = Boolean(item.featured);
    elements.tripTitle.focus();
  }
}

async function deleteEntity(type, id) {
  if (type === "testimonial") {
    stateCache = await deleteTestimonial(id);
    renderAll(stateCache);
    setMessage("Testimonial deleted.");
    return;
  }
  if (type === "feature") {
    stateCache = await deleteFeature(id);
    renderAll(stateCache);
    setMessage("Feature deleted.");
    return;
  }
  if (type === "trip") {
    stateCache = await deleteTrip(id);
    renderAll(stateCache);
    setMessage("Trip deleted.");
  }
}

function lockWorkspace(reason) {
  canEdit = false;
  elements.workspace.hidden = true;
  setAuthStatus(reason, "warning");
}

function unlockWorkspace(statusText) {
  canEdit = true;
  elements.workspace.hidden = false;
  setAuthStatus(statusText, "success");
}

async function refreshStateAndRender() {
  stateCache = await getState();
  renderAll(stateCache);
}

async function resolveAccess(session) {
  if (!isRemoteEnabled()) {
    elements.backendMode.textContent = "Local mode active. For production, add Supabase values in config.js.";
    elements.authEmail.disabled = true;
    elements.authPassword.disabled = true;
    elements.authSignIn.disabled = true;
    elements.authSignUp.disabled = true;
    elements.authSignOut.disabled = true;
    unlockWorkspace("Local mode enabled. No authentication is required.");
    await refreshStateAndRender();
    return;
  }

  elements.backendMode.textContent = "Supabase backend mode enabled. Sign in with an admin account.";
  elements.authEmail.disabled = false;
  elements.authPassword.disabled = false;
  elements.authSignIn.disabled = false;
  elements.authSignUp.disabled = false;
  elements.authSignOut.disabled = false;

  if (!session) {
    lockWorkspace("Sign in to access admin actions.");
    return;
  }

  let isAdmin = false;
  try {
    isAdmin = await isCurrentUserAdmin();
    if (!isAdmin) {
      await tryBootstrapCurrentUserAsAdmin();
      isAdmin = await isCurrentUserAdmin();
    }
  } catch (error) {
    console.error(error);
    lockWorkspace("Could not verify admin role. Check database setup.");
    return;
  }

  if (!isAdmin) {
    lockWorkspace(`Signed in as ${session.user.email}, but no admin role is assigned.`);
    return;
  }

  unlockWorkspace(`Signed in as ${session.user.email}. Admin access granted.`);
  await refreshStateAndRender();
}

async function handleAuthAction(action) {
  const email = elements.authEmail.value.trim();
  const password = elements.authPassword.value.trim();

  try {
    if (action === "signin") {
      if (!email || !password) {
        setAuthStatus("Enter both email and password.", "warning");
        return;
      }
      await signIn(email, password);
      setAuthStatus("Sign in successful.", "success");
      return;
    }

    if (action === "signup") {
      if (!email || !password) {
        setAuthStatus("Enter both email and password.", "warning");
        return;
      }
      await signUp(email, password);
      setAuthStatus("Account created. If email confirmation is enabled, verify your inbox.", "success");
      return;
    }

    if (action === "signout") {
      await signOut();
      setAuthStatus("Signed out.", "info");
    }
  } catch (error) {
    setAuthStatus(error.message || "Authentication failed.", "error");
  }
}

function bindAuthActions() {
  elements.authSignIn.addEventListener("click", () => handleAuthAction("signin"));
  elements.authSignUp.addEventListener("click", () => handleAuthAction("signup"));
  elements.authSignOut.addEventListener("click", () => handleAuthAction("signout"));

  elements.authForm.addEventListener("submit", (event) => {
    event.preventDefault();
    handleAuthAction("signin");
  });
}

function bindFormActions() {
  elements.heroForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!canEdit) {
      setMessage("You need admin access to save changes.", "error");
      return;
    }
    try {
      stateCache = await updateHeroContent({
        title: elements.heroTitle.value,
        subtitle: elements.heroSubtitle.value,
      });
      renderAll(stateCache);
      setMessage("Hero content saved.");
    } catch (error) {
      setMessage(error.message || "Failed to save hero content.", "error");
    }
  });

  elements.testimonialForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!canEdit) {
      setMessage("You need admin access to save changes.", "error");
      return;
    }
    try {
      stateCache = await upsertTestimonial({
        id: elements.testimonialId.value || undefined,
        quote: elements.testimonialQuote.value,
        name: elements.testimonialName.value,
        handle: elements.testimonialHandle.value,
        tone: elements.testimonialTone.value,
      });
      clearTestimonialForm();
      renderAll(stateCache);
      setMessage("Testimonial saved.");
    } catch (error) {
      setMessage(error.message || "Failed to save testimonial.", "error");
    }
  });

  elements.featureForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!canEdit) {
      setMessage("You need admin access to save changes.", "error");
      return;
    }
    try {
      stateCache = await upsertFeature({
        id: elements.featureId.value || undefined,
        title: elements.featureTitle.value,
        description: elements.featureDescription.value,
        icon: elements.featureIcon.value,
      });
      clearFeatureForm();
      renderAll(stateCache);
      setMessage("Feature saved.");
    } catch (error) {
      setMessage(error.message || "Failed to save feature.", "error");
    }
  });

  elements.tripForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!canEdit) {
      setMessage("You need admin access to save changes.", "error");
      return;
    }
    try {
      stateCache = await upsertTrip({
        id: elements.tripId.value || undefined,
        title: elements.tripTitle.value,
        destination: elements.tripDestination.value,
        duration: elements.tripDuration.value,
        price: Number(elements.tripPrice.value),
        rating: Number(elements.tripRating.value),
        seats: Number(elements.tripSeats.value),
        departure: elements.tripDeparture.value,
        theme: elements.tripTheme.value,
        summary: elements.tripSummary.value,
        tags: elements.tripTags.value,
        featured: elements.tripFeatured.checked,
      });
      clearTripForm();
      renderAll(stateCache);
      setMessage("Trip saved.");
    } catch (error) {
      setMessage(error.message || "Failed to save trip.", "error");
    }
  });

  elements.testimonialClear.addEventListener("click", clearTestimonialForm);
  elements.featureClear.addEventListener("click", clearFeatureForm);
  elements.tripClear.addEventListener("click", clearTripForm);
}

function bindListActions() {
  document.body.addEventListener("click", async (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    const button = target.closest("button[data-type][data-action][data-id]");
    if (!button) {
      return;
    }

    if (!canEdit) {
      setMessage("You need admin access to perform this action.", "error");
      return;
    }

    const type = button.dataset.type;
    const action = button.dataset.action;
    const id = button.dataset.id;
    if (!type || !action || !id) {
      return;
    }

    if (action === "edit") {
      editEntity(type, id);
      return;
    }

    if (action === "delete") {
      const shouldDelete = window.confirm("Delete this item?");
      if (!shouldDelete) {
        return;
      }
      try {
        await deleteEntity(type, id);
      } catch (error) {
        setMessage(error.message || "Delete failed.", "error");
      }
    }
  });
}

function bindDataTools() {
  elements.exportData.addEventListener("click", async () => {
    try {
      const payload = await exportState();
      elements.dataJson.value = payload;
      try {
        await navigator.clipboard.writeText(payload);
        setMessage("JSON exported and copied to clipboard.");
      } catch {
        setMessage("JSON exported.");
      }
    } catch (error) {
      setMessage(error.message || "Export failed.", "error");
    }
  });

  elements.importData.addEventListener("click", async () => {
    if (!canEdit) {
      setMessage("You need admin access to import data.", "error");
      return;
    }
    try {
      stateCache = await importState(elements.dataJson.value);
      clearFeatureForm();
      clearTestimonialForm();
      clearTripForm();
      renderAll(stateCache);
      setMessage("JSON imported successfully.");
    } catch (error) {
      setMessage(`Import failed: ${error.message}`, "error");
    }
  });

  elements.resetData.addEventListener("click", async () => {
    if (!canEdit) {
      setMessage("You need admin access to reset data.", "error");
      return;
    }
    const confirmed = window.confirm("Reset all content to defaults?");
    if (!confirmed) {
      return;
    }

    try {
      stateCache = await resetState();
      clearFeatureForm();
      clearTestimonialForm();
      clearTripForm();
      elements.dataJson.value = "";
      renderAll(stateCache);
      setMessage("Default content restored.");
    } catch (error) {
      setMessage(error.message || "Reset failed.", "error");
    }
  });
}

function bindStateSubscription() {
  subscribeState((nextState) => {
    stateCache = nextState;
    if (canEdit) {
      renderAll(nextState);
    }
  });
}

async function initialize() {
  populateSelectOptions();
  bindAuthActions();
  bindFormActions();
  bindListActions();
  bindDataTools();
  bindStateSubscription();
  observeRevealElements();

  if (authUnsubscribe) {
    authUnsubscribe();
  }
  authUnsubscribe = onAuthStateChange((session) => {
    resolveAccess(session).catch((error) => {
      console.error(error);
      lockWorkspace("Unable to initialize admin access.");
    });
  });

  const session = await getSession();
  await resolveAccess(session);
}

initialize().catch((error) => {
  console.error(error);
  lockWorkspace("Initialization failed. Check console for details.");
});
