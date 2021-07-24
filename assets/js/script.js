let buttonEl = document.querySelector('#btn2');
var cityNameInput = document.querySelector('#cityname');
let resultCity = document.querySelector('#result-city');
let resultDate = document.querySelector('#result-date');
let resultWeather = document.querySelector('#result-weather');
let resultTemp = document.querySelector('#temp');
let resultWind = document.querySelector('#wind');
let resultHumid = document.querySelector('#humid');
let resultUv = document.querySelector('#uv');
let searchedCityEl = document.querySelector('#searchedCity');
let resultCityIcon = document.querySelector('#result-city-icon');

// onclick event for city search------------------------------------------------
// document.getElementById('btn2').addEventListener('click', function(){
//     getWeather('Chandler');
//     console.log('working');
// });

// City search button event
var formSubmitHandler = function(event) {
    event.preventDefault();

    var cityName = cityNameInput.value.trim();

    localStorage.setItem('city name', cityName);

    if (cityName) {
        getWeather(cityName);
        // fiveDayForecast(cityName);
    } else {
        console.log('Please enter a valid city name');
    }
}

function getWeather(cityName) {
    //fetches city's temp, wind, humidity, 
    fetch(`https://api.openweathermap.org/data/2.5/weather?appid=9f4ee7678004adb88a80229c288d4e32&units=imperial&q=${cityName}`)
        .then(function (response) {
            // if(response.ok) {
            return response.json();
        }).then(function (response) {
            console.log(response);
            resultCity.textContent = `${cityName}, ${response.sys.country}`;
            resultCityIcon.innerHTML = "<img src="+`http://openweathermap.org/img/w/${response.weather[0].icon}.png`+' width="50" height="50">'
            resultDate.textContent = (moment().format("dddd, MMMM Do YYYY"));
            resultTemp.textContent = `Temperature: ${response.main.temp}°F`;
            resultWind.textContent = `Wind: ${response.wind.speed} MPH`;
            resultHumid.textContent = `Humidity: ${response.main.humidity}%`;
            let resultLon = response.coord.lon;
            let resultLat = response.coord.lat;
            let cityIcon = `http://openweathermap.org/img/w/${response.weather[0].icon}.png`
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${resultLat}&lon=${resultLon}&&appid=9f4ee7678004adb88a80229c288d4e32`)
        .then(function (response) {
            return response.json();
        }).then(function (response) {
            console.log(response);
            resultUv.textContent = `UV index: ${response.current.uvi}`;
            })
        })
}

// function to retrieve weather icon id
function getIconClass(weatherCode){
	let icon;
	switch(weatherCode){
		case 300:
			icon = 'wi-sprinkle';
			break;
	}
	return icon;
}

// function fiveDayForecast(cityName) {
//     fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${resultLat}&lon=-112.074&&appid=9f4ee7678004adb88a80229c288d4e32`)
//     // fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${cityName}&units=imperial&cnt=5&appid= 9f4ee7678004adb88a80229c288d4e32 `)
//         .then(function (response) {
//             return response.json();
//         }).then(function (response) {
//             console.log(response);
//         })
// }

// getWeather('Chandler');

// document.querySelector('#btn2').addEventListener('click', function(){
//     console.log('clicked');
//     getWeather('Phoenix');
// })

searchedCityEl.addEventListener("submit", formSubmitHandler);

