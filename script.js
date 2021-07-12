/*
live currency:
baseURL + live + '?' + 'access_key=' + key

historical data:
baseURL + 'YYYY-MM-DD' + '?' + 'access_key=' + key

conversion:
baseURL/convert
? access_key= key
& from = BTC
& to = ETH
& amount = amount

time-frame:
baseURL/timeframe
? access_key = key
& start_date = YYYY-MM-DD
& end_date = YYYY-MM-DD
& symbols = BTC,ETH

Change:
baseURL/change
? access_key = key
& start_date = YYYY-MM-DD
& end_date = YYYY-MM-DD
& symbols = BTC,ETH,XRP
*/
const baseURL = 'http://api.coinlayer.com/api/';
const key = 'aedb8261b972fc516f56085ba129e2ae';

let form = document.querySelector('form');
let optionResult = document.createElement('span');
let optionResult1 = document.querySelector(".option-result");
let optionResult2 = document.createElement('span');
let cryptoCode = document.querySelector("#cryptoCode");
let date = document.querySelector("#date");
let date2 = document.querySelector('#dateInput');
let rateResults = document.querySelector("#displayResults");
let result = document.querySelector("#option");

optionResult2.innerText = "Explanation: "

function hideOptions(){
    cryptoCode.style.display = "none";
    date.style.display = "none";
}

window.onload = hideOptions;

function myFunction(){
    if (result.value == 'liveCurrency'){
        optionResult.innerText = "Get the latest crypto rates for all available or a specific set of cryptocurrencies."

        optionResult1.appendChild(optionResult2);
        optionResult1.appendChild(optionResult);
    } else if (result.value == 'historicalData'){
        optionResult.innerText = "Get a query of historical crypto data all the way back to the year 2011."

        optionResult1.appendChild(optionResult2);
        optionResult1.appendChild(optionResult);
    } else if (result.value == 'conversion'){
        optionResult.innerText = "Convert amount between any one cryptocurrency and stadard (fiat) currenty."

        optionResult1.appendChild(optionResult2);
        optionResult1.appendChild(optionResult);
    } else if (result.value == 'timeFrame'){
        optionResult.innerText = "Query for time-series crypto data between two dates of your choice (maximum period: 365 days)."

        optionResult1.appendChild(optionResult2);
        optionResult1.appendChild(optionResult);
    }else if (result.value == 'changeData'){
        optionResult.innerText = "Query fluctuation data for any number of cryptocurrencies within a specific period of time (maximum period: 365 days)."

        optionResult1.appendChild(optionResult2);
        optionResult1.appendChild(optionResult);
    } else if(result.value == "Choose Option") {
        optionResult.innerText = "";
        optionResult2.style.display = "none";
        date.style.display = "none";
    }
}

result.addEventListener('click', addOptions);
form.addEventListener('submit', displayResults);

//Adding and Hiding options needed for each option
function addOptions() {
    if (result.value == "liveCurrency") {
        cryptoCode.style.display = "none";
        date.style.display = "none";
    } else if (result.value == "historicalData") {
        cryptoCode.style.display = "none";
        date.style.display = "inline";
    }
}


function displayResults(e) {
    e.preventDefault();
    if (result.value == "liveCurrency"){
        fetch(`${baseURL}live?access_key=${key}`)
            .then(res => res.json())
            .then(json => displayResultsLiveCurrency(json));
    } else if (result.value == "historicalData"){
        fetch(`${baseURL}${date2.value}?access_key=${key}`)
            .then(res => res.json())
            .then(json => displayResultsHistoricalData(json))
    }
}

//Live Currency displaying
function displayResultsLiveCurrency(json){
    while (rateResults.firstChild) {
        rateResults.removeChild(rateResults.firstChild);
      }
    
    const results = json.rates;

    for (const currency in results){
        if(results.hasOwnProperty(currency)){
            let rates = document.createElement("p");
            rateResults.appendChild(rates);
            rates.innerHTML = `${currency} ${results[currency]}`;
        } 
    }
}

function displayResultsHistoricalData(json){
    while (rateResults.firstChild) {
        rateResults.removeChild(rateResults.firstChild);
      }

    const results = json.rates;

    for (const currency in results){
        if(results.hasOwnProperty(currency)){
            let rates = document.createElement("p");
            rateResults.appendChild(rates);
            rates.innerHTML = `${currency} ${results[currency]}`;
        } 
    }
}