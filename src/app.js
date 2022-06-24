function formateDate(timestamp) {
  let today = new Date(timestamp);
  let hours = today.getHours();
  let min = String(today.getMinutes()).padStart(2, "0");
  let segundos = String(today.getSeconds()).padStart(2, "0");
  return `Last updated time: ${hours}:${min}:${segundos}`;
}
function getForecast(coordinates) {
  let apiKey = "9e503cb340e36b37cd62954f8e718ac7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function two(result) {
  celsiusTemperature = result.data.main.temp;
  let city2 = document.querySelector("#location");
  let temperature = Math.round(celsiusTemperature);
  let temp = document.querySelector("#number");
  let condition = document.querySelector("#condition");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let time = document.querySelector("#time");
  let icon = document.querySelector("#icon");

  city2.innerHTML = `${result.data.name}`;
  temp.innerHTML = `${temperature}`;
  time.innerHTML = formateDate(result.data.dt * 1000);
  condition.innerHTML = `${result.data.weather[0].description}`;
  humidity.innerHTML = `Humidity: ${result.data.main.humidity}%`;
  wind.innerHTML = `Wind:${Math.round(result.data.wind.speed)}mph`;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${result.data.weather[0].icon}@2x.png`
  );
  getForecast(result.data.coord);
}
function one(event) {
  event.preventDefault();
  let entercity = document.querySelector("#city");
  let city = entercity.value;
  let apiKey = "9e503cb340e36b37cd62954f8e718ac7";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9e503cb340e36b37cd62954f8e718ac7&units=imperial`;
  axios.get(apiURL).then(two);
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function displayForecast(response) {
  let forecast2 = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast2.forEach(function (forecastDay, index) {
    if (index > 0) {
      forecastHTML =
        forecastHTML +
        `
     <div class="col-2"> 
       <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
       <img 
         src="http://openweathermap.org/img/wn/${
           forecastDay.weather[0].icon
         }@2x.png" 
         alt=""
         width="42"
         />
       <div class="weather-forecast-temp">
        <span class="max">${Math.round(forecastDay.temp.max)}°</span>
        <span class="min">${Math.round(forecastDay.temp.min)}°</span>
      </div>
    </div>
   `;
    }
    console.log(forecastDay.dt);
  });

  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

let gobutton = document.querySelector("#search");
gobutton.addEventListener("submit", one);

let hoy = document.querySelector("#date");
let now = new Date();
let day = now.getDate();
let mes = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = mes[now.getMonth()];
let year = now.getFullYear();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let dia = days[now.getDay()];
hoy.innerHTML = `Date: ${month} ${dia} ${day}, ${year}`;
