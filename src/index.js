function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);

  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[date.getDay()];

  let hours = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day} ${hours}:${minutes}`;
}

function refreshWeather(response) {
  console.log(response.data);

  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  let detailsElement = document.querySelector(".weather-app-details");
  let iconElement = document.querySelector(".weather-app-icon");

  let temp = response.data.temperature.current || response.data.temperature;
  let humidity = response.data.temperature.humidity;
  let wind = response.data.wind.speed;
  let icon = response.data.condition.icon;

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temp);
  detailsElement.innerHTML = `
      ${formatDate(response.data.time)}<br/>
      <strong>Humidity:</strong> ${humidity}%,
      <strong>Wind:</strong> ${wind} km/h
  `;

  
  iconElement.innerHTML = `
    <img 
      src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${icon}.png" 
      alt="${response.data.condition.description}"
      class="weather-icon"
    />
  `;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
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

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}


function searchCity(city) {
  let apiKey = "9d2c884b070b3efb5t3adc74bo030ac1";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios.get(apiUrl)
    .then(refreshWeather)
    .catch((error) => console.log("API ERROR:", error));
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

document.querySelector("#search-form").addEventListener("submit", handleSearchSubmit);


searchCity("Durban");

