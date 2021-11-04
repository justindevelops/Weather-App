const tempDisplay = document.querySelector('#temperature');
//const icon = document.querySelector('.midImage');
const API_KEY = "b5e108b133efdb36384b821ad7ad5315";
const submitButton = document.querySelector('.submit-btn');

const topTitle = document.querySelector('.topInfo h1');
const topCityName = document.querySelector('.topInfo h5');
const topDateAndTime = document.querySelector('.topInfo h6');

const cellFeelsLike = document.querySelector('.feelsLike h1');
const cellHumidity = document.querySelector('.humidity h1');
const cellRainChance = document.querySelector('.rainChance h1');
const cellWindSpeed = document.querySelector('.windSpeed h1');

let cityName = "Denver"; //default
let temperature = 0;

//weather object
function Weather(temperature, feelsLike, humidity, windSpeed, description) {
  this.temperature = temperature;
  this.feelsLike = feelsLike;
  this.humidity = humidity;
  this.windSpeed = windSpeed;
  this.description = description;
}

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
          temperature = Math.round(response.main.temp * (9 / 5) + 32);
          console.log(response);
          let feelsLike = Math.round(response.main.feels_like * (9 / 5) + 32);
          let humidity = response.main.humidity;
          let windSpeed = response.wind.speed;
          let description = response.weather[0].main;
          const weather = new Weather(temperature, feelsLike, humidity, windSpeed, description);
          
          //sends the current weather status (i.e. "Clouds", "Clear", "Rain")
          //to the updatePage function
          updatePage(weather);
          //tempDisplay.innerHTML = temperature;
          //console.log(response);
          //console.log(response.weather[0].main)
      })
      .catch(function(err) {
        console.log(err);
      });

let updatePage = function(weather) {
  //updateIcon(weather.description);

  //update the three lines at the top of the page
  topTitle.innerHTML = weather.description;
  topCityName.innerHTML = cityName;
  let today = new Date();
  let date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
  topDateAndTime.innerHTML = date

  //update the cells on left and right side of page
  cellFeelsLike.innerHTML = weather.feelsLike + "°";
  cellHumidity.innerHTML = weather.humidity + "%";
  //cellRainChance.innerHTML = weather.rainChance;
  cellWindSpeed.innerHTML = weather.windSpeed + "<br>km/h";

  const node = document.createElement("div");
  node.id = "temperature";
  node.innerHTML = "The current temperature in " + cityName + " is " + weather.temperature + "°.";
  let midContainer = document.querySelector('.midcontainer');
  midContainer.appendChild(node);
  tempDisplay.innerHTML = temperature;
}

let updateIcon = function(description) {
  icon.src="content/icons/" + description + ".png";
}

submitButton.addEventListener("click", function() {
  let inputField = document.querySelector('label');
  console.log(inputField);
  cityName = inputField.innerHTML;
});