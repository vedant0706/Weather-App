const apiKey = "0fbd8017f511e19e58cf21931a73ce84";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + encodeURIComponent(city) + `&appid=${apiKey}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    const cityEl = document.querySelector(".city");
    const tempEl = document.querySelector(".temp");
    const humidityEl = document.querySelector(".humidity");
    const windEl = document.querySelector(".wind");
    if (!cityEl || !tempEl || !humidityEl || !windEl || !weatherIcon) {
      console.error("One or more DOM elements not found.");
      return;
    }

    cityEl.textContent = data.name || "Unknown";
    tempEl.textContent = `${Math.round(data.main.temp)}°C`; 
    humidityEl.textContent = `${data.main.humidity}%`; 
    windEl.textContent = `${data.wind.speed} km/h`;

    const weatherCondition = data.weather[0]?.main;
    const iconMap = {
      "Clouds": "clouds.png",
      "Clear": "clear.png",
      "Rain": "rain.png",
      "Drizzle": "drizzle.png",
      "Mist": "mist.png"
    };
    weatherIcon.src = iconMap[weatherCondition] || "./images/clouds.png";

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  } catch (error) {
    console.error("Error fetching weather:", error);
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  }
}

// Optional: Schedule weather update at 4:41 PM IST
function scheduleWeatherUpdate() {
  const now = new Date();
  const targetTime = new Date();
  targetTime.setHours(16, 41, 0, 0); // 4:41 PM IST

  if (now > targetTime) {
    targetTime.setDate(targetTime.getDate() + 1);
  }

  const timeUntilTarget = targetTime - now;
  setTimeout(() => {
    checkWeather("Mumbai"); 
    setInterval(() => checkWeather("Mumbai"), 24 * 60 * 60 * 1000); 
  }, timeUntilTarget);
}

document.addEventListener("DOMContentLoaded", () => {
  checkWeather("Mumbai"); 

});

searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city) checkWeather(city);
});