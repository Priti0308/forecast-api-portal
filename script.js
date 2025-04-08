const API_KEY = "a23e055acae84572a21120535250804";

async function getWeather() {
  const locationInput = document.getElementById("locationInput").value || "India";
  const weatherCard = document.getElementById("weatherCard");

  try {
    const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${locationInput}&days=5&aqi=yes`);
    const data = await res.json();

    document.getElementById("location").innerText = `${data.location.name}, ${data.location.country}`;
    document.getElementById("datetime").innerText = `${data.location.localtime}`;
    document.getElementById("temp").innerText = `${data.current.temp_c}°C`;
    document.getElementById("condition").innerText = data.current.condition.text;
    document.getElementById("humidity").innerText = data.current.humidity;
    document.getElementById("wind").innerText = data.current.wind_kph;
    document.getElementById("sunrise").innerText = data.forecast.forecastday[0].astro.sunrise;
    document.getElementById("sunset").innerText = data.forecast.forecastday[0].astro.sunset;

    // Background style based on condition
    const condition = data.current.condition.text.toLowerCase();
    weatherCard.className = "weather-card"; // reset
    if (condition.includes("sunny")) {
      weatherCard.classList.add("sunny");
    } else if (condition.includes("cloudy")) {
      weatherCard.classList.add("cloudy");
    } else if (condition.includes("rain")) {
      weatherCard.classList.add("rainy");
    }

    // Forecast
    const forecastContainer = document.getElementById("forecastContainer");
    forecastContainer.innerHTML = "";
    data.forecast.forecastday.forEach(day => {
      const date = new Date(day.date);
      const shortDay = date.toLocaleString("en-US", { weekday: "short" });
      forecastContainer.innerHTML += `
        <div class="forecast-card">
          <div>${shortDay}</div>
          <img src="https:${day.day.condition.icon}" alt="icon" width="40" />
          <div>${day.day.avgtemp_c}°C</div>
        </div>
      `;
    });

  } catch (err) {
    alert("Location not found. Try again.");
    console.error(err);
  }
}

// Auto load weather for India on start
window.onload = () => getWeather();
