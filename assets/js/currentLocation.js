

jQuery.ajaxPrefilter(function (options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
});
var dest = "Jenner";
jQuery.getJSON(
    "https://www.zipcodeapi.com/rest/xurGnDV0QceRvNrjKVIyqzPBYRvMVasNhgr9H5j7lAkKLIl8ys7TsN19XoSD13ID/radius.json/94122/65/mile",
    function (zipData) {

        var zipDataArray = zipData.zip_codes;
        var cityList = convertCityArr(zipDataArray);
        uniqueCities = cityList.filter(unique);
        //drawUniqueZipApiTable(uniqueCities);
        var uniqueCities = cityList.filter(unique);
        
        selectedCity = getRandomCity(uniqueCities);
        dest = selectedCity;
        console.log("selected city ran and returned   ");
        console.log(selectedCity);
    }

)

var currentPositionURL;
var map, infoWindow;
console.log("before init map pos is ");
var pos={};
function getPOS() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
                
            };
            
            if(dest.indexOf(' ') >= 0){
                var temp = dest.split(" ");
                var temp1 = temp.join("+");
                dest = temp1;
            }

            currentPositionURL = "https://www.google.com/maps/embed/v1/directions?key=AIzaSyAeSgY8rtEgnuzIXk_iKt5cLcsB0cjqs0s&origin=" + pos.lat + "," + pos.lng + "&destination=" + dest;
                console.log("variable currentPositionURL");
                console.log(currentPositionURL)
          });
    } else {
         //Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
    
};

pos = getPOS();
console.log("pos after func ran ");
console.log("position saved ");
console.log(pos);


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


////////////*********SECOND HALF */

function drawNbcTable(data) {
    var row = $("<tr /><th>Miles</th><th>Kms</th><th>City</th><th>Bearing</th><th>Direction</th>");
    $("#geobytesnearbycities").html(row);
    for (var i = 0; i < data.length; i++) {
        drawNbcRow(data[i]);
    }
}

function drawNbcRow(rowData) {
    var row = $("<tr />");
    $("#geobytesnearbycities").append(row);
    row.append($("<td>" + rowData[11] + "</td>"));
    row.append($("<td>" + rowData[7] + "</td>"));
    row.append($("<td>" + rowData[1] + "</td>"));
    row.append($("<td>" + rowData[0] + "</td>"));
    row.append($("<td>" + rowData[4] + "</td>"));
}

function drawZipApiTable(zipData) {
    var rowFromZipApi = $("<tr /><th>City</th><th>Distance (in miles)</th>");
    console.log("now inside drawZipApiTable");
    $("#zipApiCities").html(rowFromZipApi);
    for (var i = 0; i < zipData.zip_codes.length; i++) {
        drawZipApiRow(zipData.zip_codes[i]);
    }
}

function convertCityArr(array) {
    var cities = [];
    for (var i = 0; i < array.length; i++) {
        var cityName = array[i].city;
        cities.push(cityName)
    }
    return cities;
}

var unique = function (value, index, self) {
    return self.indexOf(value) === index;
}


function getRandomCity(uniqueCities) {

    var selectedCityIndex = uniqueCities[Math.floor(Math.random() * uniqueCities.length)];
    var selectedCity = selectedCityIndex;
    console.log("the randomly chosen city is:  ");
    console.log(selectedCity);
    $("#randomcity").html(selectedCity);
    return selectedCity;
}



function drawZipApiRow(zipRowData) {
    var zipRow = $("<tr />");
    zipRow.append($("<td>" + zipRowData.city + "</td>"));
    zipRow.append($("<td>" + zipRowData.distance + "</td>"));
}

function drawUniqueZipApiRow(zipRowData) {
    var zipRow = $("<tr />");

    return zipRow.append($("<td>" + zipRowData + "</td>"));


}

function drawUniqueZipApiTable(uniqueCities) {
    var rowFromZipApi = $("<tr /><th>City</th><th>Distance (in miles)</th>");
    console.log("now inside drawUniqueZipApiTable");
    $("#uniqueZipApiCities").html(rowFromZipApi);
    for (var i = 0; i < uniqueCities.length; i++) {
        var line = drawUniqueZipApiRow(uniqueCities[i]);
        $("#uniqueZipApiCities").append(line);
    }
}

