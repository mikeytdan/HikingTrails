function getTrails(lat, long, maxDistance = 10) {
    console.log(`(${lat}, ${long})`);
    var query = `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${long}&maxDistance=${maxDistance}&sort="distance"&key=200282203-1d83dafe12170bd3d0349c29fafc90b9`
    $.ajax({
        url: query,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        for (trail of response.trails) {
            addTrail(trail);
        }
    });
}

// ascent: 2592
// conditionDate: "2018-06-05 00:00:00"
// conditionDetails: ""
// conditionStatus: "All Clear"
// descent: -2592
// difficulty: "blueBlack"
// high: 8895
// id: 7002420
// imgMedium: "https://cdn-files.apstatic.com/hike/7010578_medium_1453489946.jpg"
// imgSmall: "https://cdn-files.apstatic.com/hike/7010578_small_1453489946.jpg"
// imgSmallMed: "https://cdn-files.apstatic.com/hike/7010578_smallMed_1453489946.jpg"
// imgSqSmall: "https://cdn-files.apstatic.com/hike/7010578_sqsmall_1453489946.jpg"
// latitude: 40.6327
// length: 7
// location: "Cottonwood Heights, Utah"
// longitude: -111.7226
// low: 6307
// name: "Lake Blanche Trail"
// starVotes: 29
// stars: 4.7
// summary: "Epic views along this steep route, which has become a favorite in the Wasatch Range."
// type: "Featured Hike"
// url: "https://www.hikingproject.com/trail/7002420/lake-blanche-trail"

function addTrail(trail) {
    var id = trail.id;
    var name = trail.name;
    var summary = trail.summary;
    var difficulty = trail.difficulty;
    var url = trail.url;
    var rating = trail.stars;
    var numberOfRatings = trail.starVotes;
    var location = trail.location;
    var image = trail.imgSqSmall;
    var lat = trail.latitude;
    var long = trail.longitude;
    var length = trail.length;
    var conditionStatus = trail.conditionStatus;
    var conditionDetails = trail.conditionDetails;
    var conditionDate = trail.conditionDate;
    var ascent = trail.ascent;
    var descent = trail.descent;
    var low = trail.low;
    var high = trail.high;

    var directionsLink = `https://maps.google.com?daddr=${lat},${long}`;

    var trailDiv = $("<div>").addClass("m-2");
    var row = $("<div>").addClass("row");
    var imageColDiv = $("<div>").addClass("col image-col");
    var contentColDiv = $("<div>").addClass("col");
    row.append(imageColDiv);
    row.append(contentColDiv);
    trailDiv.append(row);
    var imageElement = $(`<img src="${image ? image : "assets/images/mountain_placeholder.png"}" width=100px height=100px/>`);
    $(imageElement).css("border-radius", 8);
    imageElement.addClass("p-0 m-0");
    imageColDiv.append(imageElement);
    contentColDiv.append($("<div>").addClass("text-left").html("<b>Name:</b> " + name));
    contentColDiv.append($("<div>").addClass("text-left").html("<b>Location:</b> " + location));
    contentColDiv.append($("<div>").addClass("text-left").html(`<b>Difficulty</b>: ${difficulty}`));
    contentColDiv.append($("<div>").addClass("text-left").html("<b>Length:</b> " + length + " mi"));
    var statusText = "<b>Status:</b> " + conditionStatus;
    if (conditionDetails) {
        statusText += "1 - " + conditionDetails;
    }
    contentColDiv.append($("<div>").addClass("text-left").html(statusText));
    contentColDiv.append($("<div>").addClass("text-left").html("<b>Description:</b> " + summary));
    imageColDiv.append($("<div>").addClass("text-center").html(`<small>${rating}★ (${numberOfRatings})</small>`));
    imageColDiv.append($("<div>").addClass("text-center ").html(`<small><a href="${directionsLink}" target="_blank">Directions</a></small>`));
    $("#trails").append(trailDiv);

    
    // console.log("--------------------------------------------");
    // console.log("name: " + name);
    // console.log("summary: " + summary);
    // console.log("difficulty: " + difficulty);
    // console.log("url: " + url);
    // console.log("rating: " + rating);
    // console.log("numberOfRatings: " + numberOfRatings);
    // console.log("location: " + location);
    // console.log("image: " + image);
    // console.log("lat: " + lat);
    // console.log("long: " + long);
    // console.log("length: " + length);
    // console.log("conditionStatus: " + conditionStatus);
    // console.log("conditionDetails: " + conditionDetails);
    // console.log("conditionDate: " + conditionDate);
    // console.log("ascent: " + ascent);
    // console.log("descent: " + descent);
    // console.log("low: " + low);
    // console.log("high: " + high);
    // console.log("--------------------------------------------");
}

window.onload = function (event) {
    console.log("Loaded!");
    var coordinate = latLong("84094");
    if (coordinate == undefined) {
        console.log("Invalid zip code!");
        return;
    }

    console.log(`Coordinate: (${coordinate.lat}, ${coordinate.long})`);
    getTrails(coordinate.lat, coordinate.long);
    $("#trails").addClass("mx-auto");
}