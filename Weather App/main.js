/* The API key being used is from openweathermap.com
* 
*/
const apiKey = "631731743ef7dbcb3b8ed351af176f14";
//Button to search for city weather information
async function searchClick(){
    const cityName = $('.city-name-input').val();
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`);
    
    if(!response.ok){
        throw new Error("Could not fetch weather data");
    }
    const weatherData = await response.json();
    displayDailyWeather(weatherData);
    weatherForcast(cityName, null, null);
}

function displayDailyWeather(data){
    
    const {name: city, main: {temp, humidity, feels_like}} = data;
    const icon = data.weather[0].icon;
    const description = data.weather[0].description;
    const weatherImg = "http://openweathermap.org/img/w/" + icon + ".png";

    $('.city-name').text(city);
    $('#current-temp').text((temp - 273).toFixed(0));
    $('#current-humidity').text((humidity).toFixed(0));
    $('#feels-like').text((feels_like - 273).toFixed(0));
    $('.weather-type').attr('src', weatherImg);
    $('#description').text(description);
}

const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
}

navigator.geolocation.getCurrentPosition(function success(position) {
    const crd = position.coords;
    displayCurrentPositionWeather(crd.latitude, crd.longitude);
    weatherForcast(null, crd.latitude, crd.longitude);
}, function error(error) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}, options);

async function displayCurrentPositionWeather(lat, lon){
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
    const weather = await response.json();
    displayDailyWeather(weather);
}

async function weatherForcast(city, lat, lon){
    // Search results for weather
    if(city && (lat == null && lat == null)){

        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`);
        const forecastData = await response.json();
        const info = forecastData.list;

        displayForecast(info);
    } else if((city == null)){
    // Geolocation results
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`);
        const forecastData = await response.json();
        const info = forecastData.list;

        displayForecast(info);
    } else{
        console.error("Unable to fetch weather");
    }
}

function displayForecast(info){

    let output = "";
    let count = 0; 

    $.each(info, function(key, value) {
        let weatherImage = value.weather[0].icon;
        let srcString = `http://openweathermap.org/img/w/${weatherImage}.png`;
        output += `<div class="day-card" style="padding: 20px;">`+
            `<h3 style="background-color: transparent">${value.dt_txt}</h3>`+
            `<img style="width: 100px; height: 100px;" id="" src="${srcString}" alt="" class="forecast"/>`+
            `<h1 style="background-color: transparent;">${(value.main.temp_max - 273).toFixed(0)}℃</h1>`+
            `<h2 style="background-color: transparent; color: grey">${(value.main.temp_min - 273).toFixed(0)}℃</h2>`+
            `</div>`;
            $(".weekly-forcast").html(output);
        count++;
        if (count >= 5) {
            return false;
        }
    });
}