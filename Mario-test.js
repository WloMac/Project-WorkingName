// Concerts - Artists Events Tracker API Documentation
// Access live, upcoming and past music events by location, venue and artist name.
// https://rapidapi.com/s.mahmoud97/api/concerts-artists-events-tracker/

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '3305c8d758msh96587b8a3306f7ep1d1bafjsn300995769472',
		'X-RapidAPI-Host': 'concerts-artists-events-tracker.p.rapidapi.com'
	}
};

fetch('https://concerts-artists-events-tracker.p.rapidapi.com/location?name=Paris&minDate=2023-05-11&maxDate=2023-05-12&page=1', options)
	.then(response => response.json())
  .then(response => {
    console.log(response.data);
    let data = response.data;
    let html = '';
    data.forEach(item => {
     
      html +=  `
        <div class="cards">
          <h2 class="name">${item.name}</h2>
          <img src=${item.image} alt="img" class="images">
          <p class="countryName">Country: ${item.location.address.addressCountry}</p>
          <p class="countryName">City: ${item.location.address.addressLocality}</p>
          <p class="countryName">Street name: ${item.location.address.streetAddress}</p>
          <p class="location">Postal code: ${item.location.address.postalCode}</p>
          <p class="location">Event place: ${item.location.name}</p>
          <p class="date">Date: ${item.startDate}</p>
          <p class="description">Description: ${item.description}</p>
          <p class="description">Event status: ${item.eventStatus}</p>
          <p class="description">Website: ${item.location.sameAs}</p>

          
        </div>
      `;
    });
    document.getElementById("root").innerHTML = html;
    document.getElementById("location").innerHTML = locationName;
document.getElementById("date").innerHTML = date;



  })
  .catch(err => console.error(err));



//   $("#").on("click", function(event) {
//   })

// get IP from user 
//   var userIP = $("#userIp").val();








