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

    if(city && (lat == null && lat == null)){

        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`);
        const forecastData = await response.json();
        const info = forecastData.list;
        console.log(forecastData.list)
        let output = "";

        let count = 0; 
        $.each(info, function(key, value) {
            let weatherImage = value.weather[0].icon;
            // TODO: Add weather icons
            output += '<div class="day-card">'+
                '<h1 style="background-color: transparent;">'+ (value.main.temp - 273).toFixed(0) +'℃</h1>'+
                '<img style="width: 100px; height: 100px;" id="" src="http://openweathermap.org/img/w/ '+ weatherImage  +' .png" alt="" class="forecast"/>'+
                '</div>';

            count++;
            if (count >= 5) {
                return false;
            }

            console.log("The wather iamge: " +weatherImage)
        });
        $(".weekly-forcast").html(output);

    } else if((city == null)){

        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`);
        const forecastData = await response.json();
        const info = forecastData.list;
        console.log(forecastData.list)
        let output = "";
        let count = 0;
        $.each(info, function(key, value) {
            // TODO: Add weather icons
            let weatherImage = value.weather[0].icon;
            output = '<div class="day-card">'+
                '<h1 style="background-color: transparent;">'+ (value.main.temp - 273).toFixed(0) +'℃</h1>'+
                '<img style="width: 100px; height: 100px;" id="" src="http://openweathermap.org/img/w/ '+ weatherImage  +' .png" alt="" class="forecast"/>'+
                '</div>';
                $(".weekly-forcast").append(output);
                console.log(weatherImage);
            count++;
            if (count >= 5) {
                return false;
            }
        })
    } else{
        console.error("Unable to fetch weather");
    }

}