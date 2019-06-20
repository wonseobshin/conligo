
// console.log('test')
// Create client with a Promise constructor
const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyCuY36KPHlUMYyUlIvGDhhgqiPvt0ZWjws',
  Promise: Promise // 'Promise' is the native constructor.
});
// console.log(googleMapsClient)
// Geocode an address with a promise
googleMapsClient.findPlace({input: 'Vancouver Art Gallery', inputtype: 'textquery'}).asPromise()
  .then((response) => {
    console.log(response.json.results);
  })
  .catch((err) => {
    console.log(err);
  });

