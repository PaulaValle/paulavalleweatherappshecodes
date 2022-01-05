let apiKey = "2f1b841a3b6dc609cb8924e01b3900c6";
// new Date
let otherInfo = document.querySelector("#second-grade-info");
let dateMonth = document.querySelector("#date-month");
let now = new Date();
let date = now.getDate();
let year = now.getFullYear();
let hours = now.getHours();
let minutes = now.getMinutes();
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
dateMonth.innerHTML = `${date}, ${day}, ${hours}:${minutes}`;
//* forecast
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let daysWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  daysWeek.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2 weekdays">
      <div class="weather-day">${day}</div>
      <img
      src="http://openweathermap.org/img/wn/50d@2x.png"
      alt=""
      width="50"/>
      <div class="week-temperatures">
        <span class="weektemp-min"> 5° </span>
        <span class="weektemp-max"> 25° </span>
      </div>
    </div>`;
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
  });
}
displayForecast();
//* search engine searchbar
function temperatureChange(response) {
  celsiusTemperature = Math.round(response.data.main.temp);
  celsiusAverageMin = Math.round(response.data.main.temp_min);
  celsiusAverageMax = Math.round(response.data.main.temp_max);

  let temperature = Math.round(response.data.main.temp);
  let temperatureMin = Math.round(response.data.main.temp_min);
  let temperatureMax = Math.round(response.data.main.temp_max);
  todayTemperature.innerHTML = `${temperature}º`;
  averageTemperature.innerHTML = `${temperatureMin}º/ <strong>${temperatureMax}º</strong>`;
  let otherInfo = document.querySelector("#description");
  otherInfo.innerHTML = `${response.data.weather[0].main}`;
  let wind = document.querySelector("#wind");
  let windInfo = Math.round(response.data.wind.speed);
  wind.innerHTML = `${windInfo} km/h`;
  let icon = document.querySelector("#big-icon");
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", `${response.data.weather[0].main}`);
}
function cityChange(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city-input");
  city.innerHTML = `${searchInput.value}`;
  let unitMetric = "units=metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&${unitMetric}`;
  axios.get(apiUrl).then(temperatureChange);
}
let city = document.querySelector("#city");
let searchBar = document.querySelector("#search-bar");
searchBar.addEventListener("submit", cityChange);
//* search engine current
function show(response) {
  celsiusTemperature = Math.round(response.data.main.temp);
  celsiusAverageMin = Math.round(response.data.main.temp_min);
  celsiusAverageMax = Math.round(response.data.main.temp_max);
  todayTemperature.innerHTML = `${celsiusTemperature}º`;
  averageTemperature.innerHTML = `${celsiusAverageMin}º/ <strong>${celsiusAverageMax}º</strong>`;
  city.innerHTML = `${response.data.name}`;
  let windInfo = document.querySelector("#wind");
  windInfo.innerHTML = `${response.data.wind.speed}`;
  let otherInfo = document.querySelector("#description");
  otherInfo.innerHTML = `${response.data.weather[0].main}`;
  let icon = document.querySelector("#big-icon");
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", `${response.data.weather[0].main}`);
}
function currentPlace(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let unitMetric = "units=metric";
  let apiUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&${unitMetric}`;
  axios.get(apiUrlCurrent).then(show);
}
function getPlace() {
  navigator.geolocation.getCurrentPosition(currentPlace);
}
let currentButton = document.querySelector(".currentbutton");
currentButton.addEventListener("click", getPlace);

//Buttons, c y f
let todayTemperature = document.querySelector("#today-temperature");
let averageTemperature = document.querySelector("#average-temperature");
function celsius(event) {
  event.preventDefault();
  todayTemperature.innerHTML = `${celsiusTemperature}º`;
  averageTemperature.innerHTML = `${celsiusAverageMin}º / <strong>${celsiusAverageMax}º</strong>`;
  farenheitButton.classList.remove("active");
  celsiusButton.classList.add("active");
}
function farenheit(event) {
  event.preventDefault();
  let farenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  let farenheitTempAverageMin = (celsiusAverageMin * 9) / 5 + 32;
  let farenheitTempAverageMax = (celsiusAverageMax * 9) / 5 + 32;
  farenheitTemp = Math.round(farenheitTemp);
  let farenheitTempToday = `${farenheitTemp}º`;
  farenheitTempAverageMin = Math.round(farenheitTempAverageMin);
  farenheitTempAverageMax = Math.round(farenheitTempAverageMax);
  let farenheitTempAverage = `${farenheitTempAverageMin}º / <strong>${farenheitTempAverageMax}º</strong>`;
  todayTemperature.innerHTML = farenheitTempToday;
  averageTemperature.innerHTML = farenheitTempAverage;
  celsiusButton.classList.remove("active");
  farenheitButton.classList.add("active");
}
let celsiusTemperature = null;
let celsiusAverageMin = null;
let celsiusAverageMax = null;

let celsiusButton = document.querySelector("#celsius-button");
let farenheitButton = document.querySelector("#farenheit-button");
celsiusButton.addEventListener("click", celsius);
farenheitButton.addEventListener("click", farenheit);

// current on load
window.onload = getPlace;
