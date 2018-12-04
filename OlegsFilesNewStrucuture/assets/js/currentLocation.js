// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
var dest="Jenner";
var map, infoWindow;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 6
    });
    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            // //creating the URL with newly collected location of user
            //NOTE DEST NOW IS HARDCODED TO BE JENNER --- THIS needs to be updated and destination needs to be selected first before any other work happens.
            var currentPositionURL = "https://www.google.com/maps/embed/v1/directions?key=AIzaSyAeSgY8rtEgnuzIXk_iKt5cLcsB0cjqs0s&origin=" + pos.lat + "," + pos.lng + "&destination="+dest;
            console.log(currentPositionURL);
            $(".current-location").attr("src", currentPositionURL);
            console.log(currentPositionURL);
            console.log("pos is     ");
            console.log(pos);
            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}