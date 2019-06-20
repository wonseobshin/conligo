require('dotenv').config();
const apiKey = process.env.wolfAPI;
const WolframAlphaAPI = require('wolfram-alpha-api');
const waApi = WolframAlphaAPI(apiKey);




const wolfSearch = process.argv.slice(2).toString().split(',').join(' ');

waApi.getFull({
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
