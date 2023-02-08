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

let options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '3305c8d758msh96587b8a3306f7ep1d1bafjsn300995769472',
		'X-RapidAPI-Host': 'concerts-artists-events-tracker.p.rapidapi.com'
	}
};

queryUrlGMap = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCI1vOReU-tgyJByRYPftmAAUZTvKwBoVI&callback=initMap";
ipLocate();

function ipLocate() {
fetch("https://ipgeolocation.abstractapi.com/v1/?api_key=5843dce2715140eca64c3152ccff5fb3")
.then((response) => response.json())
.then(function (jsonresponse) {
      console.log(jsonresponse)
      console.log(jsonresponse.longitude)
      console.log(jsonresponse.latitude)
      let lng = jsonresponse.longitude;
      let lat= jsonresponse.latitude;
      let city = jsonresponse.city;
  
      initMap(lat, lng)
      events(city)

});
};

function events(city) {
  fetch(`https://concerts-artists-events-tracker.p.rapidapi.com/location?name=${city}&minDate=2023-05-11&maxDate=2023-05-12&page=1`, options)
	.then(response => response.json())
  .then(response => {
    console.log(response.data);
    console.log(response)
    let data = response.data;
    let html = '';
    data.forEach(item => {
      html +=  `
        <div class="cards">
          
          <img src=${item.image} alt="img" class="images">
          <h2 class="name">${item.name}</h2>
          <p class="city">City: ${item.location.address.addressLocality}</p>
          <p class="streetname">Street name: ${item.location.address.streetAddress}</p>
          <p class="location">Postal code: ${item.location.address.postalCode}</p>
          <p class="eventplace">Event place: ${item.location.name}</p>
          <p class="date">Date: ${item.startDate}</p>
          <p class="description">Description: ${item.description}</p>
         
          <p>Website:<a class="description" href="${item.location.sameAs}">${item.location.sameAs}</a></p>
        </div>
      `;

    });
    document.getElementById("root").innerHTML = html;
    document.getElementById("location").innerHTML = locationName;
    document.getElementById("date").innerHTML = date;

  })
  .catch(err => console.error(err));

  
}


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


