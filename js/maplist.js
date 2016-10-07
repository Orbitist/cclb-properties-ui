function renderMapList() {

  // Create the map list items
  for (var i = 0; i < orbitistPointsGeojsonCleaned.features.length; i++) {
    var feature = orbitistPointsGeojsonCleaned.features[i];
    // get propertyImage
    var propertyImage = '<img src="' + feature.properties.image + '" />';
    if (feature.properties.image == null){
      propertyImage = '';
    }
    // get propertyCategoryImage
    var propertyCategoryImage = null;
    if (feature.properties.category == 'Recently Sold Rehab Properties'){
      propertyCategoryImage = '<img src="img/sold-rehab.png" class="propertyCategoryImage" /> Recently Sold Rehab';
    }
    if (feature.properties.category == 'Rehabs for Sale'){
      propertyCategoryImage = '<img src="img/for-sale.png" class="propertyCategoryImage" /> For Sale';
    }
    if (feature.properties.category == 'Recently Demolished'){
      propertyCategoryImage = '<img src="img/recently-demolished.png" class="propertyCategoryImage" /> Recently Demolished';
    }
    if (feature.properties.category == 'Future Demolitions'){
      propertyCategoryImage = '<img src="img/future-demolitions.png" class="propertyCategoryImage" /> Future Demolition';
    }

    // build the listItem
    var  listItem  = '<hr><div class="map-list-item" id="' + 'property' + i + '">' + propertyImage +
    '<p>' + propertyCategoryImage + '</p>' +
    '<p><strong>' + feature.properties.name + '</strong></p>' +
    '<p><strong>Feature: </strong> Test feature</p>' +
    '<p><strong>Feature: </strong> Test feature</p>' +
    '</div><script>document.getElementById("' + 'property' + i + '").addEventListener("click", function () {map.flyTo({center:[' + feature.geometry.coordinates + '],zoom: 18,bearing: 90 * (.5 - Math.random()),pitch: 60});});</script>';

    $('div.map-list').append(listItem);
  }

};
