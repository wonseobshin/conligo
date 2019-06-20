require('dotenv').config();
const apiKey = process.env.zomatoAPI2;

const https = require('https');
const query = process.argv.slice(2).toString().split(' ').join('%20');

https.get(`https://developers.zomato.com/api/v2.1/search?q=${query}&lat=49.2811&lon=-123.1149&radius=100000&apikey=${apiKey}`, (res) => {
  let data = '';
  console.log('seaching for:', query);

  // res.on('data', (d) => {
  //   process.stdout.write(JSON.parse(d));
  // });

  res.on('data', (chunk) => {
    // console.log(chunk);
    data += chunk;
  });

  res.on('end', () => {
    console.log("search complete!");
    if(JSON.parse(data).results_found !== 0 && JSON.parse(data).results_found !== undefined){
      console.log(`
        found!
        `);
    } else {
      console.log('not found!');
    }
  });

}).on("error", (err) => {
  console.log('error: ',err);
});



/*
//////// couldnt get routes to work //////////
// const express = require('express');
// const router  = express.Router();

const query = process.argv.slice(2).toString().split(' ').join('%20');
console.log("searching for: ", query);

module.exports = () => {
  return {
    postTodo: (newTodo, cb) => {
      //in the future insert data into database
    },
    getTodo: (cb) => {
      $.getJSON("https://developers.zomato.com/api/v2.1/search?q="+query, (res) => {
        console.log("HERE");
        console.log(res);
        cb(res);
      });
    }
  }
}
*/

