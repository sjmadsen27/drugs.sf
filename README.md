# Opioids in San Francisco

Static website (no build step). Pages:

- `index.html` – landing page with a preview map and an address search
- `map.html` – full services map with filters and "find services near me"

## Files
- `data/services.js` – the locations (edit this to add or update a location)
- `data/service-types.js` – the standardized list of service types used for filters
- `js/map.js`, `js/preview.js`, `js/geocode.js` – map behavior, landing-page map, address lookup
- `css/styles.css` – shared styles

## Notes
- Address lookup uses OpenStreetMap's free Nominatim service, which is meant for light use. If the site gets heavy traffic, switch to a dedicated geocoding service.
- Locations marked `approx: true` in `services.js` have estimated map pins. Confirm and remove that line.

## Publishing with GitHub Pages
Settings > Pages > Deploy from a branch > `main` / `/ (root)`. This needs admin access to the repository.
