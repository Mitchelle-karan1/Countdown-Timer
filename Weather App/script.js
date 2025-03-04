const apiKey = "YOUR_API_KEY"; // Replace with your actual API key
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const weatherIcon = document.getElementById("weatherIcon");
const windSpeed = document.getElementById("windSpeed");
const humidity = document.getElementById("humidity");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    fetchWeather(city);
});

async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        updateWeatherUI(data);
    } catch (error) {
        alert(error.message);
    }
}

function updateWeatherUI(data) {
    cityName.textContent = data.name;
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    condition.textContent = `Condition: ${data.weather[0].description}`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
}
const darkModeToggle = document.getElementById("darkModeToggle");

darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

function updateWeatherUI(data) {
    cityName.textContent = data.name;
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    condition.textContent = `Condition: ${data.weather[0].description}`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;

    updateBackground(data.weather[0].main);
}

// Change background based on weather condition
function updateBackground(condition) {
    const body = document.body;
    switch (condition.toLowerCase()) {
        case "clear":
            body.style.backgroundImage = "url('clear-sky.jpg')";
            break;
        case "clouds":
            body.style.backgroundImage = "url('cloudy.jpg')";
            break;
        case "rain":
            body.style.backgroundImage = "url('rainy.jpg')";
            break;
        case "snow":
            body.style.backgroundImage = "url('snow.jpg')";
            break;
        case "thunderstorm":
            body.style.backgroundImage = "url('storm.jpg')";
            break;
        default:
            body.style.backgroundImage = "url('default.jpg')";
    }
    body.style.backgroundSize = "cover";
}

async function fetchForecast(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Could not fetch forecast data.");
        }

        const data = await response.json();
        updateForecastUI(data);
    } catch (error) {
        console.error(error);
    }
}

function updateForecastUI(data) {
    const forecastContainer = document.getElementById("forecastContainer");
    forecastContainer.innerHTML = ""; // Clear previous forecast

    const dailyForecasts = {};
    
    // Filter data to get one forecast per day
    data.list.forEach((forecast) => {
        const date = forecast.dt_txt.split(" ")[0]; // Extract date
        if (!dailyForecasts[date]) {
            dailyForecasts[date] = forecast;
        }
    });

    Object.values(dailyForecasts).forEach((forecast) => {
        const forecastElement = document.createElement("div");
        forecastElement.classList.add("forecast-item");

        forecastElement.innerHTML = `
            <p><strong>${forecast.dt_txt.split(" ")[0]}</strong></p>
            <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png">
            <p>${forecast.weather[0].description}</p>
            <p>${forecast.main.temp}°C</p>
        `;
        forecastContainer.appendChild(forecastElement);
    });
}

// Call fetchForecast when fetching weather
fetchWeather(city).then(() => fetchForecast(city));

document.addEventListener("DOMContentLoaded", () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherByLocation(lat, lon);
        });
    }
});

async function fetchWeatherByLocation(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Location-based weather data not available.");
        }

        const data = await response.json();
        updateWeatherUI(data);
    } catch (error) {
        console.error(error);
    }
}

const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeather API key
const searchButton = document.getElementById("searchButton");
const cityInput = document.getElementById("cityInput");

searchButton.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
        fetchForecast(city);
    } else {
        alert("Please enter a valid city name.");
    }
});

async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        showLoading(true);
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found. Please try again.");
        }

        const data = await response.json();
        updateWeatherUI(data);
        fetchForecast(city); // Fetch forecast for the searched city
    } catch (error) {
        alert(error.message);
    } finally {
        showLoading(false);
    }
}

async function fetchForecast(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Could not fetch forecast data.");
        }

        const data = await response.json();
        updateForecastUI(data);
    } catch (error) {
        console.error(error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                fetchWeatherByLocation(lat, lon);
            },
            () => {
                fetchWeather("Nairobi"); // Default city if user denies location access
                fetchForecast("Nairobi");
            }
        );
    } else {
        fetchWeather("Nairobi");
        fetchForecast("Nairobi");
    }
});

async function fetchWeatherByLocation(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Location-based weather data not available.");
        }

        const data = await response.json();
        updateWeatherUI(data);
        fetchForecast(data.name); // Fetch forecast using the detected city name
    } catch (error) {
        console.error(error);
    }
}

function updateForecastUI(data) {
    const forecastContainer = document.getElementById("forecastContainer");
    forecastContainer.innerHTML = ""; // Clear previous forecast

    const dailyForecasts = {};
    
    data.list.forEach((forecast) => {
        const date = forecast.dt_txt.split(" ")[0]; // Extract date
        if (!dailyForecasts[date]) {
            dailyForecasts[date] = forecast;
        }
    });

    Object.values(dailyForecasts).slice(0, 5).forEach((forecast) => { // Show 5 days
        const forecastElement = document.createElement("div");
        forecastElement.classList.add("forecast-item");

        forecastElement.innerHTML = `
            <p><strong>${forecast.dt_txt.split(" ")[0]}</strong></p>
            <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png">
            <p>${forecast.weather[0].description}</p>
            <p>${forecast.main.temp}°C</p>
        `;
        forecastContainer.appendChild(forecastElement);
    });
}

const darkModeToggle = document.getElementById("darkModeToggle");

darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    
    if (document.body.classList.contains("dark-mode")) {
        darkModeToggle.textContent = "☀️ Light Mode";
        localStorage.setItem("darkMode", "enabled");
    } else {
        darkModeToggle.textContent = "🌙 Dark Mode";
        localStorage.setItem("darkMode", "disabled");
    }
});

// Load user's preference
if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    darkModeToggle.textContent = "☀️ Light Mode";
}

const saveCityButton = document.getElementById("saveCity");
const savedCitiesDropdown = document.getElementById("savedCities");

saveCityButton.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (!city) return alert("Enter a city first!");

    let savedCities = JSON.parse(localStorage.getItem("savedCities")) || [];
    if (!savedCities.includes(city)) {
        savedCities.push(city);
        localStorage.setItem("savedCities", JSON.stringify(savedCities));
        updateSavedCities();
    }
});

function updateSavedCities() {
    savedCitiesDropdown.innerHTML = `<option value="">Select a saved city</option>`;
    let savedCities = JSON.parse(localStorage.getItem("savedCities")) || [];
    savedCities.forEach((city) => {
        let option = document.createElement("option");
        option.value = city;
        option.textContent = city;
        savedCitiesDropdown.appendChild(option);
    });
}

savedCitiesDropdown.addEventListener("change", () => {
    if (savedCitiesDropdown.value) {
        fetchWeather(savedCitiesDropdown.value);
        fetchForecast(savedCitiesDropdown.value);
    }
});

// Load saved cities on page load
updateSavedCities();

function updateWeatherUI(data) {
    const weatherInfo = document.querySelector(".weather-info");
    weatherInfo.classList.remove("show");
    setTimeout(() => {
        // Update UI here...
        weatherInfo.classList.add("show");
    }, 300);
}




