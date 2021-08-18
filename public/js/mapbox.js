/* eslint-disable */

export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoibmFudWNoZWYiLCJhIjoiY2tyYjE2cmx3NDd5ZjJybnhvbDg0azJ3dyJ9.IVwUsJ9o96AkIPch_LIxwg';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/nanuchef/ckrb1vp6p04li17nrl2qfo3jm',
    scrollZoom: false,
    // center: [-118.113491, 34.111745],
    // zoom: 10,
    // interactive: false
  });
  const bounds = new mapboxgl.LngLatBounds();
  locations.forEach((loc) => {
    //Add marker
    const el = document.createElement('div');
    el.className = 'marker';
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);
    // Add popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);
    //Extend map bounds to include current Location
    bounds.extend(loc.coordinates);
  });
  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
