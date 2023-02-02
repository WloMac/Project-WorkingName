// /**
//  * Converts a coordinate to a 3 word address
//  * @param {Object} coordinates - The coordinate object
//  * @param {number} coordinates.lat - The latitude
//  * @param {number} coordinates.lng - The longitude
//  * @param {string} [language=en] - The language to return the 3 word address in
//  * @returns {Promise} Promise 3 word address response
//  */

// what3words.api.convertTo3wa({lat:51.508344, lng:-0.12549900}, 'en')
//   .then(function(response) {
//     console.log("[convertTo3wa]", response);
//   });


queryUrlGMap = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCI1vOReU-tgyJByRYPftmAAUZTvKwBoVI&callback=initMap";


fetch("https://ipgeolocation.abstractapi.com/v1/?api_key=5843dce2715140eca64c3152ccff5fb3")
.then((response) => response.json())
.then(function (jsonresponse) {
      console.log(jsonresponse.longitude)
      console.log(jsonresponse.latitude)
      let lng = jsonresponse.longitude;
      let lat= jsonresponse.latitude;
  
      initMap(lat, lng)

});


function initMap(lat,lng) {
  // The location of User Location
  const userLocation = { lat,/*: 40.76,*/ lng/*: -73.983*/ };
  // The map, centered at User Location
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: userLocation,
  });
  // The marker, positioned at Uluru
  const marker = new google.maps.Marker({
    position: userLocation,
    map: map,
  });
}

window.initMap = initMap;