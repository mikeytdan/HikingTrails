

// open weather map api key: 19c1678d8290bb9850e1fdc1681c0dd7

function getTrails(lat, long) {
    
}

function getWeather(lat, long) {
//current weather by zip code
    var queryWeather = "http://api.openweathermap.org/data/2.5/weather?zip" + 
    "&APPID=19c1678d8290bb9850e1fdc1681c0dd7";

    //uv index by zip code
    var queryUVIndex = "http://api.openweathermap.org/data/2.5/uvi?appid=19c1678d8290bb9850e1fdc1681c0dd7&lat=" +
    test.lat +"&lon={lon}";

    //air pollution - ozone- by zip code, and i think i'll need a current date variable (moment.js?)
    var queryAirPollution = "http://api.openweathermap.org/pollution/v1/o3/{location}/{datetime}.json?appid=19c1678d8290bb9850e1fdc1681c0dd7"; 

    $.ajax({
        url: queryWeather,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    }),

    $.ajax({
        url: queryUVIndex,
        method: "GET"
    }).then(function(response){
        console.log(response);
    })
}






