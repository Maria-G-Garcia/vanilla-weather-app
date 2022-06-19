function formateDate(timestamp) {
  let today = new Date(timestamp);
  let hours = today.getHours();
  let min = String(today.getMinutes()).padStart(2, "0");
  let segundos = String(today.getSeconds()).padStart(2, "0");
  return `Last updated time: ${hours}:${min}:${segundos}`;
}

function two(result) {
  console.log(result);
  let city2 = document.querySelector("#location");
  let temperature = Math.round(result.data.main.temp);
  let temp = document.querySelector("#number");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let time = document.querySelector("#time");
  wind.innerHTML = `Wind: ${result.data.wind.speed}km/h`;
  city2.innerHTML = `${result.data.name}`;
  temp.innerHTML = `${temperature}`;
  humidity.innerHTML = `Humidity: ${result.data.main.humidity}%`;
  time.innerHTML = formateDate(result.data.dt * 1000);
}
function one(event) {
  event.preventDefault();
  let entercity = document.querySelector("#city");
  let city = entercity.value;
  let apiKey = "9e503cb340e36b37cd62954f8e718ac7";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9e503cb340e36b37cd62954f8e718ac7&units=metric`;
  axios.get(apiURL).then(two);
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
