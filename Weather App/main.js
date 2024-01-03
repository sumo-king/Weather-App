
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

    $('.city-name').text(city);
    $('#current-temp').text((temp - 273).toFixed(0));
    $('#current-humidity').text((humidity).toFixed(0));
    $('#feels-like').text((feels_like - 273).toFixed(0));
}
