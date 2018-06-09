window.onload = function (event) {

    $("#submit").on("click", function (event) {
        event.preventDefault();

        $("#trails").empty();
        var inputText = $("#search-input").val().trim();
        $("#search-input").val("");

        var coordinate = latLong(inputText);
        if (coordinate == undefined) {
            $("#zip-error").text("Invalid zip code!");
            return;
        }

        $("#search-input").val("");
        getTrails(coordinate.lat, coordinate.long);
        getWeather(coordinate.lat, coordinate.long);
        updatedUVIndex(coordinate.lat, coordinate.long);
    })

    $('#search-input').on('input', function (e) {
        $("#zip-error").text("");
    });

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
        $("#weather").text("The current weather is: " + weather + "F°");
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









