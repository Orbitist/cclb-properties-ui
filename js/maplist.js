function renderMapList() {

  // Create the map list items
  for (var i = 0; i < orbitistPointsGeojsonCleaned.features.length; i++) {
    var feature = orbitistPointsGeojsonCleaned.features[i];
    var propertyImage = '<img src="' + feature.properties.image + '" />';
    if (feature.properties.image == null){
      propertyImage = '';
    }
    if (numberedPoints == "true"){
      var  listItem  = '<hr><div class="map-list-item" id="' + 'property' + i + '"><img src="' + feature.properties.image + '" /><p>' + (i +1) + " - " + feature.properties.point_title + '</p></div><script>document.getElementById("' + 'property' + i + '").addEventListener("click", function () {map.flyTo({center:[' + feature.geometry.coordinates + '],zoom: 18,bearing: 90 * (.5 - Math.random()),pitch: 60});});</script>';
    } else {
      var  listItem  = '<hr><div class="map-list-item" id="' + 'property' + i + '">' + propertyImage +
      '<h5>' + feature.properties.name + '</h5>' +
      '<p><strong>Feature: </strong> Test feature</p>' +
      '<p><strong>Feature: </strong> Test feature</p>' +
      '<p><strong>Feature: </strong> Test feature</p>' +
      '</div><script>document.getElementById("' + 'property' + i + '").addEventListener("click", function () {map.flyTo({center:[' + feature.geometry.coordinates + '],zoom: 18,bearing: 90 * (.5 - Math.random()),pitch: 60});});</script>';
    }
    $('div.map-list').append(listItem);
  }

};
