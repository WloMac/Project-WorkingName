
// Music Gigs and Concerts Tracker API
// Get the upcoming events from your favorite artists. Retrieve information like where they are going to be presented, with who, and more!

// https://zylalabs.com/api-marketplace/data/music+gigs+and+concerts+tracker+api/94?

let apiKey = '693|gonkN6b3hwr6jJS0IHGk945WurtKPCywRUmSsIsD';

// GET CONCERTS BY LOCATION
// Get a list of events in a determined city or location in a given time range. 

let URL = 'https://zylalabs.com/api/94/music+gigs+and+concerts+tracker+api/149/get+concerts+by+location';

fetch("https://zylalabs.com/api/94/music+gigs+and+concerts+tracker+api/149/get+concerts+by+location??name=Ibiza&minDate=2022-08-05&maxDate=2022-08-10&page=1")
.then(response => response.json())
.then(data => console.log(data))



                                                                            
