// Small preview map on the landing page.
const previewMap = L.map("preview-map", {
  scrollWheelZoom: false,
  dragging: !L.Browser.mobile,   // so phones can still scroll the page
}).setView([37.7749, -122.4194], 12);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  maxZoom: 19,
}).addTo(previewMap);

SERVICES.forEach((s) => {
  const m = L.circleMarker([s.lat, s.lng], {
    radius: 8, weight: 2, color: "#ffffff", fillColor: "#1e6f7c", fillOpacity: 0.95,
  }).addTo(previewMap);

  const box = document.createElement("div");
  const title = document.createElement("strong");
  title.textContent = s.name;
  const addr = document.createElement("div");
  addr.textContent = s.address;
  const link = document.createElement("a");
  link.href = "map.html";
  link.textContent = "Open the full map";
  box.append(title, addr, link);
  m.bindPopup(box);
});

previewMap.fitBounds(L.latLngBounds(SERVICES.map((s) => [s.lat, s.lng])), { padding: [30, 30] });
