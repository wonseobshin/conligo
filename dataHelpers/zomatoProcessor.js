require('dotenv').config();
const apiKey = process.env.zomatoAPI;

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

// router.get("https://developers.zomato.com/api/v2.1/search?q="+query, (req,res) => {

// })
/*waApi.getFull({
    input: wolfSearch,
    format: 'plaintext',
    output: 'json'
  }).then((queryresult) => {
    let allResults = [];
    if(queryresult.success) {
        const resultString = queryresult.datatypes;
        const resultArray = resultString.split(',');
       resultArray.forEach(element => {
            console.log('checking - ', element); // Check its working correctly
            if (element === 'Book' || element === 'Movie' || element === 'TelevisionProgram') {
                allResults.push(element);
            }
        });
        if (allResults.length < 1) {
            allResults = false;
        }
        console.log('Returning:', allResults);
        return allResults;
    } else {
        console.log('No match found');
        return false;
    }
  }).catch(console.error)
*/
