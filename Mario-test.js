
// Wlodek's Input - Location based on IP 
ipLocate();

function ipLocate() {
  fetch("https://ipgeolocation.abstractapi.com/v1/?api_key=5843dce2715140eca64c3152ccff5fb3")
.then((response) => response.json())
.then(function (jsonresponse) {
      console.log(jsonresponse)
      console.log(jsonresponse.city)    
      let city = jsonresponse.city;
      events(city)
});
  
}

// Concerts - Artists Events Tracker API Documentation
// Access live, upcoming and past music events by location, venue and artist name.
// https://rapidapi.com/s.mahmoud97/api/concerts-artists-events-tracker/
// Entertainment/Events API endpoint
let options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '3305c8d758msh96587b8a3306f7ep1d1bafjsn300995769472',
		'X-RapidAPI-Host': 'concerts-artists-events-tracker.p.rapidapi.com'
	}
};

// Fetch method return API entertainment data
function events(city) {
  fetch(`https://concerts-artists-events-tracker.p.rapidapi.com/location?name=${city}&minDate=2023-05-11&maxDate=2023-05-12&page=1`, options)
	.then(response => response.json())
  .then(response => {
    console.log(response.data);
    let data = response.data;
    let html = '';
    data.forEach(item => {
      html +=  `
     
      <div class="cards">
      <img src=${item.image} alt="img" class="images">
      <h2 class="name">${item.name}</h2>
      <p class="city">City: ${item.location.address.addressLocality}</p>
      <p class="streetname">Street name: ${item.location.address.streetAddress}, ${item.location.address.postalCode}</p>
      
      <p class="eventplace">Event place: ${item.location.name}</p>
      <p class="date">Date: ${item.startDate}</p>
      <p class="description">Description: ${item.description}</p>
      <p>Website:<a target="_blank" class="description" href="${item.location.sameAs}">${item.location.sameAs}</a></p>
      </div>
      `;
      
    });
    
      // let strDate = 'YYYY-MM-DDTHH:MM:SS';
      // let date = new Date(strDate);
      // console.log(date.toUTCString());

   

    document.getElementById("root").innerHTML = html;
    document.getElementById("location").innerHTML = locationName;
document.getElementById("date").innerHTML = date;

  })
  .catch(err => console.error(err));

}
  
  //Radio station API optional

// let options2 = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '3305c8d758msh96587b8a3306f7ep1d1bafjsn300995769472',
// 		'X-RapidAPI-Host': '50k-radio-stations.p.rapidapi.com'
// 	}
// };

// fetch('https://50k-radio-stations.p.rapidapi.com/get/channels?keyword=a&country_id=50&page=1', options2)
// 	.then(response => response.json())
// 	.then(response => 
//     console.log(response))
//     let data2 = response.data
//     let html = '';
//     data.forEach(item2 => {
//       html +=  `
//        <div class="cards2">
          
//       <img src=${item2.image} alt="img" class="images"></div>`;
//     });






    
  

//   $("#").on("click", function(event) {
//   })

// get IP from user 
//   var userIP = $("#userIp").val();








