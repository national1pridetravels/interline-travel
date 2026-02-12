import { getState, subscribeState } from "./data-store.js";

const FEATURE_ICON_SVG = {
  price:
    '<svg viewBox="0 0 96 96" aria-hidden="true"><path d="M59.7 6.5c-6 2.2-10.7 7.2-12.4 13.4-.7 2.5-.8 4.8-.3 7.8H26.4v8.7h21.4c1.2 3.2 3.4 6.2 6.4 8.3l-13.6 7.6a8 8 0 0 1-3.9.9h-8.4c-7.6 0-14.6 4.1-18.3 10.8l-4 7.2h29.6l20.7 12.4h15.2l13.4-23.2-20.8-12.1c-1.7-1-4-1.4-5.9-.4L48 51.1l16.8-9.6c6.8-3.9 10.3-12.2 8.6-19.8C70.8 10.6 65.4 5.9 59.7 6.5ZM61 14c2.6 0 4.8 2.2 4.8 4.8S63.6 23.6 61 23.6s-4.8-2.2-4.8-4.8S58.4 14 61 14Z" /></svg>',
  technology:
    '<svg viewBox="0 0 96 96" aria-hidden="true"><path d="M48 10.5c-4 0-7.2 3.2-7.2 7.2v3.8A25.4 25.4 0 0 0 23 43.8c0 10 5.7 18.7 14 23v8h22v-8c8.2-4.3 14-13 14-23a25.4 25.4 0 0 0-17.8-24.3v-3.8c0-4-3.2-7.2-7.2-7.2Zm0 18a15.4 15.4 0 1 1 0 30.8 15.4 15.4 0 0 1 0-30.8ZM28 79.8h40v6H28v-6Zm8 9h24v4.7H36v-4.7Z" /></svg>',
  support:
    '<svg viewBox="0 0 96 96" aria-hidden="true"><path d="M48 8 17 19v24.8c0 18.4 12.8 35.3 31 40.2 18.2-4.9 31-21.8 31-40.2V19L48 8Zm0 14.6c8.9 0 16.1 7.2 16.1 16.1S56.9 54.8 48 54.8s-16.1-7.2-16.1-16.1S39.1 22.6 48 22.6Zm0 36.5c7.9 0 15.1 3.2 20.3 8.4A31.8 31.8 0 0 1 48 78.8a31.8 31.8 0 0 1-20.3-11.3A28.6 28.6 0 0 1 48 59.1Zm0-26.8a6.4 6.4 0 1 0 0 12.8 6.4 6.4 0 0 0 0-12.8Zm30 21.8 12 12-6.7 6.7-5-5a12.5 12.5 0 1 1-.3-13.7Z" /></svg>',
  finance:
    '<svg viewBox="0 0 96 96" aria-hidden="true"><path d="M17 54.9c0-12.1 9.8-21.9 21.9-21.9h2.4c8.1 0 15.7 4.5 19.5 11.8l2.8 5.4h10.1c2.8 0 5.4 1.7 6.4 4.4l4.9 12.4c1.3 3.3-1.1 6.9-4.7 6.9H57.5l-7.8 7.8a9.4 9.4 0 0 1-6.7 2.8H17V54.9Zm13.2-4.6a4.1 4.1 0 1 0 0 8.2h19.5a4.1 4.1 0 1 0 0-8.2H30.2Zm4.9 15.4a4.1 4.1 0 1 0 0 8.2h12.7a4.1 4.1 0 1 0 0-8.2H35.1Z" /></svg>',
  globe:
    '<svg viewBox="0 0 96 96" aria-hidden="true"><path d="M48 10C27 10 10 27 10 48s17 38 38 38 38-17 38-38S69 10 48 10Zm27.6 34H60.4a53.6 53.6 0 0 0-4.8-20.3c9.9 2.8 17.5 10.7 20 20.3ZM48 18.8c3.4 4.6 6 12.2 7.2 21.2H40.8c1.2-9 3.8-16.6 7.2-21.2ZM23.4 44h15.2A53.6 53.6 0 0 0 43.4 64c-9.9-2.8-17.2-10.7-20-20Zm15.2-4H23.4c2.8-9.6 10.1-17.5 20-20.3A53.6 53.6 0 0 0 38.6 40ZM48 77.2c-3.4-4.6-6-12.2-7.2-21.2h14.4c-1.2 9-3.8 16.6-7.2 21.2ZM56 52H40c-.3-2.5-.4-5-.4-7.6 0-2.6.1-5.1.4-7.6h16c.3 2.5.4 5 .4 7.6 0 2.6-.1 5.1-.4 7.6Zm-.4 12h15.2c-2.8 9.6-10.1 17.5-20 20.3A53.6 53.6 0 0 0 55.6 64Zm4.8-4a53.6 53.6 0 0 0 4.8-20h15.2c-2.8 9.3-10.4 17.2-20 20Z" /></svg>',
  ticket:
    '<svg viewBox="0 0 96 96" aria-hidden="true"><path d="M16 28.6A8.6 8.6 0 0 1 24.6 20h46.8A8.6 8.6 0 0 1 80 28.6v10a8 8 0 0 0 0 15.8v13A8.6 8.6 0 0 1 71.4 76H24.6a8.6 8.6 0 0 1-8.6-8.6v-13a8 8 0 0 0 0-15.8v-10Zm28 1.4h8v8h-8v-8Zm0 14h8v8h-8v-8Zm0 14h8v8h-8v-8Z" /></svg>',
};

const elements = {
  heroTitle: document.getElementById("hero-title"),
  heroSubtitle: document.getElementById("hero-subtitle"),
  quotesTrack: document.getElementById("quotes-track"),
  featureGrid: document.getElementById("feature-grid"),
  catalogGrid: document.getElementById("catalog-grid"),
  catalogEmpty: document.getElementById("catalog-empty"),
  catalogSearch: document.getElementById("catalog-search"),
  catalogDestination: document.getElementById("catalog-destination"),
  catalogBudget: document.getElementById("catalog-budget"),
  catalogSort: document.getElementById("catalog-sort"),
  catalogControls: document.getElementById("catalog-controls"),
};

let stateCache = null;
let revealObserver;

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
    return "Flexible date";
  }
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getInitials(name) {
  const parts = String(name).trim().split(/\s+/).filter(Boolean).slice(0, 2);
  if (!parts.length) {
    return "TR";
  }
  return parts.map((part) => part[0].toUpperCase()).join("");
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
      threshold: 0.14,
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

function renderHero(hero) {
  elements.heroTitle.textContent = hero.title;
  elements.heroSubtitle.textContent = hero.subtitle;
}

function renderTestimonials(testimonials) {
  if (!testimonials.length) {
    elements.quotesTrack.innerHTML = "";
    return;
  }

  const loopItems = testimonials.length > 1 ? testimonials.concat(testimonials) : [...testimonials, ...testimonials];
  elements.quotesTrack.style.animationDuration = `${Math.max(20, testimonials.length * 8)}s`;
  elements.quotesTrack.innerHTML = loopItems
    .map((item, index) => {
      const tone = item.tone || ["tone-a", "tone-b", "tone-c"][index % 3];
      const initials = getInitials(item.name);
      return `
        <article class="quote-card">
          <p>${escapeHTML(item.quote)}</p>
          <div class="quote-user">
            <span class="avatar ${escapeHTML(tone)}">${escapeHTML(initials)}</span>
            <div>
              <h3>${escapeHTML(item.name)}</h3>
              <span>${escapeHTML(item.handle)}</span>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderFeatures(features) {
  if (!features.length) {
    elements.featureGrid.innerHTML = "";
    return;
  }

  elements.featureGrid.innerHTML = features
    .map((feature, index) => {
      const iconMarkup = FEATURE_ICON_SVG[feature.icon] || FEATURE_ICON_SVG.price;
      return `
        <article class="feature-card reveal" style="--delay:${40 + index * 60}ms">
          <div>
            <h2>${escapeHTML(feature.title)}</h2>
            <p>${escapeHTML(feature.description)}</p>
          </div>
          <div class="icon-wrap">
            ${iconMarkup}
          </div>
        </article>
      `;
    })
    .join("");
}

function updateDestinationOptions(catalog) {
  const selectedDestination = elements.catalogDestination.value || "all";
  const uniqueDestinations = [...new Set(catalog.map((item) => item.destination).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b)
  );

  elements.catalogDestination.innerHTML = [
    '<option value="all">All destinations</option>',
    ...uniqueDestinations.map((destination) => `<option value="${escapeHTML(destination)}">${escapeHTML(destination)}</option>`),
  ].join("");

  const hasSelectedDestination = uniqueDestinations.includes(selectedDestination);
  elements.catalogDestination.value = hasSelectedDestination ? selectedDestination : "all";
}

function applyCatalogFilters(catalog) {
  const searchText = elements.catalogSearch.value.trim().toLowerCase();
  const destinationFilter = elements.catalogDestination.value;
  const budgetFilter = elements.catalogBudget.value;

  return catalog.filter((trip) => {
    if (destinationFilter !== "all" && trip.destination !== destinationFilter) {
      return false;
    }

    if (budgetFilter === "under_1000" && trip.price >= 1000) {
      return false;
    }
    if (budgetFilter === "1000_2000" && (trip.price < 1000 || trip.price > 2000)) {
      return false;
    }
    if (budgetFilter === "over_2000" && trip.price <= 2000) {
      return false;
    }

    if (!searchText) {
      return true;
    }

    const haystack = [trip.title, trip.destination, trip.summary, ...(trip.tags || [])].join(" ").toLowerCase();
    return haystack.includes(searchText);
  });
}

function sortCatalog(catalog) {
  const sortMode = elements.catalogSort.value;
  const sorted = [...catalog];

  if (sortMode === "price_low") {
    sorted.sort((a, b) => a.price - b.price);
    return sorted;
  }

  if (sortMode === "price_high") {
    sorted.sort((a, b) => b.price - a.price);
    return sorted;
  }

  if (sortMode === "rating") {
    sorted.sort((a, b) => b.rating - a.rating || a.price - b.price);
    return sorted;
  }

  if (sortMode === "departure") {
    sorted.sort((a, b) => {
      const aDate = new Date(a.departure).getTime();
      const bDate = new Date(b.departure).getTime();
      return aDate - bDate;
    });
    return sorted;
  }

  sorted.sort((a, b) => Number(b.featured) - Number(a.featured) || b.rating - a.rating || a.price - b.price);
  return sorted;
}

function renderCatalog(catalog) {
  const filtered = applyCatalogFilters(catalog);
  const sorted = sortCatalog(filtered);

  elements.catalogEmpty.hidden = sorted.length > 0;
  if (!sorted.length) {
    elements.catalogGrid.innerHTML = "";
    return;
  }

  elements.catalogGrid.innerHTML = sorted
    .map((trip, index) => {
      const tagMarkup = (trip.tags || [])
        .map((tag) => `<span class="trip-tag">${escapeHTML(tag)}</span>`)
        .join("");

      return `
        <article class="trip-card reveal" style="--delay:${40 + index * 45}ms">
          <header class="trip-cover trip-theme-${escapeHTML(trip.theme)}">
            ${trip.featured ? '<span class="trip-badge">Featured</span>' : ""}
            <p>${escapeHTML(trip.destination)}</p>
            <span>${escapeHTML(formatDate(trip.departure))}</span>
          </header>
          <div class="trip-body">
            <h3>${escapeHTML(trip.title)}</h3>
            <p>${escapeHTML(trip.summary)}</p>
            <div class="trip-meta">
              <span>${escapeHTML(trip.duration)}</span>
              <span>${trip.seats} seats left</span>
            </div>
            <div class="trip-price-row">
              <strong>${formatCurrency(trip.price)}</strong>
              <span>★ ${trip.rating.toFixed(1)}</span>
            </div>
            <div class="trip-tags">${tagMarkup}</div>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderAll(state) {
  renderHero(state.hero);
  renderTestimonials(state.testimonials);
  renderFeatures(state.features);
  updateDestinationOptions(state.catalog);
  renderCatalog(state.catalog);
  observeRevealElements();
}

function bindCatalogControls() {
  elements.catalogControls.addEventListener("input", () => {
    if (!stateCache) {
      return;
    }
    renderCatalog(stateCache.catalog);
    observeRevealElements();
  });
  elements.catalogControls.addEventListener("change", () => {
    if (!stateCache) {
      return;
    }
    renderCatalog(stateCache.catalog);
    observeRevealElements();
  });
}

async function initialize() {
  try {
    stateCache = await getState();
    renderAll(stateCache);
  } catch (error) {
    console.error("Failed to load travel content:", error);
  }
}

bindCatalogControls();
initialize();
subscribeState((nextState) => {
  stateCache = nextState;
  renderAll(nextState);
});
