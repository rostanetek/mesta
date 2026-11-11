# Mapa bodů

Jednoduchá webová mapa (Leaflet), která zobrazuje body ze souboru [`body.geojson`](body.geojson).

## Jak přidat nebo upravit bod

Všechna data jsou jen v `body.geojson`, `index.html` není potřeba měnit.

1. Otevřete `body.geojson` na GitHubu a klikněte na ikonu tužky (Edit).
2. Přidejte nový objekt do pole `features`, například:

   ```json
   {
     "type": "Feature",
     "properties": { "nazev": "Brno", "popis": "Krajské město Jihomoravského kraje" },
     "geometry": { "type": "Point", "coordinates": [16.6068, 49.1951] }
   }
   ```

   Pozor: souřadnice se píší v pořadí **[zeměpisná délka, zeměpisná šířka]** (WGS 84), tedy nejdřív lon, pak lat.
   Mezi objekty patří čárka, za posledním čárka být nesmí.
3. Uložte změnu přes „Commit changes“, případně pull requestem.

GitHub soubor `.geojson` zobrazí jako náhled na mapě, takže chybu ve formátu nebo v souřadnicích uvidíte hned.

## Vlastnosti bodu

| klíč    | význam                                  |
|---------|-----------------------------------------|
| `nazev` | popisek u bodu a nadpis v popupu         |
| `popis` | text v popupu (nepovinné)               |

## Spuštění

- **GitHub Pages:** Settings → Pages → Deploy from branch → `main` / root. Mapa poběží na `https://<uživatel>.github.io/<repozitář>/`.
- **Lokálně:** prohlížeč neumí načíst GeoJSON přes `file://`, proto spusťte ve složce třeba `python -m http.server` a otevřete `http://localhost:8000`.
