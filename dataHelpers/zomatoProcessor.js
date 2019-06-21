require('dotenv').config();
const apiKey = process.env.zomatoAPI;

const https = require('https');

module.exports = (zomatoSearch) => {
  return new Promise((resolve) => {
    const query = encodeURIComponent(zomatoSearch); //.split(' ').join('%20').split('&').join('%26').split('');
    https.get(`https://developers.zomato.com/api/v2.1/search?q=${query}&lat=49.2811&lon=-123.1149&radius=100000&apikey=${apiKey}`, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        console.log("search complete!");
        const result = JSON.parse(data);

        if (result.results_found !== 0 && result.results_found
 !== undefined) {
          result.restaurants.forEach((element) => {
            console.log("FOUND! I'm now searching for name matches...");
            console.log(element.restaurant.name.toLowerCase().split('\'').join(''));
            if (element.restaurant.name.toLowerCase().split('\'').join('').includes(zomatoSearch.toLowerCase())) {
              // return element;

              console.log("name match found! resolving 'restaurants' as category");
              resolve(['Restaurant']);
            } else {
              resolve(false);
            }
          });
          // console.log(restaurant);
        } else {
          resolve(false);
        }
      });
    }).on("error", (err) => {
      console.error('error: ', err);
    });
  })
}
