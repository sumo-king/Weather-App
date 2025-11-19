/* The API key being used is from openweathermap.com
*/
const apiKey = "631731743ef7dbcb3b8ed351af176f14";

// Temperature unit state (true = Celsius, false = Fahrenheit)
let isCelsius = true;

// Store current weather data for unit conversion
let currentWeatherData = null;
let currentForecastData = null;

// Load saved unit preference from localStorage
window.addEventListener('DOMContentLoaded', () => {
    const savedUnit = localStorage.getItem('temperatureUnit');
    if (savedUnit === 'F') {
        isCelsius = false;
        updateUnitToggleButton();
    }

    // Add Enter key listener to search input
    const cityInput = document.getElementById('city-input');
    if (cityInput) {
        cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchClick();
            }
        });
    }
});

// Helper function to show loading spinner
function showLoading() {
    const spinner = document.getElementById('loading-spinner');
    if (spinner) spinner.classList.remove('hidden');

    const searchBtn = document.getElementById('search-btn');
    if (searchBtn) searchBtn.disabled = true;
}

// Helper function to hide loading spinner
function hideLoading() {
    const spinner = document.getElementById('loading-spinner');
    if (spinner) spinner.classList.add('hidden');

    const searchBtn = document.getElementById('search-btn');
    if (searchBtn) searchBtn.disabled = false;
}

// Helper function to show error message
function showError(message) {
    const errorDiv = document.getElementById('error-message');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.classList.remove('hidden');

        // Auto-hide after 5 seconds
        setTimeout(() => {
            errorDiv.classList.add('hidden');
        }, 5000);
    }
}

// Helper function to hide error message
function hideError() {
    const errorDiv = document.getElementById('error-message');
    if (errorDiv) {
        errorDiv.classList.add('hidden');
    }
}

// Temperature conversion functions
function kelvinToCelsius(kelvin) {
    return (kelvin - 273.15).toFixed(0);
}

function kelvinToFahrenheit(kelvin) {
    return ((kelvin - 273.15) * 9 / 5 + 32).toFixed(0);
}

function convertTemperature(kelvin) {
    return isCelsius ? kelvinToCelsius(kelvin) : kelvinToFahrenheit(kelvin);
}

function getUnitSymbol() {
    return isCelsius ? '°C' : '°F';
}

// Toggle temperature unit
function toggleUnit() {
    isCelsius = !isCelsius;

    // Save preference to localStorage
    localStorage.setItem('temperatureUnit', isCelsius ? 'C' : 'F');

    // Update button text
    updateUnitToggleButton();

    // Re-display current data with new unit
    if (currentWeatherData) {
        displayCurrentWeather(currentWeatherData);
    }
    if (currentForecastData) {
        displayDailyForecast(currentForecastData);
    }
}

function updateUnitToggleButton() {
    const toggleBtn = document.getElementById('unit-toggle');
    if (toggleBtn) {
        toggleBtn.textContent = getUnitSymbol();
    }
}

// Format time from Unix timestamp
function formatTime(timestamp, timezone = 0) {
    const date = new Date((timestamp + timezone) * 1000);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

// Get day name from date
function getDayName(dateString, index) {
    if (index === 0) return 'Today';
    if (index === 1) return 'Tomorrow';

    const date = new Date(dateString);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
}

// Button to Search City weather info
async function searchClick() {
    const cityName = $('#city-input').val().trim();

    if (!cityName) {
        showError('Please enter a city name');
        return;
    }

    showLoading();
    hideError();

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('City not found. Please check the spelling and try again.');
            } else {
                throw new Error('Unable to fetch weather data. Please try again later.');
            }
        }

        const weatherData = await response.json();
        currentWeatherData = weatherData;
        displayCurrentWeather(weatherData);
        await weatherForecast(cityName, null, null);
    } catch (error) {
        console.error('Error fetching weather:', error);
        showError(error.message);
    } finally {
        hideLoading();
    }
}

// Helper function to display current weather
function displayCurrentWeather(data) {
    const { name: city, main: { temp, humidity, feels_like, pressure }, wind, visibility, sys, timezone } = data;
    const icon = data.weather[0].icon;
    const description = data.weather[0].description;
    const weatherCondition = data.weather[0].main; // e.g., "Clear", "Clouds", "Rain"
    const weatherImg = "http://openweathermap.org/img/w/" + icon + ".png";

    // Update weather-based background
    updateWeatherBackground(weatherCondition);

    $('.city-name').text(city);
    $('#current-temp').text(convertTemperature(temp));
    $('#temp-unit').text(getUnitSymbol());
    $('.temp-unit-small').text(getUnitSymbol());
    $('#current-humidity').text(humidity.toFixed(0));
    $('#feels-like').text(convertTemperature(feels_like));
    $('.weather-type').attr('src', weatherImg);
    $('#description').text(description.charAt(0).toUpperCase() + description.slice(1));

    // Display additional metrics
    $('#wind-speed').text(`${wind.speed.toFixed(1)} m/s`);
    $('#pressure').text(`${pressure} hPa`);
    $('#visibility').text(`${(visibility / 1000).toFixed(1)} km`);

    // Display sunrise/sunset
    if (sys && sys.sunrise && sys.sunset) {
        $('#sunrise').text(formatTime(sys.sunrise, timezone));
        $('#sunset').text(formatTime(sys.sunset, timezone));
    }
}

// Update background based on weather condition
function updateWeatherBackground(condition) {
    // Remove all weather classes
    document.body.className = '';

    // Add new weather class
    const weatherClass = `weather-${condition.toLowerCase()}`;
    document.body.classList.add(weatherClass);
}

// GEOLOCATION FUNCTION PARAMETER
const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
}

navigator.geolocation.getCurrentPosition(function success(position) {
    const crd = position.coords;
    displayCurrentPositionWeather(crd.latitude, crd.longitude);
    weatherForecast(null, crd.latitude, crd.longitude);
}, function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    showError('Unable to get your location. Please search for a city manually.');
}, options);

// DISPLAY CURRENT WEATHER @ CURRENT GEOLOCATION
async function displayCurrentPositionWeather(lat, lon) {
    showLoading();
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);

        if (!response.ok) {
            throw new Error('Unable to fetch weather data for your location.');
        }

        const weather = await response.json();
        currentWeatherData = weather;
        displayCurrentWeather(weather);
    } catch (error) {
        console.error('Error fetching weather:', error);
        showError(error.message);
    } finally {
        hideLoading();
    }
}

// HELPER FUNCTION TO DETERMINE WEATHER BASED ON LOCATION
async function weatherForecast(city, lat, lon) {
    try {
        let response;

        // Search results for weather
        if (city && lat === null && lon === null) {
            response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`);
        } else if (city === null && lat !== null && lon !== null) {
            // Geolocation results for weather
            response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`);
        } else {
            console.error("Invalid parameters for weather forecast");
            return;
        }

        if (!response.ok) {
            throw new Error('Unable to fetch forecast data');
        }

        const forecastData = await response.json();
        currentForecastData = forecastData.list;
        displayDailyForecast(forecastData.list);
    } catch (error) {
        console.error('Error fetching forecast:', error);
        showError('Unable to load forecast data');
    }
}

// Process 3-hourly forecast into daily forecast
function displayDailyForecast(forecastList) {
    // Group forecasts by day
    const dailyData = {};

    forecastList.forEach(item => {
        const date = item.dt_txt.split(' ')[0]; // Get date part (YYYY-MM-DD)

        if (!dailyData[date]) {
            dailyData[date] = {
                temps: [],
                weather: [],
                date: date,
                icon: item.weather[0].icon,
                description: item.weather[0].description
            };
        }

        dailyData[date].temps.push(item.main.temp);
        dailyData[date].weather.push(item.weather[0].main);
    });

    // Convert to array and take first 5 days
    const dailyArray = Object.values(dailyData).slice(0, 5);

    let output = "";

    dailyArray.forEach((day, index) => {
        const maxTemp = Math.max(...day.temps);
        const minTemp = Math.min(...day.temps);
        const srcString = `http://openweathermap.org/img/w/${day.icon}.png`;
        const dayName = getDayName(day.date, index);

        // Format date
        const dateObj = new Date(day.date);
        const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

        output += `<div class="day-card">` +
            `<h3 class="day-name">${dayName}</h3>` +
            `<p class="forecast-date">${formattedDate}</p>` +
            `<img style="width: 100px; height: 100px;" src="${srcString}" alt="${day.description}" class="forecast"/>` +
            `<p style="background-color: transparent; color: rgb(100, 100, 100); font-size: 14px;">${day.description}</p>` +
            `<h1 style="background-color: transparent;">${convertTemperature(maxTemp)}${getUnitSymbol()}</h1>` +
            `<h2 style="background-color: transparent; color: grey">${convertTemperature(minTemp)}${getUnitSymbol()}</h2>` +
            `</div>`;
    });

    $("#forecast-container").html(output);
}