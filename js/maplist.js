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

    // build the propertyValue
    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    var propertyValue = numberWithCommas(feature.properties.property.TotalAssessedValue);

    //build the propertySquareFootage
    var propertySquareFootage = numberWithCommas(feature.properties.physical.SquareFootage);

    //build the building style and condition
    var propertyBuildingStyle = feature.properties.physical.BuildingStyle.toLowerCase();
    var propertyCondition = feature.properties.physical.OverallCondition.toLowerCase();

    //build bathroom statement
    var propertyBathrooms = feature.properties.physical.NumberOfBaths + ' bathroom';
    if (feature.properties.physical.NumberOfBaths > 1) {
      propertyBathrooms = feature.properties.physical.NumberOfBaths + ' bathrooms';
    }

    //build bedroom statement
    var propertyBedrooms = feature.properties.physical.NumberOfBedrooms + ' bedroom';
    if (feature.properties.physical.NumberOfBedrooms > 1) {
      propertyBedrooms = feature.properties.physical.NumberOfBedrooms + ' bedrooms';
    }

    //Build Year build statement
    var propertyYearBuilt = 'in ' + feature.properties.property.StructureYearBuilt;
    if (feature.properties.property.StructureYearBuilt == 0){
      propertyYearBuilt = 'at an unknown time'
    }

    // build the listItem
    var  listItem  = '<hr><div class="map-list-item" id="' + 'property' + i + '">' + propertyImage +
    '<p>' + propertyCategoryImage + '</p>' +
    '<p><strong>' + feature.properties.name + '</strong></p>' +
    '<p><strong>Assessed Value: </strong> $' + propertyValue + '</p>' +
    '<p>This ' + propertySquareFootage + ' square foot ' + propertyBuildingStyle + ' home was built ' + propertyYearBuilt + '. It has ' + propertyBedrooms + ' and ' + propertyBathrooms + '. Overall, the property is in ' + propertyCondition + ' condition.</p>' +
    '</div><script>document.getElementById("' + 'property' + i + '").addEventListener("click", function () {map.flyTo({center:[' + feature.geometry.coordinates + '],zoom: 18,bearing: 90 * (.5 - Math.random()),pitch: 60});});</script>';

    $('div.map-list').append(listItem);
  }

};
