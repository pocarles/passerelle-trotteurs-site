(() => {
  const mapElement = document.querySelector(".network-map");
  const Leaflet = window.L || window.leaflet;

  const escapeHtml = (value) =>
    value.replace(/[&<>'"]/g, (character) => {
      const characters = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      };
      return characters[character];
    });

  if (!mapElement || !Leaflet) return;

  mapElement.innerHTML = "";
  const departments = JSON.parse(mapElement.dataset.departments || "[]");
  const structuresByDepartment = new Map(
    departments.map((department) => [department.code, department]),
  );
  const map = Leaflet.map(mapElement, {
    attributionControl: false,
    scrollWheelZoom: false,
    zoomControl: false,
  }).setView([46.7, 2.5], 5.5);

  fetch("/data/departements.geojson")
    .then((response) => {
      if (!response.ok) throw new Error("Carte indisponible");
      return response.json();
    })
    .then((geojson) => {
      const departmentsLayer = Leaflet.geoJSON(geojson, {
        filter: (feature) => /^\d{2}$/.test(feature.properties.code),
        style: (feature) => {
          const hasStructure = structuresByDepartment.has(feature.properties.code);
          return {
            color: hasStructure ? "#78954c" : "#d8d4c9",
            fillColor: hasStructure ? "#dce9b6" : "#f7f4ec",
            fillOpacity: hasStructure ? 0.95 : 0.72,
            weight: hasStructure ? 1.5 : 0.8,
          };
        },
      }).addTo(map);

      departmentsLayer.eachLayer((layer) => {
        const department = structuresByDepartment.get(layer.feature.properties.code);
        if (!department) return;

        const structures = department.structures
          .map((structure) => `<li>${escapeHtml(structure)}</li>`)
          .join("");
        const marker = Leaflet.circleMarker(layer.getBounds().getCenter(), {
          radius: 7 + Math.min(department.structures.length, 3),
          color: "#173a27",
          fillColor: "#173a27",
          fillOpacity: 1,
          weight: 2,
        })
          .addTo(map)
          .bindPopup(
            `<strong>${escapeHtml(department.label)}</strong><ul>${structures}</ul>`,
            { closeButton: false, offset: [0, -2] },
          );

        layer.on({
          click: () => marker.openPopup(),
          mouseover: () => layer.setStyle({ fillColor: "#bfd38a" }),
          mouseout: () => departmentsLayer.resetStyle(layer),
        });
      });

      const bounds = departmentsLayer.getBounds();
      if (bounds.isValid()) map.fitBounds(bounds.pad(0.06));
    })
    .catch(() => {
      map.remove();
      mapElement.innerHTML =
        "<p class=\"network-map__error\">La carte ne peut pas être chargée pour le moment. Retrouvez toutes les structures dans l’annuaire ci-dessus.</p>";
    });
})();
