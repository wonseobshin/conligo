require('dotenv').config();
const apiKey = process.env.zomatoAPI;

const https = require('https');

function normalizeName(name) {
  return name.toLowerCase().split('&').join('').split('\'').join('');
}

module.exports = (zomatoSearch) => {
  return new Promise((resolve) => {
    const query = encodeURIComponent(normalizeName(zomatoSearch));
    https.get(`https://developers.zomato.com/api/v2.1/search?q=${query}&lat=49.2811&lon=-123.1149&radius=100000&apikey=${apiKey}`, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        const result = JSON.parse(data);

        if (result.results_found !== 0 && result.results_found !== undefined) {
          for (const element of result.restaurants) {
            if (normalizeName(element.restaurant.name).includes(normalizeName(zomatoSearch))) {
              resolve(['Restaurant']);
              return;
            };
          }
        }

        resolve(false);
      });
    }).on("error", (err) => {
      console.error('error: ', err);
    });
  })
}
