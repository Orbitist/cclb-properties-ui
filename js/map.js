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
        'url': 'data/properties.geojson',
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
  zoom: 10,
  center: [-79.15237, 42.286452],
  hash: true
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
      'circle-color': '#108140'
    }
  });
});

map.on('click', function (e) {
  var features = map.queryRenderedFeatures(e.point, { layers: ['properties'] });
  if (!features.length) {
      return;
  }
  var feature = features[0];
  // Construct the content
  function popupContent () {
    var feature = features[0];
    var contentImage = '<a href="http://www.chautauqualandbank.org/properties/' + feature.properties.permalink + '" target="_blank"><img src="' + feature.properties.image + '" style="width:100%;"></a>';
    var content = '<h2>' + feature.properties.name + '</h2><a class="button" href="http://www.chautauqualandbank.org/properties/' + feature.properties.permalink + '" target="_blank"><div class="orbitist-button">View Full Listing</div></a>';
    if (feature.properties.image == 'null') {
      return content;
    } else {
      return contentImage + content;
    }
  }
  var popup = new mapboxgl.Popup()
    .setLngLat(feature.geometry.coordinates)
    .setHTML(popupContent())
    .addTo(map);
  if (features.length) {
    map.flyTo({center: features[0].geometry.coordinates});
  }
});

map.on('mousemove', function (e) {
    var features = map.queryRenderedFeatures(e.point, { layers: ['properties'] });
    map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
});

removeSpinner();
