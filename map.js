// Services map. Data: data/services.js (SERVICES) and data/service-types.js (SERVICE_GROUPS).
// Address lookup and distance helpers: js/geocode.js.

const UNSPECIFIED = "Not yet categorized";
const SF_CENTER = [37.7749, -122.4194];

const map = L.map("map").setView(SF_CENTER, 12);
L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: "abcd",
  maxZoom: 19,
}).addTo(map);

const markerLayer = L.layerGroup().addTo(map);
const originLayer = L.layerGroup().addTo(map);
const markersById = new Map();

// types: Set of selected service names (empty = show everything).
// origin: {lat, lng, label} once the visitor enters an address or shares their location.
const state = { query: "", types: new Set(), origin: null };

const els = {
  search: document.getElementById("search"),
  chips: document.getElementById("chips"),
  results: document.getElementById("results"),
  count: document.getElementById("count"),
  clear: document.getElementById("clear"),
  glossary: document.getElementById("glossary-list"),
  nearForm: document.getElementById("near-form"),
  address: document.getElementById("address"),
  locate: document.getElementById("locate"),
  nearStatus: document.getElementById("near-status"),
  nearClear: document.getElementById("near-clear"),
};

// Build DOM with textContent (never innerHTML) so data can't inject markup.
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function offers(s, type) {
  return type === UNSPECIFIED ? s.services.length === 0 : s.services.includes(type);
}

function matches(s) {
  const q = state.query.trim().toLowerCase();
  if (q && !(s.name + " " + s.address).toLowerCase().includes(q)) return false;
  if (state.types.size === 0) return true;
  return [...state.types].some((t) => offers(s, t));   // matches ANY selected service
}

// ---------- Filter chips (grouped, from data/service-types.js) ----------
function makeChip(type) {
  const n = SERVICES.filter((s) => offers(s, type)).length;
  const b = el("button", "chip", `${type} (${n})`);
  b.type = "button";
  b.setAttribute("aria-pressed", String(state.types.has(type)));
  b.addEventListener("click", () => {
    state.types.has(type) ? state.types.delete(type) : state.types.add(type);
    renderChips();
    render();
  });
  return b;
}

function renderChips() {
  els.chips.replaceChildren();
  const used = new Set(SERVICES.flatMap((s) => s.services));
  const known = new Set();

  const addGroup = (title, names) => {
    if (!names.length) return;
    const wrap = el("div", "chip-group");
    wrap.appendChild(el("p", "chip-group-title", title));
    const row = el("div", "chips");
    names.forEach((n) => row.appendChild(makeChip(n)));
    wrap.appendChild(row);
    els.chips.appendChild(wrap);
  };

  SERVICE_GROUPS.forEach((g) => {
    g.types.forEach((t) => known.add(t.name));
    addGroup(g.group, g.types.map((t) => t.name).filter((n) => used.has(n)));
  });
  addGroup("Other", [...used].filter((n) => !known.has(n)).sort());
  if (SERVICES.some((s) => s.services.length === 0)) addGroup("Missing details", [UNSPECIFIED]);

  els.clear.hidden = state.types.size === 0;
}

function renderGlossary() {
  SERVICE_GROUPS.forEach((g) => {
    g.types.forEach((t) => {
      els.glossary.appendChild(el("dt", "", t.name));
      els.glossary.appendChild(el("dd", "", t.description));
    });
  });
}

// ---------- Map + list ----------
function formatMiles(d) {
  return d < 0.1 ? "under 0.1 mi away" : `${d.toFixed(1)} mi away`;
}

function popupContent(s, dist) {
  const box = el("div", "popup");
  box.appendChild(el("h3", "", s.name));
  box.appendChild(el("p", "", s.address));
  if (dist !== null) box.appendChild(el("p", "", formatMiles(dist)));
  if (s.services.length) {
    const ul = el("ul");
    s.services.forEach((t) => ul.appendChild(el("li", "", t)));
    box.appendChild(ul);
  } else {
    box.appendChild(el("p", "pending", "Service details not yet added"));
  }
  if (s.note) box.appendChild(el("p", "note", s.note));
  if (s.approx) box.appendChild(el("p", "pending", "Pin location is approximate."));
  const link = el("a", "", "Get directions");
  const from = state.origin ? `&origin=${state.origin.lat},${state.origin.lng}` : "";
  link.href = `https://www.google.com/maps/dir/?api=1${from}&destination=${encodeURIComponent(s.address)}`;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  box.appendChild(link);
  return box;
}

function makeMarker(s, dist) {
  const m = L.circleMarker([s.lat, s.lng], {
    radius: 10, weight: 2, color: "#ffffff",
    fillColor: "#1e6f7c", fillOpacity: 0.95,
  });
  m.bindPopup(popupContent(s, dist));
  m.bindTooltip(s.name);
  m.on("click", () => setActive(s.id));
  return m;
}

function setActive(id) {
  document.querySelectorAll(".result-btn").forEach((b) => {
    b.classList.toggle("active", Number(b.dataset.id) === id);
  });
  markersById.forEach((m, mid) => {
    m.setStyle({ fillColor: mid === id ? "#c8442b" : "#1e6f7c" });
    if (mid === id) m.bringToFront();
  });
}

function selectLocation(s) {
  const m = markersById.get(s.id);
  map.flyTo([s.lat, s.lng], Math.max(map.getZoom(), 15), { duration: 0.6 });
  m.openPopup();
  setActive(s.id);
}

function render() {
  markerLayer.clearLayers();
  markersById.clear();
  els.results.replaceChildren();

  let shown = SERVICES.filter(matches).map((s) => ({
    s,
    d: state.origin ? milesBetween(state.origin, s) : null,
  }));
  if (state.origin) shown.sort((a, b) => a.d - b.d);   // nearest first

  els.count.textContent = `${shown.length} of ${SERVICES.length} locations`;

  if (shown.length === 0) {
    els.results.appendChild(el("li", "no-results", "No locations match. Try removing a filter or changing your search."));
    return;
  }

  shown.forEach(({ s, d }) => {
    const marker = makeMarker(s, d);
    markersById.set(s.id, marker);
    markerLayer.addLayer(marker);

    const li = el("li");
    const btn = el("button", "result-btn");
    btn.type = "button";
    btn.dataset.id = s.id;
    btn.appendChild(el("span", "result-name", s.name));
    if (d !== null) btn.appendChild(el("span", "result-dist", formatMiles(d)));
    btn.appendChild(el("span", "result-addr", s.address));
    btn.appendChild(
      s.services.length
        ? el("span", "result-svc", s.services.join(", "))
        : el("span", "result-svc pending", "Service details not yet added")
    );
    if (s.note) btn.appendChild(el("span", "result-note", s.note));
    btn.addEventListener("click", () => selectLocation(s));
    li.appendChild(btn);
    els.results.appendChild(li);
  });

  // With an address entered, zoom to the visitor plus the three nearest results.
  const points = state.origin
    ? [[state.origin.lat, state.origin.lng], ...shown.slice(0, 3).map(({ s }) => [s.lat, s.lng])]
    : shown.map(({ s }) => [s.lat, s.lng]);
  map.fitBounds(L.latLngBounds(points), { padding: [50, 50], maxZoom: 15 });
}

// ---------- "Find services near me" ----------
function setStatus(text) { els.nearStatus.textContent = text; }

function setOrigin(o, description) {
  state.origin = o;
  originLayer.clearLayers();
  const dot = L.circleMarker([o.lat, o.lng], {
    radius: 9, weight: 3, color: "#ffffff", fillColor: "#13222f", fillOpacity: 1,
  }).bindTooltip("Your location", { permanent: false });
  originLayer.addLayer(dot);

  const nearest = Math.min(...SERVICES.map((s) => milesBetween(o, s)));
  let msg = `Sorted by distance from ${description}.`;
  if (nearest > 25) msg += " This location is far from San Francisco, so distances are long.";
  setStatus(msg);
  els.nearClear.hidden = false;
  render();
}

function clearOrigin() {
  state.origin = null;
  originLayer.clearLayers();
  setStatus("");
  els.nearClear.hidden = true;
  render();
}

async function searchAddress(query) {
  const q = query.trim();
  if (!q) { setStatus("Enter an address to search."); return; }
  setStatus("Looking up that address...");
  try {
    const result = await geocodeAddress(q);
    if (!result) {
      setStatus("We couldn't find that address. Try adding the street number and city.");
      return;
    }
    const short = result.label.split(",").slice(0, 3).join(",");
    setOrigin(result, short);
  } catch (err) {
    setStatus("The address lookup isn't working right now. Please try again in a moment.");
  }
}

function useMyLocation() {
  if (!navigator.geolocation) {
    setStatus("Your browser can't share your location. Please type an address instead.");
    return;
  }
  setStatus("Finding your location...");
  navigator.geolocation.getCurrentPosition(
    (pos) => setOrigin({ lat: pos.coords.latitude, lng: pos.coords.longitude }, "your current location"),
    () => setStatus("We couldn't get your location. You can type an address instead."),
    { timeout: 10000 }
  );
}

els.nearForm.addEventListener("submit", (e) => { e.preventDefault(); searchAddress(els.address.value); });
els.locate.addEventListener("click", useMyLocation);
els.nearClear.addEventListener("click", () => { els.address.value = ""; clearOrigin(); });
els.search.addEventListener("input", (e) => { state.query = e.target.value; render(); });
els.clear.addEventListener("click", () => { state.types.clear(); renderChips(); render(); });

renderGlossary();
renderChips();
render();

// If the visitor came from the landing page's address box (map.html?address=...), run that search.
const incoming = new URLSearchParams(window.location.search).get("address");
if (incoming) {
  els.address.value = incoming;
  searchAddress(incoming);
}
