function searchTemp(response) {
  let temperature = Math.round(response.data.temperature.current);
  let tempDisplay = document.querySelector("#temperature-number");
  tempDisplay.innerHTML = temperature;

  let condition = response.data.condition.description;
  let conditionDisplay = document.querySelector("#condition");
  conditionDisplay.innerHTML = condition;

  let humidity = response.data.temperature.humidity;
  let humidityDisplay = document.querySelector("#highlight");
  humidityDisplay.innerHTML = humidity;

  let wind = response.data.wind.speed;
  let windisplay = document.querySelector("#wind");
  windisplay.innerHTML = wind;

  let iconElement = document.querySelector(".icon");

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="icon" />`;

  console.log(response);
}

function searchCity(event) {
  event.preventDefault();

  let input = document.querySelector(`input[type="text"]`).value;
  let city = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
  let searchCity = document.querySelector("#city-name");

  searchCity.innerHTML = city;

  let apiKey = "37cd3f9c1430f3e46of94bedt858da40";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios.get(apiUrl).then(searchTemp);
}

let formbtn = document.querySelector("form");
formbtn.addEventListener("submit", searchCity);

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
