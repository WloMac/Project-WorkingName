
// Wlodek's Input - Location based on IP 
ipLocate();

function ipLocate() {
  fetch("https://ipgeolocation.abstractapi.com/v1/?api_key=5843dce2715140eca64c3152ccff5fb3")
.then((response) => response.json())
.then(function (jsonresponse) {
      let lng = jsonresponse.longitude;
      let lat= jsonresponse.latitude;    
      let city = jsonresponse.city;
      events(city)
      weather(lng, lat)
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

button.addEventListener('click', function(){
  fetch(`https://concerts-artists-events-tracker.p.rapidapi.com/location?name=${inputValue.value}&minDate=2023-02-09&maxDate=2023-02-10&page=1`, options)
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


// ------------------------ Wlodek input ----------------------// 

function weather(lng, lat) {
  fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&timezone=auto&daily=temperature_2m_max,precipitation_sum,windspeed_10m_max,sunrise,sunset`)
	.then(response => response.json())
  .then(response => {
    console.log(response)
    let htmlInput = '';
    htmlInput = document.getElementById("todayWeather");
    let temp = response.daily.temperature_2m_max
    let todayDate = response.daily.time  
    htmlInput.textContent = `Today is ${todayDate[0]},\n with highs of ${temp[0]} °C`

    // let sunset = response.daily.sunset
    // let sunrise = response.daily.sunrise  
    // let wind = response.daily.windspeed_10m_max
    // let forecastDate = response.daily.time
    // let data = response.daily
    // let html3 = '';
    // Object.entries(data.sunset).forEach(item => {
    //   console.log(item)
    //   html3 +=  `
    //     <div class="card" style="width: 18rem;>  
    //       <div class="card-body">  
    //         <h5 class="card-title date"> Date: ${forecastDate[item[0]]}</h5>      
    //         <p class="card-text sunrise">Sunrise:${sunrise[item[0]]}</p>
    //         <p class="card-text sunset">Sunset: ${sunset[item[0]]}</p>                 
    //         <p class="card-text temp">Temp.:${temp[item[0]]}</p>
    //         <p class="card-text wind">Wind: ${wind[item[0]]}</p>
    //       </div>
    //     </div>
    //   `;

    // });
    // document.getElementById("root3").innerHTML = html3;

    
    
    
  })
  
}





// <div class="cards">
// <img src=${item.image} alt="img" class="images">
// <h2 class="name">${item.name}</h2>
// <p class="city">${item.location.address.addressLocality} - ${item.location.name}</p>
// <p class="date">Date: ${item.startDate}</p>

// <button class="website-button"><a target="_blank" class="description" href="${item.location.sameAs}">Buy tickets</a></button>
// </div>

//<p class="description">Description: ${item.description}</p>





