let bigIcon = document.querySelector("#big-icon");
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

//Buttons, c y f
let todayTemperature = document.querySelector("#today-temperature");
let averageTemperature = document.querySelector("#average-temperature");
function celsius() {
  todayTemperature.innerHTML = "20º";
  averageTemperature.innerHTML = "5º/ 25º";
}
function farenheit() {
  todayTemperature.innerHTML = "68º";
  averageTemperature.innerHTML = "41º/ 77º";
}
let celsiusButton = document.querySelector("#celsius-button");
let farenheitButton = document.querySelector("#farenheit-button");
celsiusButton.addEventListener("click", celsius);
farenheitButton.addEventListener("click", farenheit);

//* search engine searchbar
function temperatureChange(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureMin = Math.round(response.data.main.temp_min);
  let temperatureMax = Math.round(response.data.main.temp_max);
  todayTemperature.innerHTML = `${temperature}º`;
  averageTemperature.innerHTML = `${temperatureMin}º/ <strong>${temperatureMax}º</strong>`;
  let otherInfo = document.querySelector("#description");
  otherInfo.innerHTML = `${response.data.weather[0].main}`;
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
  let temperature = Math.round(response.data.main.temp);
  let temperatureMin = Math.round(response.data.main.temp_min);
  let temperatureMax = Math.round(response.data.main.temp_max);
  todayTemperature.innerHTML = `${temperature}º`;
  averageTemperature.innerHTML = `${temperatureMin}º/ <strong>${temperatureMax}º</strong>`;
  city.innerHTML = `${response.data.name}`;
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
