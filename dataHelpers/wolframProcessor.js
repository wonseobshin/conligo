const dataJson = require('../wolframSample.json');
/*   
const apiKey = require('wolfapi.key');
function searchWolfram(params) {
let searchParamaters = params.split(' ').join('+');
let apiQuery = `http://api.wolframalpha.com/v2/query?appid=${apiKey}&input=${searchParamaters}&includepodid=Result&output=json`



*/
const results = dataJson.queryresult
const allResults = [];
if(results.success) {
    results.assumptions.values.forEach(element => {
        // console.log(element.name)
        allResults.push(element.name);    
    });
    console.log(allResults);
    return allResults;
} else {
    console.log('No match found');
    return false;
}
}