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
let forecastDay1 = document.querySelector('#forecast-day-card-1');
let forecastDay1Icon = document.querySelector('#forecast-day-card-1-icon');
let forecastDay1Temp = document.querySelector('#forecast-day-card-1-temp');
let forecastDay1Wind = document.querySelector('#forecast-day-card-1-wind');
let forecastDay1Humid = document.querySelector('#forecast-day-card-1-humid');
let forecastDay2 = document.querySelector('#forecast-day-card-2');
let forecastDay2Icon = document.querySelector('#forecast-day-card-2-icon');
let forecastDay2Temp = document.querySelector('#forecast-day-card-2-temp');
let forecastDay2Wind = document.querySelector('#forecast-day-card-2-wind');
let forecastDay2Humid = document.querySelector('#forecast-day-card-2-humid');
let forecastDay3 = document.querySelector('#forecast-day-card-3');
let forecastDay3Icon = document.querySelector('#forecast-day-card-3-icon');
let forecastDay3Temp = document.querySelector('#forecast-day-card-3-temp');
let forecastDay3Wind = document.querySelector('#forecast-day-card-3-wind');
let forecastDay3Humid = document.querySelector('#forecast-day-card-3-humid');
let forecastDay4 = document.querySelector('#forecast-day-card-4');
let forecastDay4Icon = document.querySelector('#forecast-day-card-4-icon');
let forecastDay4Temp = document.querySelector('#forecast-day-card-4-temp');
let forecastDay4Wind = document.querySelector('#forecast-day-card-4-wind');
let forecastDay4Humid = document.querySelector('#forecast-day-card-4-humid');
let forecastDay5 = document.querySelector('#forecast-day-card-5');
let forecastDay5Icon = document.querySelector('#forecast-day-card-5-icon');
let forecastDay5Temp = document.querySelector('#forecast-day-card-5-temp');
let forecastDay5Wind = document.querySelector('#forecast-day-card-5-wind');
let forecastDay5Humid = document.querySelector('#forecast-day-card-5-humid');
let previouslySearchedCities = document.querySelector('#previously-searched-cities');
let searchedCitiesList = JSON.parse(localStorage.getItem("#searched-cities-list")) || [];

// City search button event
var formSubmitHandler = function(event) {
    event.preventDefault();

    var cityName = cityNameInput.value.trim();

    if (cityName) {
        getWeather(cityName);
        saveCitySearch(cityName);
    } else {
        alert('Please enter a valid city name');
    }
}

function saveCitySearch(cityName) {

    let searchedCities = [];
    if (localStorage["searched-cities-list"] != null) {
        searchedCities = JSON.parse(localStorage["searched-cities-list"]);
    }
    
    searchedCities.push(cityName);
    localStorage.setItem("searched-cities-list", JSON.stringify(searchedCities));
    // console.log(searchedCities);
    searchedCities.reverse();
    previouslySearchedCities.innerHTML = 
    searchedCities.map(city => {
    return `<li class="previous-weather-list"><a href = "javascript:getWeather('`+`${city}`+`')">${city}</a></li>`
    }).join("")
    // searchedCitiesList = JSON.parse(localStorage.getItem("#searched-cities-list")) || [];
    // previouslySearchedCities.innerHTML = 
    // searchedCitiesList.map(city => {
    //     alert(city.value);
    // return `<li class="col-12 col-md-3">${city}</li>`
    // }).join("")
    // searchedCities = JSON.parse(localStorage['']) || [];
    // searchedCities.push(cityName);
    // localStorage.setItem('cities', JSON.stringify(searchedCities));

    // create city search history array
    // let cityName = document.getElementById('cityname').value;
    // if (localStorage.getItem('city-name') == null) {
    //     localStorage.setItem('city-name', '[]');
    // }

    // var citySearchHistory = [];
    // citySearchHistory = JSON.parse(localStorage.getItem('city-name')) || [];
    // citySearchHistory.push(data);
    // alert(citySearchHistory); 
    // localStorage.setItem('city-name', JSON.stringify(citySearchHistory));

    // citySearchHistory.push(JSON.parse(localStorage.getItem('city-name')));
    // localStorage.setItem('city-name', JSON.stringify(cityName));
    // citySearchHistory = JSON.parse(localStorage['city-name']);
    // cityNameSearchHistory.push(cityName);
    
}

function getWeather(cityName) {
    //fetches city's temp, wind, humidity, 
    fetch(`https://api.openweathermap.org/data/2.5/weather?appid=9f4ee7678004adb88a80229c288d4e32&units=imperial&q=${cityName}`)
        .then(function (response) {
            // if(response.ok) {
            return response.json();
        }).then(function (response) {
            console.log(response);
            // city name and country display
            resultCity.textContent = `${cityName}, ${response.sys.country}`;
            // city weather status icon display
            resultCityIcon.innerHTML = "<img src="+`http://openweathermap.org/img/w/${response.weather[0].icon}.png`+' width="75" height="75">'
            // current current date display 
            resultDate.textContent = (moment().format("dddd, MMMM Do YYYY"));
            // city temp display
            resultTemp.textContent = `Temperature: ${response.main.temp}°F`;
            // city wind display
            resultWind.textContent = `Wind: ${response.wind.speed} MPH`;
            // city humidity display
            resultHumid.textContent = `Humidity: ${response.main.humidity}%`;
            // create lattitude & longitude variables for UV index 
            let resultLon = response.coord.lon;
            let resultLat = response.coord.lat;
    // fetches uv index by using lattitude & longitude variables
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${resultLat}&lon=${resultLon}&units=imperial&&appid=9f4ee7678004adb88a80229c288d4e32`)
        .then(function (response) {
            return response.json();
        }).then(function (response) {
            console.log(response);
            uvColorSort(`${response.current.uvi}`);
            // city uv index display
            resultUv.textContent = `UV index: ${response.current.uvi}`;
            // 5 day forecast (day 1 of 5)
            forecastDay1.textContent = (moment().add(1,'day').format("MM/DD/YY"));
            // forcast day 1 of 5 weather status icon display
            forecastDay1Icon.innerHTML = "<img src="+`http://openweathermap.org/img/w/${response.daily[1].weather[0].icon}.png`+' width="50" height="50">'
            // forcast day 1 of 5 temp display 
            forecastDay1Temp.textContent = `Temp: ${response.daily[1].temp.day}°F`;
            // forcast day 1 of 5 wind display 
            forecastDay1Wind.textContent = `Wind: ${response.daily[1].wind_speed} MPH`;
            // forcast day 1 of 5 humidity display 
            forecastDay1Humid.textContent = `Humidity: ${response.daily[1].humidity}%`;

            // 5 day forecast (day 2 of 5)
            forecastDay2.textContent = (moment().add(2,'day').format("MM/DD/YY"));
            // forcast day 2 of 5 weather status icon display
            forecastDay2Icon.innerHTML = "<img src="+`http://openweathermap.org/img/w/${response.daily[2].weather[0].icon}.png`+' width="50" height="50">'
            // forcast day 2 of 5 temp display 
            forecastDay2Temp.textContent = `Temp: ${response.daily[2].temp.day}°F`;
            // forcast day 2 of 5 wind display 
            forecastDay2Wind.textContent = `Wind: ${response.daily[2].wind_speed} MPH`;
            // forcast day 2 of 5 humidity display 
            forecastDay2Humid.textContent = `Humidity: ${response.daily[2].humidity}%`;

            // 5 day forecast (day 3 of 5)
            forecastDay3.textContent = (moment().add(3,'day').format("MM/DD/YY"));
            // forcast day 3 of 5 weather status icon display
            forecastDay3Icon.innerHTML = "<img src="+`http://openweathermap.org/img/w/${response.daily[3].weather[0].icon}.png`+' width="50" height="50">'
            // forcast day 3 of 5 temp display 
            forecastDay3Temp.textContent = `Temp: ${response.daily[3].temp.day}°F`;
            // forcast day 3 of 5 wind display 
            forecastDay3Wind.textContent = `Wind: ${response.daily[3].wind_speed} MPH`;
            // forcast day 3 of 5 humidity display 
            forecastDay3Humid.textContent = `Humidity: ${response.daily[3].humidity}%`;

            // 5 day forecast (day 4 of 5)
            forecastDay4.textContent = (moment().add(4,'day').format("MM/DD/YY"));
            // forcast day 4 of 5 weather status icon display
            forecastDay4Icon.innerHTML = "<img src="+`http://openweathermap.org/img/w/${response.daily[4].weather[0].icon}.png`+' width="50" height="50">'
            // forcast day 4 of 5 temp display 
            forecastDay4Temp.textContent = `Temp: ${response.daily[4].temp.day}°F`;
            // forcast day 4 of 5 wind display 
            forecastDay4Wind.textContent = `Wind: ${response.daily[4].wind_speed} MPH`;
            // forcast day 4 of 5 humidity display 
            forecastDay4Humid.textContent = `Humidity: ${response.daily[4].humidity}%`;

            // 5 day forecast (day 5 of 5)
            forecastDay5.textContent = (moment().add(5,'day').format("MM/DD/YY"));
            // forcast day 5 of 5 weather status icon display
            forecastDay5Icon.innerHTML = "<img src="+`http://openweathermap.org/img/w/${response.daily[5].weather[0].icon}.png`+' width="50" height="50">'
            // forcast day 5 of 5 temp display 
            forecastDay5Temp.textContent = `Temp: ${response.daily[5].temp.day}°F`;
            // forcast day 5 of 5 wind display 
            forecastDay5Wind.textContent = `Wind: ${response.daily[5].wind_speed} MPH`;
            // forcast day 5 of 5 humidity display 
            forecastDay5Humid.textContent = `Humidity: ${response.daily[5].humidity}%`;
            })
        })
}

function uvColorSort(uvIndex) {
    if (uvIndex <= 2) {
        resultUv.classList.add('uv-fav');
        resultUv.classList.remove('uv-mod');
        resultUv.classList.remove('uv-sev');
    }
    else if (uvIndex > 2 && uvIndex < 6 ) {
        resultUv.classList.add('uv-mod');
        resultUv.classList.remove('uv-fav');
        resultUv.classList.remove('uv-sev');
    }
    else if (uvIndex >= 6) { 
        resultUv.classList.add('uv-sev');
        resultUv.classList.remove('uv-fav');
        resultUv.classList.remove('uv-mod');
    }
}


searchedCityEl.addEventListener("submit", formSubmitHandler);
let searchedCities1 = [];
    if (localStorage["searched-cities-list"] != null) {
        searchedCities1 = JSON.parse(localStorage["searched-cities-list"]);
    }
searchedCities1.reverse();
// console.log(searchedCities1);
previouslySearchedCities.innerHTML = 
searchedCities1.map(city => {
    return `<li class="previous-weather-list"><a href = "javascript:getWeather('`+`${city}`+`')">${city}</a></li>`
}).join("")
