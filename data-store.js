import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./config.js";

const STORAGE_KEY = "interline-travel-state-v1";
const UPDATE_EVENT = "interline-travel-state-updated";

export const FEATURE_ICON_OPTIONS = ["price", "technology", "support", "finance", "globe", "ticket"];
export const TRIP_THEME_OPTIONS = ["coastal", "alpine", "desert", "city", "island", "heritage"];
export const AVATAR_TONE_OPTIONS = ["tone-a", "tone-b", "tone-c"];

const DEFAULT_STATE = {
  hero: {
    title: "WELCOME TO INTERLINE TRAVEL",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  },
  testimonials: [
    {
      id: "testimonial_john",
      quote: "sea odio sit amet nibh vulputate",
      name: "John Doe",
      handle: "@fbbhfgn",
      tone: "tone-a",
      sortOrder: 1,
    },
    {
      id: "testimonial_anna",
      quote: "sea odio sit amet nibh vulputate",
      name: "Anna Doe",
      handle: "@fbbhfgn",
      tone: "tone-b",
      sortOrder: 2,
    },
    {
      id: "testimonial_jude",
      quote: "sea odio sit amet nibh vulputate",
      name: "Jude Doe",
      handle: "@fbbhfgn",
      tone: "tone-c",
      sortOrder: 3,
    },
  ],
  features: [
    {
      id: "feature_price",
      title: "ROCK BOTTOM PRICES",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pulvinar lectus tortor.",
      icon: "price",
      sortOrder: 1,
    },
    {
      id: "feature_tech",
      title: "TECHNOLOGY",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pulvinar lectus tortor.",
      icon: "technology",
      sortOrder: 2,
    },
    {
      id: "feature_support",
      title: "SELLAR SUPPORT",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pulvinar lectus tortor.",
      icon: "support",
      sortOrder: 3,
    },
    {
      id: "feature_finance",
      title: "FINANCE",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pulvinar lectus tortor.",
      icon: "finance",
      sortOrder: 4,
    },
  ],
  catalog: [
    {
      id: "trip_paris",
      title: "Paris Spring Escape",
      destination: "France",
      duration: "5 Days / 4 Nights",
      price: 1299,
      rating: 4.8,
      seats: 12,
      departure: "2026-04-14",
      summary: "Boutique hotel stay, Seine river cruise, and curated food walks in hidden neighborhoods.",
      tags: ["City Break", "Couples"],
      theme: "city",
      featured: true,
      sortOrder: 1,
    },
    {
      id: "trip_bali",
      title: "Bali Coastal Retreat",
      destination: "Indonesia",
      duration: "6 Days / 5 Nights",
      price: 1599,
      rating: 4.9,
      seats: 10,
      departure: "2026-05-05",
      summary: "Beachfront resort, temple trail, sunset dinner cruise, and private airport transfers.",
      tags: ["Beach", "Relax"],
      theme: "island",
      featured: true,
      sortOrder: 2,
    },
    {
      id: "trip_zermatt",
      title: "Alpine Explorer",
      destination: "Switzerland",
      duration: "7 Days / 6 Nights",
      price: 2240,
      rating: 4.7,
      seats: 8,
      departure: "2026-06-11",
      summary: "Scenic rail passes, glacier viewpoints, mountain chalets, and guided hiking routes.",
      tags: ["Adventure", "Scenic"],
      theme: "alpine",
      featured: false,
      sortOrder: 3,
    },
    {
      id: "trip_dubai",
      title: "Dubai Luxe Weekend",
      destination: "UAE",
      duration: "4 Days / 3 Nights",
      price: 980,
      rating: 4.5,
      seats: 16,
      departure: "2026-03-23",
      summary: "Downtown stay, desert safari, marina night cruise, and premium city transport included.",
      tags: ["Luxury", "Short Trip"],
      theme: "desert",
      featured: false,
      sortOrder: 4,
    },
    {
      id: "trip_kyoto",
      title: "Kyoto Heritage Journey",
      destination: "Japan",
      duration: "8 Days / 7 Nights",
      price: 1990,
      rating: 4.9,
      seats: 9,
      departure: "2026-04-30",
      summary: "Temple district walking tours, ryokan stays, tea ceremony access, and local rail cards.",
      tags: ["Culture", "History"],
      theme: "heritage",
      featured: true,
      sortOrder: 5,
    },
    {
      id: "trip_maldives",
      title: "Maldives Island Hopper",
      destination: "Maldives",
      duration: "5 Days / 4 Nights",
      price: 2699,
      rating: 4.9,
      seats: 6,
      departure: "2026-07-19",
      summary: "Water villa stay, snorkeling charter, wellness treatments, and private speedboat transfers.",
      tags: ["Honeymoon", "Premium"],
      theme: "coastal",
      featured: false,
      sortOrder: 6,
    },
  ],
};

const remoteEnabled = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
const supabase = remoteEnabled
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
    })
  : null;

let stateCache = clone(DEFAULT_STATE);

function clone(value) {
  if (typeof structuredClone === "function") {
    return structuredClone(value);
  }
  return JSON.parse(JSON.stringify(value));
}

function asString(value, fallback = "") {
  if (typeof value !== "string") {
    return fallback;
  }
  return value.trim();
}

function asNumber(value, fallback = 0) {
  const parsed = Number(value);
  if (Number.isFinite(parsed)) {
    return parsed;
  }
  return fallback;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function makeId(prefix) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

function normalizeTags(value) {
  if (Array.isArray(value)) {
    return value
      .map((item) => asString(item))
      .filter(Boolean)
      .slice(0, 6);
  }
  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
      .slice(0, 6);
  }
  return [];
}

function normalizeHero(value) {
  const fallback = DEFAULT_STATE.hero;
  return {
    title: asString(value?.title, fallback.title) || fallback.title,
    subtitle: asString(value?.subtitle, fallback.subtitle) || fallback.subtitle,
  };
}

function normalizeTestimonial(value, index = 0) {
  const fallback = DEFAULT_STATE.testimonials[index % DEFAULT_STATE.testimonials.length];
  const tone = AVATAR_TONE_OPTIONS.includes(value?.tone) ? value.tone : fallback.tone;
  const sortOrder = Number.isFinite(Number(value?.sortOrder))
    ? Number(value.sortOrder)
    : Number.isFinite(Number(value?.sort_order))
      ? Number(value.sort_order)
      : fallback.sortOrder ?? index + 1;
  return {
    id: asString(value?.id) || makeId("testimonial"),
    quote: asString(value?.quote, fallback.quote) || fallback.quote,
    name: asString(value?.name, fallback.name) || fallback.name,
    handle: asString(value?.handle, fallback.handle) || fallback.handle,
    tone,
    sortOrder,
  };
}

function normalizeFeature(value, index = 0) {
  const fallback = DEFAULT_STATE.features[index % DEFAULT_STATE.features.length];
  const icon = FEATURE_ICON_OPTIONS.includes(value?.icon) ? value.icon : fallback.icon;
  const sortOrder = Number.isFinite(Number(value?.sortOrder))
    ? Number(value.sortOrder)
    : Number.isFinite(Number(value?.sort_order))
      ? Number(value.sort_order)
      : fallback.sortOrder ?? index + 1;
  return {
    id: asString(value?.id) || makeId("feature"),
    title: asString(value?.title, fallback.title) || fallback.title,
    description: asString(value?.description, fallback.description) || fallback.description,
    icon,
    sortOrder,
  };
}

function normalizeTrip(value, index = 0) {
  const fallback = DEFAULT_STATE.catalog[index % DEFAULT_STATE.catalog.length];
  const theme = TRIP_THEME_OPTIONS.includes(value?.theme) ? value.theme : fallback.theme;
  const departureFallback = fallback?.departure || new Date().toISOString().slice(0, 10);
  const sortOrder = Number.isFinite(Number(value?.sortOrder))
    ? Number(value.sortOrder)
    : Number.isFinite(Number(value?.sort_order))
      ? Number(value.sort_order)
      : fallback.sortOrder ?? index + 1;
  return {
    id: asString(value?.id) || makeId("trip"),
    title: asString(value?.title, fallback.title) || fallback.title,
    destination: asString(value?.destination, fallback.destination) || fallback.destination,
    duration: asString(value?.duration, fallback.duration) || fallback.duration,
    price: Math.max(0, asNumber(value?.price, fallback.price)),
    rating: clamp(asNumber(value?.rating, fallback.rating), 0, 5),
    seats: Math.max(0, Math.round(asNumber(value?.seats, fallback.seats))),
    departure: asString(value?.departure, departureFallback) || departureFallback,
    summary: asString(value?.summary, fallback.summary) || fallback.summary,
    tags: normalizeTags(value?.tags?.length ? value.tags : value?.tags ?? fallback.tags),
    theme,
    featured: Boolean(value?.featured),
    sortOrder,
  };
}

function normalizeState(value) {
  const source = value && typeof value === "object" ? value : {};
  const testimonialsInput = Array.isArray(source.testimonials) ? source.testimonials : DEFAULT_STATE.testimonials;
  const featuresInput = Array.isArray(source.features) ? source.features : DEFAULT_STATE.features;
  const catalogInput = Array.isArray(source.catalog) ? source.catalog : DEFAULT_STATE.catalog;

  return {
    hero: normalizeHero(source.hero),
    testimonials: testimonialsInput
      .map((item, index) => normalizeTestimonial(item, index))
      .sort((a, b) => a.sortOrder - b.sortOrder),
    features: featuresInput.map((item, index) => normalizeFeature(item, index)).sort((a, b) => a.sortOrder - b.sortOrder),
    catalog: catalogInput.map((item, index) => normalizeTrip(item, index)).sort((a, b) => a.sortOrder - b.sortOrder),
  };
}

function emitStateUpdate(state) {
  const payload = clone(state);
  stateCache = payload;
  window.dispatchEvent(new CustomEvent(UPDATE_EVENT, { detail: payload }));
}

function readLocalState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return clone(DEFAULT_STATE);
    }
    return normalizeState(JSON.parse(raw));
  } catch (error) {
    console.error("Failed to read local state:", error);
    return clone(DEFAULT_STATE);
  }
}

function writeLocalState(nextState) {
  const normalized = normalizeState(nextState);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
  emitStateUpdate(normalized);
  return normalized;
}

function mutateLocalState(mutator) {
  const draft = readLocalState();
  mutator(draft);
  return writeLocalState(draft);
}

async function readRemoteState() {
  if (!supabase) {
    return readLocalState();
  }

  const [heroResponse, testimonialResponse, featureResponse, tripResponse] = await Promise.all([
    supabase.from("site_content").select("hero_title, hero_subtitle").eq("id", 1).maybeSingle(),
    supabase.from("testimonials").select("*").order("sort_order", { ascending: true }),
    supabase.from("features").select("*").order("sort_order", { ascending: true }),
    supabase.from("trips").select("*").order("sort_order", { ascending: true }),
  ]);

  if (heroResponse.error && heroResponse.error.code !== "PGRST116") {
    throw heroResponse.error;
  }
  if (testimonialResponse.error) {
    throw testimonialResponse.error;
  }
  if (featureResponse.error) {
    throw featureResponse.error;
  }
  if (tripResponse.error) {
    throw tripResponse.error;
  }

  const nextState = normalizeState({
    hero: {
      title: heroResponse.data?.hero_title,
      subtitle: heroResponse.data?.hero_subtitle,
    },
    testimonials: testimonialResponse.data ?? [],
    features: featureResponse.data ?? [],
    catalog: tripResponse.data ?? [],
  });

  emitStateUpdate(nextState);
  return clone(nextState);
}

async function applyRemoteMutation(work) {
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }
  await work();
  return readRemoteState();
}

function nextSortOrder(items) {
  if (!items.length) {
    return 1;
  }
  return Math.max(...items.map((item) => Number(item.sortOrder) || 0)) + 1;
}

export function isRemoteEnabled() {
  return remoteEnabled;
}

export async function getState() {
  if (!supabase) {
    const state = readLocalState();
    emitStateUpdate(state);
    return clone(state);
  }

  try {
    return await readRemoteState();
  } catch (error) {
    console.error("Failed to read Supabase state. Falling back to local data:", error);
    const fallback = readLocalState();
    emitStateUpdate(fallback);
    return clone(fallback);
  }
}

export function subscribeState(listener) {
  const onStorageUpdate = (event) => {
    if (event.key === STORAGE_KEY && !remoteEnabled) {
      listener(readLocalState());
    }
  };
  const onCustomUpdate = (event) => {
    if (event?.detail) {
      listener(clone(event.detail));
    }
  };

  window.addEventListener("storage", onStorageUpdate);
  window.addEventListener(UPDATE_EVENT, onCustomUpdate);

  return () => {
    window.removeEventListener("storage", onStorageUpdate);
    window.removeEventListener(UPDATE_EVENT, onCustomUpdate);
  };
}

export async function updateHeroContent(payload) {
  if (!supabase) {
    return mutateLocalState((state) => {
      state.hero = normalizeHero(payload);
    });
  }

  const hero = normalizeHero(payload);
  return applyRemoteMutation(async () => {
    const { error } = await supabase
      .from("site_content")
      .upsert({ id: 1, hero_title: hero.title, hero_subtitle: hero.subtitle }, { onConflict: "id" });
    if (error) {
      throw error;
    }
  });
}

export async function upsertTestimonial(payload) {
  if (!supabase) {
    return mutateLocalState((state) => {
      const next = normalizeTestimonial({
        ...payload,
        sortOrder: payload?.sortOrder ?? nextSortOrder(state.testimonials),
      });
      const existingIndex = state.testimonials.findIndex((item) => item.id === next.id);
      if (existingIndex >= 0) {
        state.testimonials[existingIndex] = { ...state.testimonials[existingIndex], ...next };
      } else {
        state.testimonials.push(next);
      }
    });
  }

  const sortOrder = Number.isFinite(Number(payload?.sortOrder))
    ? Number(payload.sortOrder)
    : nextSortOrder(stateCache.testimonials);

  const next = normalizeTestimonial({
    ...payload,
    id: payload?.id || makeId("testimonial"),
    sortOrder,
  });

  return applyRemoteMutation(async () => {
    const { error } = await supabase.from("testimonials").upsert(
      {
        id: next.id,
        quote: next.quote,
        name: next.name,
        handle: next.handle,
        tone: next.tone,
        sort_order: next.sortOrder,
      },
      { onConflict: "id" }
    );
    if (error) {
      throw error;
    }
  });
}

export async function deleteTestimonial(id) {
  if (!supabase) {
    return mutateLocalState((state) => {
      state.testimonials = state.testimonials.filter((item) => item.id !== id);
    });
  }

  return applyRemoteMutation(async () => {
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) {
      throw error;
    }
  });
}

export async function upsertFeature(payload) {
  if (!supabase) {
    return mutateLocalState((state) => {
      const next = normalizeFeature({
        ...payload,
        sortOrder: payload?.sortOrder ?? nextSortOrder(state.features),
      });
      const existingIndex = state.features.findIndex((item) => item.id === next.id);
      if (existingIndex >= 0) {
        state.features[existingIndex] = { ...state.features[existingIndex], ...next };
      } else {
        state.features.push(next);
      }
    });
  }

  const sortOrder = Number.isFinite(Number(payload?.sortOrder))
    ? Number(payload.sortOrder)
    : nextSortOrder(stateCache.features);

  const next = normalizeFeature({
    ...payload,
    id: payload?.id || makeId("feature"),
    sortOrder,
  });

  return applyRemoteMutation(async () => {
    const { error } = await supabase.from("features").upsert(
      {
        id: next.id,
        title: next.title,
        description: next.description,
        icon: next.icon,
        sort_order: next.sortOrder,
      },
      { onConflict: "id" }
    );
    if (error) {
      throw error;
    }
  });
}

export async function deleteFeature(id) {
  if (!supabase) {
    return mutateLocalState((state) => {
      state.features = state.features.filter((item) => item.id !== id);
    });
  }

  return applyRemoteMutation(async () => {
    const { error } = await supabase.from("features").delete().eq("id", id);
    if (error) {
      throw error;
    }
  });
}

export async function upsertTrip(payload) {
  if (!supabase) {
    return mutateLocalState((state) => {
      const next = normalizeTrip({
        ...payload,
        sortOrder: payload?.sortOrder ?? nextSortOrder(state.catalog),
      });
      const existingIndex = state.catalog.findIndex((item) => item.id === next.id);
      if (existingIndex >= 0) {
        state.catalog[existingIndex] = { ...state.catalog[existingIndex], ...next };
      } else {
        state.catalog.push(next);
      }
    });
  }

  const sortOrder = Number.isFinite(Number(payload?.sortOrder))
    ? Number(payload.sortOrder)
    : nextSortOrder(stateCache.catalog);

  const next = normalizeTrip({
    ...payload,
    id: payload?.id || makeId("trip"),
    sortOrder,
  });

  return applyRemoteMutation(async () => {
    const { error } = await supabase.from("trips").upsert(
      {
        id: next.id,
        title: next.title,
        destination: next.destination,
        duration: next.duration,
        price: next.price,
        rating: next.rating,
        seats: next.seats,
        departure: next.departure,
        summary: next.summary,
        tags: next.tags,
        theme: next.theme,
        featured: next.featured,
        sort_order: next.sortOrder,
      },
      { onConflict: "id" }
    );
    if (error) {
      throw error;
    }
  });
}

export async function deleteTrip(id) {
  if (!supabase) {
    return mutateLocalState((state) => {
      state.catalog = state.catalog.filter((item) => item.id !== id);
    });
  }

  return applyRemoteMutation(async () => {
    const { error } = await supabase.from("trips").delete().eq("id", id);
    if (error) {
      throw error;
    }
  });
}

export async function resetState() {
  if (!supabase) {
    return writeLocalState(clone(DEFAULT_STATE));
  }

  return applyRemoteMutation(async () => {
    const defaultState = clone(DEFAULT_STATE);
    const firstHero = normalizeHero(defaultState.hero);

    const { error: heroError } = await supabase
      .from("site_content")
      .upsert({ id: 1, hero_title: firstHero.title, hero_subtitle: firstHero.subtitle }, { onConflict: "id" });
    if (heroError) {
      throw heroError;
    }

    const { error: wipeTestimonialError } = await supabase.from("testimonials").delete().not("id", "is", null);
    if (wipeTestimonialError) {
      throw wipeTestimonialError;
    }

    const { error: wipeFeatureError } = await supabase.from("features").delete().not("id", "is", null);
    if (wipeFeatureError) {
      throw wipeFeatureError;
    }

    const { error: wipeTripError } = await supabase.from("trips").delete().not("id", "is", null);
    if (wipeTripError) {
      throw wipeTripError;
    }

    const { error: insertTestimonialError } = await supabase.from("testimonials").insert(
      defaultState.testimonials.map((item) => ({
        id: item.id,
        quote: item.quote,
        name: item.name,
        handle: item.handle,
        tone: item.tone,
        sort_order: item.sortOrder,
      }))
    );
    if (insertTestimonialError) {
      throw insertTestimonialError;
    }

    const { error: insertFeatureError } = await supabase.from("features").insert(
      defaultState.features.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        icon: item.icon,
        sort_order: item.sortOrder,
      }))
    );
    if (insertFeatureError) {
      throw insertFeatureError;
    }

    const { error: insertTripError } = await supabase.from("trips").insert(
      defaultState.catalog.map((item) => ({
        id: item.id,
        title: item.title,
        destination: item.destination,
        duration: item.duration,
        price: item.price,
        rating: item.rating,
        seats: item.seats,
        departure: item.departure,
        summary: item.summary,
        tags: item.tags,
        theme: item.theme,
        featured: item.featured,
        sort_order: item.sortOrder,
      }))
    );
    if (insertTripError) {
      throw insertTripError;
    }
  });
}

export async function exportState() {
  const state = await getState();
  return JSON.stringify(state, null, 2);
}

export async function importState(jsonPayload) {
  const parsed = JSON.parse(jsonPayload);
  const normalized = normalizeState(parsed);

  if (!supabase) {
    return writeLocalState(normalized);
  }

  return applyRemoteMutation(async () => {
    const { error: heroError } = await supabase
      .from("site_content")
      .upsert({ id: 1, hero_title: normalized.hero.title, hero_subtitle: normalized.hero.subtitle }, { onConflict: "id" });
    if (heroError) {
      throw heroError;
    }

    const { error: wipeTestimonialError } = await supabase.from("testimonials").delete().not("id", "is", null);
    if (wipeTestimonialError) {
      throw wipeTestimonialError;
    }

    const { error: wipeFeatureError } = await supabase.from("features").delete().not("id", "is", null);
    if (wipeFeatureError) {
      throw wipeFeatureError;
    }

    const { error: wipeTripError } = await supabase.from("trips").delete().not("id", "is", null);
    if (wipeTripError) {
      throw wipeTripError;
    }

    if (normalized.testimonials.length) {
      const { error } = await supabase.from("testimonials").insert(
        normalized.testimonials.map((item) => ({
          id: item.id,
          quote: item.quote,
          name: item.name,
          handle: item.handle,
          tone: item.tone,
          sort_order: item.sortOrder,
        }))
      );
      if (error) {
        throw error;
      }
    }

    if (normalized.features.length) {
      const { error } = await supabase.from("features").insert(
        normalized.features.map((item) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          icon: item.icon,
          sort_order: item.sortOrder,
        }))
      );
      if (error) {
        throw error;
      }
    }

    if (normalized.catalog.length) {
      const { error } = await supabase.from("trips").insert(
        normalized.catalog.map((item) => ({
          id: item.id,
          title: item.title,
          destination: item.destination,
          duration: item.duration,
          price: item.price,
          rating: item.rating,
          seats: item.seats,
          departure: item.departure,
          summary: item.summary,
          tags: item.tags,
          theme: item.theme,
          featured: item.featured,
          sort_order: item.sortOrder,
        }))
      );
      if (error) {
        throw error;
      }
    }
  });
}

export async function getSession() {
  if (!supabase) {
    return null;
  }
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    throw error;
  }
  return data.session ?? null;
}

export function onAuthStateChange(callback) {
  if (!supabase) {
    return () => {};
  }
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session ?? null);
  });

  return () => {
    subscription.unsubscribe();
  };
}

export async function signIn(email, password) {
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw error;
  }
  return data.session ?? null;
}

export async function signUp(email, password) {
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) {
    throw error;
  }
  return data.session ?? null;
}

export async function signOut() {
  if (!supabase) {
    return;
  }
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw error;
  }
}

export async function isCurrentUserAdmin() {
  if (!supabase) {
    return true;
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) {
    throw userError;
  }
  if (!user) {
    return false;
  }

  const { data, error } = await supabase.from("admin_users").select("user_id").eq("user_id", user.id).maybeSingle();
  if (error && error.code !== "PGRST116") {
    throw error;
  }
  return Boolean(data?.user_id);
}

export async function tryBootstrapCurrentUserAsAdmin() {
  if (!supabase) {
    return true;
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) {
    throw userError;
  }
  if (!user) {
    return false;
  }

  const { error } = await supabase.from("admin_users").insert({ user_id: user.id });
  if (!error) {
    return true;
  }

  if (error.code === "23505") {
    return true;
  }

  return false;
}
