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

fetch('https://concerts-artists-events-tracker.p.rapidapi.com/location?name=Paris&minDate=2023-05-20&maxDate=2023-05-30&page=1', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
    



