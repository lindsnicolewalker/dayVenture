var array1 = [["Santa Cruz", 11],
["San Francisco", 12],
["San Jose", 13],
["Oakland", 14],
["Santa Cruz", 13],
["San Francisco", 15],
["San Jose", 16],
["Oakland", 9],
["Sacramento", 111],
];


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

var cityList = convertCityArr(array1); //originally this line was : var cityList = convertCityArr(response); 

var uniqueCities = cityList.filter(unique);

console.log(uniqueCities);


//new
//OLD
//  var newList;
//  newList=uniqueCitiesFromZipApi(array1);
//  console.log(newList);
//  function uniqueCitiesFromZipApi(zipData) {
//             var uniqueCities = [[0, 0], [0, 0]];
//             var element = [[0, 0], [0, 0]];
//             var i =0;
//             if (i < 2) {
//                 element[i][0] = zipData.[0][0];
//                 element[i][1] = zipData.[0][2];
//                 uniqueCities[i] = element;
//                 for (var i = 0; i < zipData.length; i++) {
//                     // if (i<2){
//                     // element[i][0]=zipData.zip_codes[i].city;
//                     // element[i][1]=zipData.zip_codes[i].distance;
//                     // uniqueCities[i]=element;

//                     if (uniqueCities[i][0] == zipData[i][0]) { i++; }
//                     else {
//                         var elem = [[0, 0], [0, 0]];
//                         elem[0][0] = zipData[i][0];
//                         elem[0][1] = zipData[i][1];
//                         uniqueCities[i] = element;
//                     }//closed the else
//                     //}//closed the IF
//                 }//closed the for
//             }
