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
        console.log(queryresult)
        queryresult.assumptions.values.forEach(element => {
            console.log('checking - ', element.name);
            if (element.name === 'Book' || element.name === 'Movie') {
                allResults.push(element.name);    
            }
        });
        if (allResults.length < 1) {
            allResults = false;
        }
        console.log(allResults);
        return allResults;
    } else {
        console.log('No match found');
        return false;
    }
  }).catch(console.error)
