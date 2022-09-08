let now = new Date();
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];
  let todaydate = date.getDate();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let formattedDate = `${day}, ${month} ${todaydate}, ${hours}:${minutes}`;
  return formattedDate;
}

let specialDay = document.querySelector("strong#special");
specialDay.innerText = formatDate(new Date());

function showTown(event) {
  event.preventDefault();
  let monday = document.querySelector("#town");
  monday.innerText = document.querySelector("input").value;
}

let button = document.querySelector("#submit");
button.addEventListener("click", showTown);

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

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

function showWeather(response) {
  let town = document.querySelector("#town");
  let hum = document.querySelector("#hum");
  let wind = document.querySelector("#wind");
  let temp = document.querySelector("#temperature");
  let iconElement = document.querySelector("#icon");
  let temperature = Math.round(response.data.main.temp);
  town.innerHTML = response.data.name;
  temp.innerHTML = temperature;
  hum.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  icon = response.data.weather[0].icon;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );
}

function retrieveInputPosition(position) {
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let name = document.querySelector("input").value;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

let input = document.querySelector("#submit");
input.addEventListener("click", retrieveInputPosition);

function retrievePosition(position) {
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

function searchCity(city) {
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

document
  .querySelector("#current_submit")
  .addEventListener("click", getCurrentLocation);

searchCity("Kyiv");
