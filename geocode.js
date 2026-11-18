// Shared helpers: turn an address into coordinates, and measure distance.
// Address lookup uses OpenStreetMap's free Nominatim service (no API key needed).
// Its usage policy allows light, user-triggered searches like this one.

async function geocodeAddress(query) {
  const params = new URLSearchParams({
    q: query,
    format: "jsonv2",
    limit: "1",
    countrycodes: "us",
    viewbox: "-122.52,37.83,-122.35,37.70", // favors results in San Francisco, but doesn't exclude other places
    bounded: "0",
  });
  const res = await fetch("https://nominatim.openstreetmap.org/search?" + params.toString());
  if (!res.ok) throw new Error("Address lookup failed");
  const data = await res.json();
  if (!data.length) return null;
  return {
    lat: parseFloat(data[0].lat),
    lng: parseFloat(data[0].lon),
    label: data[0].display_name,
  };
}

// Straight-line distance in miles between two {lat, lng} points.
function milesBetween(a, b) {
  const R = 3958.8;
  const rad = (d) => (d * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
