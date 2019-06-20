require('dotenv').config();
const apiKey = process.env.placesAPI;
// console.log('test')
// Create client with a Promise constructor
/*const googleMapsClient = require('@google/maps').createClient({
  key: apiKey,
  Promise: Promise // 'Promise' is the native constructor.
});*/
// console.log(googleMapsClient)
// Geocode an address with a promise
/*
googleMapsClient.findPlace({input: 'Vancouver Art Gallery', inputtype: 'textquery'}, (res, err) => {
  if(err) console.log(err);
  console.log(res);
})
*/
  // .then((response) => {
  //   console.log(response.json.results);
  // })
  // .catch((err) => {
  //   console.log(err);
  // });
const https = require('https');

const query = "Vancouver%20Art%20Gallery"
var url = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?" + "key=" + apiKey + "input=" + query + "inputtype=textquery"
    console.log(url);
  https.get(url, function(response) {
    var body ='';
    response.on('data', function(chunk) {
      body += chunk;
    });

    response.on('end', function() {
      var places = JSON.parse(body);
      var locations = places.results;
      var randLoc = locations[Math.floor(Math.random() * locations.length)];

      res.json(randLoc);
    });
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });
