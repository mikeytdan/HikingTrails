


window.onload = function (event) {
    console.log("Loaded!");
    var coordinate = latLong("84108");
    if (coordinate == undefined) {
        console.log("Invalid zip code!");
        return;
    }

    console.log(`Coordinate: (${coordinate.lat}, ${coordinate.long})`);
    getWeather(coordinate.lat, coordinate.long);
    updatedUVIndex(coordinate.lat, coordinate.long);
    updatedAirPollution(coordinate.lat, coordinate.long);
}


function getWeather(lat, long) {
    //current weather by zip code
    var queryWeather = "https://api.openweathermap.org/data/2.5/weather?lat=" +
    lat + "&lon=" + long + "&units=imperial&APPID=19c1678d8290bb9850e1fdc1681c0dd7";
    
    $.ajax({
        url: queryWeather,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        var weather = response.main.temp;
        console.log(weather);
        var condition = response.weather[0].main;
        console.log(condition);

        // what I will do to add the weather data to the screen
        $("#weather").text("The current weather is: " + weather);
        $("#weather").append("<p>The conditions are: " + condition + " for hiking!</p>");
    });

   
}

function updatedUVIndex(lat, long) {
    //uv index by zip code - forecast so won't change with time of day
    // https://iaspub.epa.gov/enviro/efservice/getEnvirofactsUVDAILY/ZIP/20050/JSON
    var queryUVIndex = "https://api.openweathermap.org/data/2.5/uvi?appid=19c1678d8290bb9850e1fdc1681c0dd7&lat=" +
    lat + "&lon=" + long;

    $.ajax({
        url: queryUVIndex,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        var UVIndex = response.value;
        console.log(UVIndex);
        // Adding the data to the screen dynamically
        $("#uv-index").text("The UV Index is: " + UVIndex);
        $("#uv-index").append("<p> Low = 0-2; moderate = 3-5; high = 6-7; very high = 8-10; extreme = 11+</p>");
        // I can add a link to the UV index link - https://www.epa.gov/sunsafety/uv-index-scale-1
    });

}
// this is only showing for utah zip codes - ahhh
function updatedAirPollution(lat, long) {
     //air pollution - air quality index
     var queryAirPollution = "https://www.airnowapi.org/aq/forecast/latLong/?format=application/json&latitude=" + 
     lat + "&longitude=" + long + "&API_KEY=FA631898-16EF-4A6B-A039-8839489DC026";

    $.ajax({
        url: queryAirPollution,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        var airPollution = response[0].AQI;
        console.log(airPollution);

        var AQICategory = response[0].Category.Name;
        console.log(AQICategory);

        var AQIAction = response[0].Discussion;
        console.log(AQIAction);

        // if AQI = -1, then display the category instead; -1 = no data
       

        // adding data to the screen dynamically
        $("#air-pollution").text("The Air Quality Indext today is: " + airPollution);
        $("#air-pollution").append("<p>The air quality today is: " + AQICategory + "</p>");
        $("#air-pollution").append("<p>" + AQIAction + "</p>");

    })
}







