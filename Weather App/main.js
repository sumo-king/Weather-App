
const apiKey = "631731743ef7dbcb3b8ed351af176f14";

async function searchClick(){
    const cityName = $('.city-name-input').val();
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`);
   
    if(!response.ok){
        throw new Error("Could not fetch weather data");
    }
    const weatherData = await response.json();
    console.log(weatherData)
    displayWeather(weatherData);
}

function displayWeather(data){
    
    const {name: city, main: {temp, humidity, feels_like}} = data;
    const icon = data.weather[0].icon;
    const xp = data.weather[0].description;
    const weatherImg = "http://openweathermap.org/img/w/" + icon + ".png";

    console.log(icon)
    $('.city-name').text(city);
    $('#current-temp').text((temp - 273).toFixed(0));
    $('#current-humidity').text((humidity).toFixed(0));
    $('#feels-like').text((feels_like - 273).toFixed(0));
    $('.weather-type').attr('src', weatherImg);
    $('#description').text(xp);
}

const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
}

navigator.geolocation.getCurrentPosition(function success(position) {
    const crd = position.coords;

    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);

    displayCurrentPositionWeather(crd.latitude, crd.longitude);

}, function error(error) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}, options);

async function displayCurrentPositionWeather(lat, lon){
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
    const weather = await response.json();
    displayWeather(weather);
}

