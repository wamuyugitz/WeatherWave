// Function to handle the weather response and update the UI elements with the current weather data
function searchTemp(response) {
  // Get and display the current temperature
  let temperature = Math.round(response.data.temperature.current);
  let tempDisplay = document.querySelector("#temperature-number");
  tempDisplay.innerHTML = temperature;

  // Get and display the current weather condition description
  let condition = response.data.condition.description;
  let conditionDisplay = document.querySelector("#condition");
  conditionDisplay.innerHTML = condition;

  // Get and display the humidity level
  let humidity = response.data.temperature.humidity;
  let humidityDisplay = document.querySelector("#highlight");
  humidityDisplay.innerHTML = humidity;

  // Get and display the wind speed
  let wind = response.data.wind.speed;
  let windDisplay = document.querySelector("#wind");
  windDisplay.innerHTML = wind;

  // Get and display the weather icon
  let iconElement = document.querySelector(".icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="icon" />`;

  // Fetch and display the weather forecast for the city
  getForecast(response.data.city);
  console.log(response);
}

// Function to handle the form submission, fetch weather data for the entered city
function searchCity(event) {
  event.preventDefault();

  // Get the city name from the input field and format it
  let input = document.querySelector(`input[type="text"]`).value;
  let city = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
  let searchCity = document.querySelector("#city-name");
  searchCity.innerHTML = city;

  // Define the API key and URL for fetching current weather data
  let apiKey = "37cd3f9c1430f3e46of94bedt858da40";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  // Make the API request and handle the response
  axios.get(apiUrl).then(searchTemp);
}

// Add event listener to the form submission button
let formbtn = document.querySelector("form");
formbtn.addEventListener("submit", searchCity);

// Get the current date and time to display on the UI
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[now.getDay()];
let hour = now.getHours();
let minutes = now.getMinutes();

if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentTime = document.querySelector("#time");
currentTime.innerHTML = `${currentDay} ${hour}:${minutes}`;

// Function to format the Unix timestamp to a day of the week
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
  return days[date.getDay()];
}

// Function to fetch the weather forecast data for the city
function getForecast(city) {
  let apiKey = "37cd3f9c1430f3e46of94bedt858da40";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
  console.log(apiUrl);
}

// Function to display the weather forecast data
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHtml = "";

  // Loop through the forecast data and generate HTML for each day
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      // Display only 5 days of forecast
      forecastHtml += `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>
        <div class="weather-forecast-icon">
          <img src="${day.condition.icon_url}" />
        </div>
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}&deg;</strong>
          </div>
          ${Math.round(day.temperature.minimum)}&deg;
        </div>
      </div>`;
    }
  });

  // Update the forecast section with the generated HTML
  forecastElement.innerHTML = forecastHtml;
}

// Function to load the weather data for a default city when the page loads
function loadDefaultCity() {
  let defaultCity = "Paris"; // You can change this to any default city
  let apiKey = "37cd3f9c1430f3e46of94bedt858da40";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${defaultCity}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(searchTemp);
}

// Event listener to load the default city weather data once the DOM content is loaded
document.addEventListener("DOMContentLoaded", loadDefaultCity);
