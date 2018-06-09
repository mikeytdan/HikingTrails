


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
  
}


function getWeather(lat, long) {
    //current weather by zip code
    var queryWeather = "https://api.openweathermap.org/data/2.5/weather?lat=" +
    lat + "&lon=" + long + "&units=imperial&APPID=19c1678d8290bb9850e1fdc1681c0dd7";
    
    $.ajax({
        url: queryWeather,
        method: "GET"
    }).then(function (response) {
        var weather = response.main.temp;
        var condition = response.weather[0].main;

        //add the weather data to the screen
        $("#weather").text("The current weather is: " + weather);
        $("#weather").append("<p>The conditions are: " + condition + " for hiking!</p>");
    });

   
}

function updatedUVIndex(lat, long) {
    //uv index by zip code
    var queryUVIndex = "https://api.openweathermap.org/data/2.5/uvi?appid=19c1678d8290bb9850e1fdc1681c0dd7&lat=" +
    lat + "&lon=" + long;

    $.ajax({
        url: queryUVIndex,
        method: "GET"
    }).then(function (response) {
        var UVIndex = response.value;

        // Adding the data to the screen dynamically
        $("#uv-index").text("The UV Index is: " + UVIndex);
        $("#uv-index").append("<p> Low = 0-2; moderate = 3-5; high = 6-7; very high = 8-10; extreme = 11+</p>");
        //https://www.epa.gov/sunsafety/uv-index-scale-1
    });

}









