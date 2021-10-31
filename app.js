const temperature = document.querySelector('.temperature');
const icon = document.querySelector('img');
const API_KEY = config.API_KEY;
//let cityName = prompt("What city are you in?");
let cityName = "Denver";
let fahrenheit = 0;

fetch('http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&APPID=' + API_KEY + '&units=metric', {mode: 'cors'})
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
        fahrenheit = Math.round(response.main.temp * (9 / 5) + 32);
        changeIcon(response.weather[0].main);
        temperature.innerHTML = fahrenheit;
        console.log(response);
        console.log(response.weather[0].main)
    });

let changeIcon = function(weather) {
  icon.src="content/icons/" + weather + ".png";
}