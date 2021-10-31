const temperature = document.querySelector('.temperature');
const icon = document.querySelector('img');
const API_KEY = "b5e108b133efdb36384b821ad7ad5315";
const submitButton = document.querySelector('.submit-btn')
//let cityName = prompt("What city are you in?");
let cityName = "Denver"; //default
let fahrenheit = 0;

//check URL for pre-defined parameters
const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
if (urlParams.has('name')) {
  cityName = urlParams.get('name');
}
console.log(cityName);

fetch('http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&APPID=' + API_KEY + '&units=metric', {mode: 'cors'})
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
          fahrenheit = Math.round(response.main.temp * (9 / 5) + 32);
          
          //sends the current weather status (i.e. "Clouds", "Clear", "Rain")
          //to the updatePage function
          updatePage(response.weather[0].main);
          temperature.innerHTML = fahrenheit;
          console.log(response);
          console.log(response.weather[0].main)
      })
      .catch(function(err) {
        console.log(err);

      });

let updatePage = function(weather) {
  updateIcon(weather);
}

let updateIcon = function(weather) {
  icon.src="content/icons/" + weather + ".png";
}

submitButton.addEventListener("click", function() {
  let inputField = document.querySelector('label');
  console.log(inputField);
  cityName = inputField.innerHTML;
});