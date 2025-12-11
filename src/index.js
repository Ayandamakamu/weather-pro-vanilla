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
