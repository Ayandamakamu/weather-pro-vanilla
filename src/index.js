function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  let hours = String(date.getHours()).padStart(2, "0");
  let minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day} ${hours}:${minutes}`;
}

function refreshWeather(response) {
  let data = response.data;

  document.querySelector("#city").innerHTML = data.city;
  document.querySelector("#temperature").innerHTML = Math.round(
    data.temperature.current
  );
  document.querySelector("#description").innerHTML =
    data.condition.description;
  document.querySelector("#humidity").innerHTML = `${data.temperature.humidity}%`;
  document.querySelector("#wind-speed").innerHTML = `${data.wind.speed}km/h`;
  document.querySelector("#time").innerHTML = formatDate(data.time);

  document.querySelector(
    "#icon"
  ).innerHTML = `<img src="${data.condition.icon_url}" class="weather-app-icon" />`;

  getForecast(data.city);
}

function searchCity(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml += `
        <div class="weather-forecast-day">
          <div class="weather-forecast-date">${formatDay(day.time)}</div>
          <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
          <div class="weather-forecast-temperatures">
            <strong>${Math.round(day.temperature.maximum)}°</strong>
            <span>${Math.round(day.temperature.minimum)}°</span>
          </div>
        </div>
      `;
    }
  });

  document.querySelector("#forecast").innerHTML = forecastHtml;
}

document
  .querySelector("#search-form")
  .addEventListener("submit", handleSearchSubmit);

searchCity("Paris");
