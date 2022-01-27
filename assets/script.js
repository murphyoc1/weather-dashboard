// function initPage() {
//     const inputEl = document.getElementById("city-input");
//     const searchEl = document.getElementById("search-button");
//     const clearEl = document.getElementById("clear-history");
//     const nameEl = document.getElementById("city-name");
//     const currentPicEl = document.getElementById("current-pic");
//     const currentTempEl = document.getElementById("temperature");
//     const currentHumidityEl = document.getElementById("humidity");4
//     const currentWindEl = document.getElementById("wind-speed");
//     const currentUVEl = document.getElementById("UV-index");
//     const historyEl = document.getElementById("history");
//     let searchHistory = JSON.parse(localStorage.getItem("search")) || [];

//     const APIKey = "06e2cf292e4207a91cf8a72a79ecd76a";

//     function getWeather(cityName) {
//         let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
//         axios.get(queryURL)
//             .then(function(response){
//                 const currentDate = new Date(response.data.dt*1000);
//                 const day = currentDate.getDate();
//                 const month = currentDate.getMonth() + 1;
//                 const year = currentDate.getFullYear();

//                 nameEl.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year + ") ";

//                 let weatherPic = response.data.weather[0].icon;

//                 currentPicEl.setAttribute("src","https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
//                 currentPicEl.setAttribute("alt",response.data.weather[0].description);
//                 currentTempEl.innerHTML = "Temperature: " + k2f(response.data.main.temp) + " &#176F";
//                 currentHumidityEl.innerHTML = "Humidity: " + response.data.main.humidity + "%";
//                 currentWindEl.innerHTML = "Wind Speed: " + response.data.wind.speed + " MPH";

//                 let lat = response.data.coord.lat;
//                 let lon = response.data.coord.lon;
//                 let UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&cnt=1";
//                 axios.get(UVQueryURL)
//             .then(function(response){
//                 let UVIndex = document.createElement("span");
//                 UVIndex.setAttribute("class","badge badge-danger");
//                 UVIndex.innerHTML = response.data[0].value;
//                 currentUVEl.innerHTML = "UV Index: ";
//                 currentUVEl.append(UVIndex);
//             });
//         let cityID = response.data.id;
//         let forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + APIKey;
//         axios.get(forecastQueryURL)
//             .then(function(response){
//                 console.log(response);
//                 const forecastEls = document.querySelectorAll(".forecast");
//                 for (i=0; i<forecastEls.length; i++) {
//                     forecastEls[i].innerHTML = "";

//                     const forecastIndex = i*8 + 4;
//                     const forecastDate = new Date(response.data.list[forecastIndex].dt * 1000);
//                     const forecastDay = forecastDate.getDate();
//                     const forecastMonth = forecastDate.getMonth() + 1;
//                     const forecastYear = forecastDate.getFullYear();
//                     const forecastDateEl = document.createElement("p");

//                     forecastDateEl.setAttribute("class","mt-3 mb-0 forecast-date");
//                     forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
//                     forecastEls[i].append(forecastDateEl);

//                     const forecastWeatherEl = document.createElement("img");

//                     forecastWeatherEl.setAttribute("src","https://openweathermap.org/img/wn/" + response.data.list[forecastIndex].weather[0].icon + "@2x.png");
//                     forecastWeatherEl.setAttribute("alt",response.data.list[forecastIndex].weather[0].description);
//                     forecastEls[i].append(forecastWeatherEl);

//                     const forecastTempEl = document.createElement("p");

//                     forecastTempEl.innerHTML = "Temp: " + k2f(response.data.list[forecastIndex].main.temp) + " &#176F";
//                     forecastEls[i].append(forecastTempEl);

//                     const forecastHumidityEl = document.createElement("p");

//                     forecastHumidityEl.innerHTML = "Humidity: " + response.data.list[forecastIndex].main.humidity + "%";
//                     forecastEls[i].append(forecastHumidityEl);
//                     }
//                 })
//             });  
//     }

//     searchEl.addEventListener("click",function() {
//         const searchTerm = inputEl.value;
//         getWeather(searchTerm);
//         searchHistory.push(searchTerm);
//         localStorage.setItem("search",JSON.stringify(searchHistory));
//         renderSearchHistory();
//     })

//     clearEl.addEventListener("click",function() {
//         searchHistory = [];
//         renderSearchHistory();
//     })

//     function k2f(K) {
//         return Math.floor((K - 273.15) *1.8 +32);
//     }

//     function renderSearchHistory() {
//         historyEl.innerHTML = "";
//         for (let i=0; i<searchHistory.length; i++) {
//             const historyItem = document.createElement("input");

//             historyItem.setAttribute("type","text");
//             historyItem.setAttribute("readonly",true);
//             historyItem.setAttribute("class", "form-control d-block bg-white");
//             historyItem.setAttribute("value", searchHistory[i]);
//             historyItem.addEventListener("click",function() {
//                 getWeather(historyItem.value);
//             })
//             historyEl.append(historyItem);
//         }
//     }

//     renderSearchHistory();
//     if (searchHistory.length > 0) {
//         getWeather(searchHistory[searchHistory.length - 1]);
//     }

// }
// initPage();

var apiKey = "06e2cf292e4207a91cf8a72a79ecd76a";
var today = moment().format('L');
var searchHistoryList = [];

function getWeather(city) {

    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(cityConditions) {
        console.log(cityConditions);
        
        $("#weatherContent").css("display", "block");
        $("#cityDetail").empty();
        
        var iconCode = cityConditions.weather[0].icon;
        var iconURL = `https://openweathermap.org/img/w/${iconCode}.png`;

        var currentCity = $(`
            <h2 id="currentCity">
                ${cityConditions.name} ${today} <img src="${iconURL}" alt="${cityConditions.weather[0].description}" />
            </h2>
            <p>Temperature: ${cityConditions.main.temp} °F</p>
            <p>Humidity: ${cityConditions.main.humidity}\%</p>
            <p>Wind Speed: ${cityConditions.wind.speed} MPH</p>
        `);

        $("#cityDetail").append(currentCity);

        var lat = cityConditions.coord.lat;
        var lon = cityConditions.coord.lon;
        var uviQueryURL = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`;

        $.ajax({
            url: uviQueryURL,
            method: "GET"
        }).then(function(uviResponse) {
            console.log(uviResponse);
            var uvIndex = uviResponse.value;
            var uvIndexP = $(`
                <p>UV Index: 
                    <span id="uvIndexColor" class="px-3 py-3 rounded">${uvIndex}</span>
                </p>
            `);
            $("#cityDetail").append(uvIndexP);

            futureCondition(lat, lon);

            if (uvIndex >= 0 && uvIndex <= 2) {
                $("#uvIndexColor").css("background-color", "#3EA73C").css("color", "cream");
            } else if (uvIndex >= 3 && uvIndex <= 5) {
                $("#uvIndexColor").css("background-color", "#FFF355");
            } else if (uvIndex >= 6 && uvIndex <= 7) {
                $("#uvIndexColor").css("background-color", "#F20B00");
            } else if (uvIndex >= 8 && uvIndex <= 10) {
                $("#uvIndexColor").css("background-color", "#E53200").css("color", "cream");
            } else {
                $("#uvIndexColor").css("background-color", "#B567A5").css("color", "cream"); 
            };  
        });
    });
}

function futureCondition(lat, lon) {

    var futureURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=current,minutely,hourly,alerts&appid=${apiKey}`;

    $.ajax({
        url: futureURL,
        method: "GET"
    }).then(function(forecast) {
        console.log(forecast);
        $("#fiveDay").empty();
        
        for (let i = 1; i < 6; i++) {
            var cityInfo = {
                date: forecast.daily[i].dt,
                icon: forecast.daily[i].weather[0].icon,
                temp: forecast.daily[i].temp.day,
                humidity: forecast.daily[i].humidity
            };

            var currDate = moment.unix(cityInfo.date).format("MM/DD/YYYY");
            var iconURL = `<img src="https://openweathermap.org/img/w/${cityInfo.icon}.png" alt="${forecast.daily[i].weather[0].main}" />`;

            var futureCard = $(`
                <div class="pl-3">
                    <div class="card pl-3 pt-3 mb-3 bg-primary text-light" style="width: 12rem;>
                        <div class="card-body">
                            <h5>${currDate}</h5>
                            <p>${iconURL}</p>
                            <p>Temp: ${cityInfo.temp} °F</p>
                            <p>Humidity: ${cityInfo.humidity}\%</p>
                        </div>
                    </div>
                <div>
            `);
            $("#fiveDay").append(futureCard);
            }
    }); 
}

$("#searchBtn").on("click", function(event) {
    event.preventDefault();

    var city = $("#enterCity").val().trim();
    getWeather(cityName);
    if (!searchHistoryList.includes(city)) {
        searchHistoryList.push(city);
        var searchedCity = $(`
            <li class="list-group-item">${city}</li>
            `);
        $("#searchHistory").append(searchedCity);
    };
    
    localStorage.setItem("city", JSON.stringify(searchHistoryList));
    console.log(searchHistoryList);
});

$(document).on("click", ".list-group-item", function() {
    var listCity = $(this).text();
    currentCondition(listCity);
});

$(document).ready(function() {
    var searchHistoryArr = JSON.parse(localStorage.getItem("city"));

    if (searchHistoryArr !== null) {
        var lastSearchedIndex = searchHistoryArr.length - 1;
        var lastSearchedCity = searchHistoryArr[lastSearchedIndex];
        currentCondition(lastSearchedCity);
        console.log(`Last searched city: ${lastSearchedCity}`);
    }
});