
var sGeobytesLocationCode = "";
var sGeobytesIsLocationMatch = false;
var sGeobytesCountry = "";
var sGeobytesCity = "";

var uniqueCities = [];
console.log();
jQuery.getJSON(
    "http://getnearbycities.geobytes.com/GetNearbyCities?callback=?&radius=100&limit=25&locationcode=" + sGeobytesLocationCode,
    function (data) {

    }
);

jQuery.ajaxPrefilter(function (options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
});

jQuery.getJSON(
    "https://www.zipcodeapi.com/rest/xurGnDV0QceRvNrjKVIyqzPBYRvMVasNhgr9H5j7lAkKLIl8ys7TsN19XoSD13ID/radius.json/94122/65/mile",
    function (zipData) {

        console.log("if this is printed drawZipApiTable should have ran");

        var zipDataArray = zipData.zip_codes;
        console.log("below is zipDataArray newly made var ");
        var cityList = convertCityArr(zipDataArray); //originally this line was : var cityList = convertCityArr(response); 
        uniqueCities = cityList.filter(unique);
        drawUniqueZipApiTable(uniqueCities);

        var uniqueCities = cityList.filter(unique);
        console.log("below print out of uniqueCitites function ");
        console.log(uniqueCities);
        getRandomCity(uniqueCities);
        drawZipApiTable();
    }

)

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

    console.log("debug stmt1: we are passing to getRandomCity func below arg: uniqueCitites");
    console.log(uniqueCities);
    var selectedCityIndex = uniqueCities[Math.floor(Math.random() * uniqueCities.length)];
    console.log("we're creating selctedCityIndex which is now equal to:");
    console.log(selectedCityIndex);
    console.log(uniqueCities);

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
        var line=drawUniqueZipApiRow(uniqueCities[i]);
        console.log("current uniqueCities element is");
        console.log(uniqueCities[i]);
        $("#uniqueZipApiCities").append(line);
    }
}