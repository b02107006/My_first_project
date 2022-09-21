function formatDate(date) {
  let year = date.getFullYear();
  let dateToday = date.getDate();
  let monthIndex = date.getMonth();
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[monthIndex];
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];
  return `${day}, ${month} ${dateToday}, ${year}`;
}

function displayWeatherCondition(response) {
  //city
  let cityName = response.data.name;
  let description = response.data.weather[0].main;
  document.querySelector(
    "#city"
  ).innerHTML = `It is currently ${description} in ${cityName}`;
  //current temperature
  let currentTemperature = Math.round(response.data.main.temp);
  document.querySelector(
    "#currentTemp"
  ).innerHTML = `${currentTemperature}<span class="deg">&degC</span>`;
  //lowest
  let lowest = Math.round(response.data.main.temp_min);
  document.querySelector("#lowestToday").innerHTML = `${lowest}
              <span class="deg">&degC</span>`;
  //highest
  let highest = Math.round(response.data.main.temp_max);
  document.querySelector("#highestToday").innerHTML = `${highest}
              <span class="deg">&degC</span>`;
  //others
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  document.querySelector(
    "#others"
  ).innerHTML = `Humidity: ${humidity} % <br />Wind: ${wind} m/s`;
}

function searchCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 66;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 19;
}

let dateElement = document.querySelector("#currentTime");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

searchCity("New York");
