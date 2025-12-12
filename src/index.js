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

  
  document.querySelector("#details").innerHTML = `
    ${formatDate(data.time)}, ${data.condition.description}<br>
    Humidity: <strong>${data.humidity}%</strong>, 
    Wind: <strong>${data.wind.speed}km/h</strong>
  `;


  document.querySelector("#icon").innerHTML = `
    <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${data.condition.icon}.png"
    alt="${data.condition.description}">
  `;
}


function searchCity(city) {
  let apiKey = "9d2c884b070b3efb5t3adc74bo030ac1";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(refreshWeather);
}


document
  .querySelector("#search-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    let city = document.querySelector("#search-form-input").value;
    searchCity(city);
  });


searchCity("Paris");
