
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
  
  fetch(`https://concerts-artists-events-tracker.p.rapidapi.com/location?name=${city}&minDate=2023-02-09&maxDate=2023-02-10&page=1`, options)
	.then(response => response.json())
  .then(response => {
    console.log(response.data);
    let data = response.data;
    let html = '';
    data.forEach(item => {
      html +=  `
      
      <div class="card" style="width: 18rem;">
      <img src=${item.image} alt="img" class="images">
      <div class="card-body">
        <h5 class="name">${item.name}</h5>
        <p class="city">${item.location.address.addressLocality} - ${item.location.name}</p>
        <p class="date">Date: ${item.startDate.slice(0, -14)} ${item.startDate.slice(11, -8)} </p>
        <a href="${item.location.sameAs}" target="_blank" class="btn btn-outline-danger">More Info</a>
      </div>
    </div>
      `;
    });
    
    document.getElementById("root").innerHTML = html;
    
  })
  .catch(err => console.error(err));
  
}


//Events displayed based on user city input 
let button = document.querySelector(".button-search");
let inputValue = document.querySelector(".inputValue");
let inputValue2 = document.querySelector(".inputValue2");
let inputValue3 = document.querySelector(".inputValue3");
button.addEventListener('click', function(){
  fetch(`https://concerts-artists-events-tracker.p.rapidapi.com/location?name=${inputValue.value}&minDate=${inputValue2.value}&maxDate=${inputValue3.value}&page=1`, options)
	.then(response => response.json())
  .then(response => {
    console.log(response.data);
    let data = response.data;
    let html = '';
    data.forEach(item => {
      html +=  `
      
      <div class="card" style="width: 18rem;">
      <img src=${item.image} alt="img" class="images">
      <div class="card-body">
        <h5 class="name">${item.name}</h5>
        <p class="city">${item.location.address.addressLocality} - ${item.location.name}</p>
        <p class="date">Date: ${item.startDate.slice(0, -14)} ${item.startDate.slice(11, -8)} </p>
       
        <a href="${item.location.sameAs}" target="_blank" class="btn btn-outline-danger">More Info</a>
      </div>
    </div>
      `;
    });
    
    document.getElementById("root").innerHTML = html;
  })
  .catch(err => console.error(err));
  
});






// <div class="cards">
// <img src=${item.image} alt="img" class="images">
// <h2 class="name">${item.name}</h2>
// <p class="city">${item.location.address.addressLocality} - ${item.location.name}</p>
// <p class="date">Date: ${item.startDate}</p>

// <button class="website-button"><a target="_blank" class="description" href="${item.location.sameAs}">Buy tickets</a></button>
// </div>

//<p class="description">Description: ${item.description}</p>





