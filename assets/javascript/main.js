var quotes = [
    "In every walk with nature, one receives far more than he seeks. - John Muir",
    "Mountains have a way of dealing with overconfidence - Nemann Buhl",
    "Hiking is the best workout! You can hike for three hours and not even realize you're working out. And, hiking alone lets me have some time to myself. - Jamie Luner",
    "Thousands of tired, nerve-shaken, over-civilized people are beginning to find out that going to the mountains is going home; that wildness is a necessity. - John Muir",
    "May your trails be crooked, winding, lonesome, dangerous, leading to the most amazing view. May your mountains rise into and above the clouds. - Edward Abbey",
    "You need mountains, long staircases don't make good hikers. - Amit Kalantri",
    "I like being near the top of a mountain. One can’t get lost here. - Wislawa Szymborska",
    "Mountains are the cathedrals where I practice my religion. - Anatoli Boukreev"
]

window.onload = function (event) {

    var quotesView = $("#quotes-view");
    quotesView.html(quotes[Math.floor(Math.random() * quotes.length)]);
    quotesView.append($("<h5>").html(`<br><u><a href="http://www.wiseoldsayings.com/hiking-quotes/" target="#">www.wiseoldsayings.com</a></u>`));

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

        $("#quotes-view").hide();
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
        $("#weather").html("The <b>current weather</b> is: <b>" + weather + "</b>F°");
        $("#weather").append("<p>The <b>conditions</b> are: <b>" + condition + "</b>");
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
        $("#uv-index").html("The <b>UV Index</b> is: <b>" + UVIndex + "</b>");
        $("#uv-index").append("<br><small>(Low = 0-2; moderate = 3-5; high = 6-7; very high = 8-10; extreme = 11+)</small>");
        //https://www.epa.gov/sunsafety/uv-index-scale-1
    });

}









