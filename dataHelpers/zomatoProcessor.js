require('dotenv').config();
const apiKey = process.env.zomatoAPI;

const https = require('https');

module.exports = (zomatoSearch) => {
  return new Promise((resolve) => {
    const query = zomatoSearch.split(' ').join('%20');
    https.get(`https://developers.zomato.com/api/v2.1/search?q=${query}&lat=49.2811&lon=-123.1149&radius=100000&apikey=${apiKey}`, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        console.log("search complete!");
        if (JSON.parse(data).results_found !== 0 && JSON.parse(data).results_found !== undefined) {
          resolve(['Restaurant']);
        } else {
          resolve(false);
        }
      });
    }).on("error", (err) => {
      console.error('error: ', err);
    });
  }
  )
}
