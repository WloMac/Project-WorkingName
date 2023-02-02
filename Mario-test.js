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

fetch('https://concerts-artists-events-tracker.p.rapidapi.com/location?name=Paris&minDate=2023-05-20&maxDate=2023-05-21&page=1', options)
	.then(response => response.json())
  .then(response => {
    console.log(response.data);
    let data = response.data;
    let html = '';
    data.forEach(item => {
      html += `
        <div>
          <h2>${item.name}</h2>
          <p>Location: ${item.location.name}</p>
          <p>Date: ${item.startDate}</p>
          <p>Date: ${item.description}</p>
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








