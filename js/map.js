function removeSpinner () {
  // Hide spinner and remove it
  document.getElementById("spinner").style.opacity = "0";
  setTimeout(function () {
    document.getElementById("spinner").style.display = "none";
  }, 2000);
}


// Get points geojson data //
var propertyData = (function () {
    var propertyData = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': 'http://www.chautauqualandbank.org/api',
        'dataType': "json",
        'success': function (data) {
            propertyData = data;
        }
    });
    return propertyData;
})();

mapboxgl.accessToken = 'pk.eyJ1IjoiYnVmZmFsb2J1c2luZXNzZmlyc3QiLCJhIjoiY2l0bmRscXlrMDQyZTJ4bDR3czB4aGplZCJ9.hT3YUWzzRC-s0jGYQU1rXQ';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/buffalobusinessfirst/citndoi0c003m2iprlhyvg4ov',
  zoom: 12,
  center: [-78.87, 42.88]
});

map.on('load', function () {
  map.addSource("properties", {
    'type': 'geojson',
    'data': propertyData
  });

  map.addLayer({
    'id': 'properties',
    'type': 'circle',
    'source': 'properties',
    'paint': {
      'circle-radius': {
        'base': 1.75,
        'stops': [[5, 3], [12, 8], [22, 180]]
      },
      'circle-color': '#ca6266'
    }
  });
});

map.on('click', function (e) {
  var features = map.queryRenderedFeatures(e.point, { layers: ['properties'] });
  if (!features.length) {
      return;
  }
  var feature = features[0];
  var popup = new mapboxgl.Popup()
    .setLngLat(feature.geometry.coordinates)
    .setHTML('<p>Project: ' + feature.properties.Project + '</p><p>Developer\/General Contractor: ' + feature.properties.Developer_General_Contractor + '</p><p>Cost: ' + feature.properties.Cost + ' Million</p><p>Status: ' + feature.properties.Status + '</p><p>Description: ' + feature.properties.Description + '</p>')
    .addTo(map);
  if (features.length) {
    // Get coordinates from the symbol and center the map on those coordinates
    map.flyTo({center: features[0].geometry.coordinates});
  }
});

map.on('mousemove', function (e) {
    var features = map.queryRenderedFeatures(e.point, { layers: ['properties'] });
    map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
});

removeSpinner();
