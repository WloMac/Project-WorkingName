//Welcome section
let historyBtn = document.getElementById("searchHistory");
let welcomeCity = document.getElementById("welcome");
let searchedHistoryArray =
  JSON.parse(localStorage.getItem("searchHistoryLocal")) || [];

ipLocate();
render();

function render() {
  searchedHistoryArray =
    JSON.parse(localStorage.getItem("searchHistoryLocal")) || [];
  document.getElementById("history").innerHTML = "";

  if (searchedHistoryArray.length < 1) {
    document.getElementById("searchHistory").style.visibility = "hidden";
  } else
  document.getElementById("searchHistory").style.visibility = "visible";
  for (i = 0; i < searchedHistoryArray.length; i++) {
    let historyText = searchedHistoryArray[i];
    let displayText = $("<button>")
      .text(historyText)
      .attr("class", "newButton");
    $("#history").append(displayText);
  }




}


function saveCityHistory(citySearchedFor) {
  if (searchedHistoryArray.length > 4) {
    searchedHistoryArray.unshift([citySearchedFor]);
    searchedHistoryArray.pop();
  } else {
    searchedHistoryArray.unshift([citySearchedFor]);
  }
  localStorage.setItem(
    "searchHistoryLocal",
    JSON.stringify(searchedHistoryArray)
  );
}

function displayBannerInfo(city) {
  let welcomeMessage = "Welcome from " + city;
  welcomeCity.innerHTML = welcomeMessage;
}

// Wlodek's Input - Location based on IP
function ipLocate() {
  fetch(
    "https://ipgeolocation.abstractapi.com/v1/?api_key=5843dce2715140eca64c3152ccff5fb3"
  )
    .then((response) => response.json())
    .then(function (jsonresponse) {
      let lng = jsonresponse.longitude;
      let lat = jsonresponse.latitude;
      let city = jsonresponse.city;
      events(city);
      weather(lng, lat);
      news(city);
      let welcomeMessage = "Welcome from " + city + "!";
      welcomeCity.innerHTML = welcomeMessage;
    });
}

// Concerts - Artists Events Tracker API Documentation
// Access live, upcoming and past music events by location, venue and artist name.
// https://rapidapi.com/s.mahmoud97/api/concerts-artists-events-tracker/
// Entertainment/Events API endpoint
let options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "3305c8d758msh96587b8a3306f7ep1d1bafjsn300995769472",
    "X-RapidAPI-Host": "concerts-artists-events-tracker.p.rapidapi.com",
  },
};

// Fetch method return API entertainment data
function events(city) {
  fetch(
    `https://concerts-artists-events-tracker.p.rapidapi.com/location?name=${city}&minDate=2023-02-09&maxDate=2023-12-31&page=1`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      let data = response.data;
      let html = "";
      data.forEach((item) => {
        html += `
      <div class="card" style="width: 18rem;">
      <img src=${item.image} alt="img" class="images">
      <div class="card-body">
        <h5 class="name">${item.name}</h5>
        <p class="city">${item.location.address.addressLocality} - ${
          item.location.name
        }</p>
        <p class="date">Date: ${item.startDate.slice(
          0,
          -14
        )} ${item.startDate.slice(11, -8)} </p>
        <a href="${
          item.location.sameAs
        }" target="_blank" class="btn btn-outline-danger">More Info</a>
      </div>
    </div>
      `;
      });

      document.getElementById("root").innerHTML = html;
    });
}

//Events displayed based on user city input
let button = document.querySelector(".button-search");
let inputValue = document.querySelector(".inputValue");

button.addEventListener("click", function () {
  let citySearchedFor = inputValue.value;

  getData(citySearchedFor);
});

historyBtn.addEventListener("click", function (event) {
  let citySearchedFor = event.target.innerHTML;
  console.log(citySearchedFor);

  // document.getElementById("todayWeather").innerHTML = "";

  getData(citySearchedFor);
});

function getData(citySearchedFor) {
  saveCityHistory(citySearchedFor);
  news(citySearchedFor);

  fetch(
    // `https://concerts-artists-events-tracker.p.rapidapi.com/location?name=${inputValue.value}&minDate=2023-02-09&maxDate=2023-12-31&page=1`,
    `https://concerts-artists-events-tracker.p.rapidapi.com/location?name=${citySearchedFor}&minDate=2023-02-09&maxDate=2023-12-31&page=1`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      let data = response.data;
      let html = "";
      data.forEach((item) => {
        html += `
      <div class="card" style="width: 18rem;">
      <img src=${item.image} alt="img" class="images">
      <div class="card-body">
        <h5 class="name">${item.name}</h5>
        <p class="city">${item.location.address.addressLocality} - ${
          item.location.name
        }</p>
        <p class="date">Date: ${item.startDate.slice(
          0,
          -14
        )} ${item.startDate.slice(11, -8)} </p>
       
        <a href="${
          item.location.sameAs
        }" target="_blank" class="btn btn-outline-danger">More Info</a>
      </div>
    </div>
      `;
        // let welcomeMessage = "Your chosen city is " + inputValue.value;
        // welcomeCity.innerHTML = welcomeMessage;
        // document.getElementById("todayWeather").innerHTML = "";

        render();
      });

      document.getElementById("root").innerHTML = html;
    })
    .catch((err) => console.error(err));
}


// ------------------------ Wlodek input ----------------------//
// Weather API based on user location
function weather(lng, lat) {
  fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&timezone=auto&daily=temperature_2m_max,precipitation_sum,windspeed_10m_max,sunrise,sunset`
  )
    .then((response) => response.json())
    .then((response) => {
      let htmlInput = "";
      htmlInput = document.getElementById("todayWeather");
      let temp = response.daily.temperature_2m_max;
      let todayDate = response.daily.time;
      htmlInput.textContent = `Your temperature today is: ${temp[0]} °C`;
    });
}


// News API
function news(city) {
  fetch(
    `https://gnews.io/api/v4/search?q=example&lang=en&${city}=us&max=10&apikey=f39b07a04d0b83c6a72db9a261d55526`
  )
    .then((response) => response.json())
    .then((response) => {
      let data = response.articles;
      let html2 = "";

      for (let i = 0; i < 5; i++) {
        const element = data[i];
        html2 += `
        <div class="card" style="width: 75%;">   
          <div class="card-header">       
          <h3 class="title">${data[i].title}</h3>
          </div>
          <div class="card-body">
          <img src=${data[i].image} alt="img" class="images2">
          <h3 class="title2">${data[i].description}</h3>
          <p class="date">Date: ${data[i].publishedAt.slice(0, -10)}</p>  
          <p><a href="${
            data[i].url
          }" target="_blank" class="btn btn-outline-danger">More</a></p>               
          </div>  
        </div>
      `;
      }
      document.getElementById("newsContent").innerHTML = html2;
    });
}


// Weather based on user city input
let button2 = document.querySelector(".button2");
let inputValue2 = document.querySelector(".inputValue2");
let name = document.querySelector(".name");
let desc = document.querySelector(".desc");
let temp = document.querySelector(".temp");
let icon = document.querySelector(".icon");

button2.addEventListener("click", function () {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      inputValue2.value +
      "&units=metric&appid=732a88c6f9f8186453f47b435c9ba5f3"
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let nameValue = data.name;
      let tempValue = "Temp " + data.main.temp.toFixed(1) + "°C";
      let descValue = data.weather[0].description;
      name.innerHTML = nameValue;
      temp.innerHTML = tempValue;
      desc.innerHTML = descValue;
      document.getElementById("icon").src =
        "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
    });
});
