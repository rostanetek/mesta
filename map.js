const DATA_URL = 'body.geojson';

const STYL_BODU = {
  radius: 9,
  color: '#ffffff',
  weight: 2,
  fillColor: '#d7263d',
  fillOpacity: 0.9
};

const map = L.map('map').setView([49.8, 15.5], 7); // výchozí pohled na ČR

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function zobrazChybu(text) {
  const el = document.createElement('div');
  el.className = 'chyba';
  el.textContent = text;
  document.body.appendChild(el);
}

fetch(DATA_URL, { cache: 'no-cache' })
  .then(r => {
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json();
  })
  .then(data => {
    const vrstva = L.geoJSON(data, {
      pointToLayer: (feature, latlng) => L.circleMarker(latlng, STYL_BODU),
      onEachFeature: (feature, layer) => {
        const p = feature.properties || {};
        if (p.nazev) {
          layer.bindTooltip(escapeHtml(p.nazev), { permanent: true, direction: 'right', offset: [10, 0] });
        }
        layer.bindPopup(`<strong>${escapeHtml(p.nazev)}</strong>${p.popis ? '<br>' + escapeHtml(p.popis) : ''}`);
      }
    }).addTo(map);

    if (vrstva.getLayers().length) {
      map.fitBounds(vrstva.getBounds(), { padding: [60, 60], maxZoom: 12 });
    }
  })
  .catch(err => {
    console.error(err);
    zobrazChybu(`Nepodařilo se načíst ${DATA_URL} (${err.message}). Otevřete mapu přes webserver nebo GitHub Pages, ne přímo ze souboru.`);
  });
