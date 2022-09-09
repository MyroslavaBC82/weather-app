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

function formateDay(timestamp) {
  let Dat = new Date(timestamp * 1000);
  let day = getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
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

function display_forecust(response) {
  let forec = response.data.daily;
  let forecustElement = document.querySelector("#forecast");
  let forecustHTML = `<div class="row">`;
  forec.forEach(function (forecustday, index) {
    if (index < 6) {
      forecustHTML =
        forecustHTML +
        `<div class="col-2">
            <div class="card">
              <div class="card-body">
                <h6 class="card-title">${formateDay(forecustday.dt)}</h6>
                <p class="card-temperarure minimum">${Math.round(
                  forecustday.temp.min
                )}° / <b class="maximum">${Math.round(
          forecustday.temp.max
        )}°</b></p>
                <hr/>
                <p class="card-icon"><img src="http://openweathermap.org/img/wn/${
                  forecustday.weather[0].icon
                }@2x.png" width="42"/></p>
              </div>
            </div>
      </div>`;
    }
  });

  forecustHTML = forecustHTML + `</div>`;
  forecustElement.innerHTML = forecustHTML;
}

function getco(coordinates) {
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(display_forecust);
}

function showWeather(response) {
  let town = document.querySelector("#town");
  let descriptionElement = document.querySelector("#description");
  let hum = document.querySelector("#hum");
  let wind = document.querySelector("#wind");
  let temp = document.querySelector("#temperature");
  let iconElement = document.querySelector("#icon");
  celsiusTemperature = response.data.main.temp;
  let temperature = Math.round(celsiusTemperature);
  descriptionElement.innerHTML = response.data.weather[0].description;
  town.innerHTML = response.data.name;
  temp.innerHTML = temperature;
  hum.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  icon = response.data.weather[0].icon;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );
  getco(response.data.coord);
}

function retrieveInputPosition(position) {
  let apiKey = "419c151ad7ec610b15ce4014d6337c5f";
  let name = document.querySelector("input").value;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

let input = document.querySelector("#submit");
input.addEventListener("click", retrieveInputPosition);

function retrievePosition(position) {
  let apiKey = "419c151ad7ec610b15ce4014d6337c5f";
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

let celsiusTemperature = null;

document
  .querySelector("#current_submit")
  .addEventListener("click", getCurrentLocation);

searchCity("Kyiv");
