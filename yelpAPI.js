// Initialize Firebase
var config = {
  apiKey: "AIzaSyCLn3kgPLJpalQ9LC4DR2lkQvEohkAIe3k",
  authDomain: "blazeit-22443.firebaseapp.com",
  databaseURL: "https://blazeit-22443.firebaseio.com",
  projectId: "blazeit-22443",
  storageBucket: "blazeit-22443.appspot.com",
  messagingSenderId: "784716485493"
};
firebase.initializeApp(config);

var database = firebase.database();

//YELP KEY
// Client ID
// mSosLSg7eDfpp54l0C7VhA

// API Key
// 93-sQptypfHJJ-zn2q1fOKSujEsPzhm_gVzq-5g7q_P1G4TIsuM7G126ydE37pmuFcd4o2t-_a8pkiBHZV6Rt1eRkcfzMmOJ5OIFZwsFPvrkjFHdcNEYo1_JBiMAXHYx


$(document).ready(function () {


  // Some APIs will give us a cross-origin (CORS) error. This small function is a fix for that error. 
  jQuery.ajaxPrefilter(function (options) {
    if (options.crossDomain && jQuery.support.cors) {
      options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
  });

var activeCity

  jQuery.getJSON(
    "https://www.zipcodeapi.com/rest/xurGnDV0QceRvNrjKVIyqzPBYRvMVasNhgr9H5j7lAkKLIl8ys7TsN19XoSD13ID/radius.json/94122/65/mile",
    function (zipData) {

      var zipDataArray = zipData.zip_codes;
      var cityList = convertCityArr(zipDataArray); //originally this line was : var cityList = convertCityArr(response)

      var unique = function (value, index, self) {
        return self.indexOf(value) === index;
      }

      var uniqueCities = cityList.filter(unique);
      getRandomCity(uniqueCities);

      function convertCityArr(array) {
        var cities = [];
        for (var i = 0; i < array.length; i++) {
          var cityName = array[i].city;
          cities.push(cityName)
        }
        return cities;
      }

      function getRandomCity(uniqueCities) {
        var activeCityIndex = uniqueCities[Math.floor(Math.random() * uniqueCities.length)];
       activeCity = activeCityIndex;
      }
      
      //Display the city selected on the page
      $("#city-selected-display").text(activeCity)

      var query = "http://api.openweathermap.org/data/2.5/forecast?appid=f54f78656d096d76ff850ad75c4be18e&q=" + activeCity + ",us"
      $.get(query)
        .then(function (data) {
          var kelvin = data.list[0].main.temp;
          var fahrenheit = Math.floor(kelvin * 9 / 5 - 459.67);
          $("#weather-results").append("<h1>The weather in " + data.city.name + " is " + fahrenheit + "\u{000B0} F</h1>")
        })
        .catch(function (error) {
          console.log(error);
        })


      //our key for yelp API
      var yelpKey = "93-sQptypfHJJ-zn2q1fOKSujEsPzhm_gVzq-5g7q_P1G4TIsuM7G126ydE37pmuFcd4o2t-_a8pkiBHZV6Rt1eRkcfzMmOJ5OIFZwsFPvrkjFHdcNEYo1_JBiMAXHYx";

        
      var where = activeCity;
    


      //search terms
      var query = "events"

      // sort_by string (options best_match, rating, review_count, OR distance)
      var sorted = "rating"

      var yelpQueryURL = "https://api.yelp.com/v3/businesses/search?&location="
        + where +
        "&term=" + query +
        "&sort_by=" + sorted +
        "&open_now=true" +
        "&attribute=hot_and_new";

      $.ajax({
        url: yelpQueryURL,
        headers: {
          'Authorization': "Bearer " + yelpKey,
        },
        method: "GET",
        dataType: 'json',
      }).then(function (response) {

        console.log(response)

        //make the owl carousel
        var carousel = $('<div id="owl-demo" class="owl-carousel owl-theme">');

        for (var i = 0; i < response.businesses.length; i++) {

          //Event ID to track events internally
          //Events from this API will be a number starting at 1000. Another API could be 2000+, another 3000+ and so on.
          var eventID = (10000 + parseInt([i]))

          //Event Title
          var title = response.businesses[i].name;

          //image
          var imageURL = response.businesses[i].image_url;

          //event URL
          var link = response.businesses[i].url

          //    rating;
          var rating = response.businesses[i].rating

          //cost

          // TODO
          // address - this response is an array, where each element is a 'line' of an address (usually). Let's leave it for now, but later we will need to interpret it. possibly use a for loop to store it on the data div?
          var address = [];
          address = response.businesses[i].location.display_address
          // console.log(address)

          //Create a div to store all the data in one place
          var dataDiv = $("<data class='data-storage'>");
          dataDiv.attr("data-ID", eventID);
          dataDiv.attr("data-title", title);
          dataDiv.attr("data-image-URL", imageURL);
          dataDiv.attr("data-link-URL", link);
          dataDiv.attr("data-rating", rating);

          // Create a div to display all that sweet data we got
          var displayDiv = $('<div class="card-item">');


          var displayTitle = $("<div>" + title + "</div>")
          displayTitle.addClass("title")
          displayDiv.append(displayTitle, "<br>")

          var displayImage = $("<img>")
          displayImage.attr("src", imageURL)
          displayImage.attr("alt", title)
          displayImage.addClass("event-image")
          displayDiv.append(displayImage);

          var displayLink = $("<a>");
          displayLink.attr("href", link)
          displayLink.text("Link: " + title)
          displayDiv.append(displayLink, "<br>")

          var displayRating = $("<p>");
          displayRating.text("Rated " + rating + " stars on Yelp!")
          displayDiv.append(displayRating, "<br>")

          displayDiv.append(dataDiv)

          //populate the Owl carousel with the display div we created
          carousel.append(displayDiv);

          //end of activty for loop
        }

        //owl be back! 
        $("#carousel-container").html(carousel);

        $("#owl-demo").owlCarousel({
          items: 3,
          dots: false,
          nav: true
        });

        // on click of event, display that event has been selected and grab it's data
        $(".owl-item").on("click", function () {

          // Bypassing the toggle functionality
          // $(this).toggleClass('checked');

          //check if the activity card has been clicked
          if ($(this).hasClass("checked")) {

            $(this).removeClass('checked');

            // To remove the entry for checkmark unchecked (by ZOE & Lyle)
            var query = database.ref();
            //grab the event ID
            var eventIDremove = $(this).find("data").attr("data-id");

            query.once("value", (function () {

              database.ref().child(eventIDremove).remove();

            }));

            var removeItinerary = "#itinerary-" + eventIDremove;
            console.log(removeItinerary)
            $(removeItinerary).empty()


            //end of owl item click "IF" statement

          } else {
            $(this).addClass('checked');

            //grab the info from the checked activity
            //title
            var titleFB = $(this).find("data").attr("data-title");
            // console.log(titleFB)

            //image URL
            var imageFB = $(this).find("data").attr("data-image-URL");
            // console.log(imageFB)

            //link to activity
            var linkFB = $(this).find("data").attr("data-link-URL");
            // console.log(linkFB)

            //cost

            //rating
            var ratingFB = $(this).find("data").attr("data-rating");
            // console.log(ratingFB)

            //address
            // var addressFB $(this).find("a").attr("href")

            var eventIDFB = $(this).find("data").attr("data-id");
            // console.log(eventIDFB)

            database.ref().child(eventIDFB).push({
              eventID: eventIDFB,
              title: titleFB,
              image: imageFB,
              link: linkFB,
              // cost: costFB,
              rating: ratingFB,
              // address: addressFB

            });

          };

          //end of click activity
        })

        //end of ajax response
      });

      //end of zipcodeAPI
    });

  //end of document ready
});

//empty the itinerary div
// $("#itinerary-display").empty()

database.ref().on("child_added", function (childSnapshot) {

  //mad props to VIVIAN!!
  childSnapshot.forEach(function (child) {

    var obj = child.val();
    // console.log(obj);
    // console.log(obj.title);

    var fireTitle = obj.title;
    var fireImageURL = obj.image;
    var fireLink = obj.link;
    var fireRating = obj.rating;
    var fireID = obj.eventID

    var itineraryDiv = $('<div class="itinerary-activity">');
    var itineraryID = "itinerary-" + fireID
    itineraryDiv.attr("id", itineraryID)

    var itineraryTitle = $("<div>" + fireTitle + "</div>")
    itineraryTitle.attr("id", "fireTitle")
    itineraryDiv.append(fireTitle, "<br>")

    var itineraryImage = $("<img>")
    itineraryImage.attr("src", fireImageURL)
    itineraryImage.attr("alt", fireTitle)
    itineraryImage.addClass("itinerary-image")
    itineraryDiv.append(itineraryImage);

    var itineraryLink = $("<a>");
    itineraryLink.attr("href", fireLink)
    itineraryLink.text("Link: " + fireTitle)
    itineraryDiv.append(itineraryLink)

    var itineraryRating = $("<p>");
    itineraryRating.text("Rated " + fireRating + " stars on Yelp!")
    itineraryRating.attr("data-fire-rating", fireRating)
    itineraryDiv.append(itineraryRating, "<br>")

    $("#itinerary-display").append(itineraryDiv)
  })

  // Handle the errors
}, function (errorObject) {
  console.log("Errors handled: " + errorObject.code);
});



// Lindsey's testimonials

var name = "";
var review = "";
$(document).on("click", "#submit", function (event) {
  event.preventDefault();
  // Grabbed values from text boxes
  name = $("#fname").val().trim();
  review = $("#subject").val().trim();
  $("#reviews-display").text(" \" " + review + " \" " + " - " + name);


});

// // Lindsey's FB
//   // Initialize Firebase
//   var config = {
//     apiKey: "AIzaSyAXIOcZoTp4y2t9tYtyiN1JA6HRZoIvT28",
//     authDomain: "dayventurebylolz.firebaseapp.com",
//     databaseURL: "https://dayventurebylolz.firebaseio.com",
//     projectId: "dayventurebylolz",
//     storageBucket: "dayventurebylolz.appspot.com",
//     messagingSenderId: "858404665634"
//   };
//   firebase.initializeApp(config);
//    var database = firebase.database();
var review = "DAYVENTURE IS AWESOME. FIVE STARS";
var name = "Harry Potter";
database.ref().on("value", function (snapshot) {
  if (snapshot.child("review").exists() && snapshot.child("name").exists()) {
    review = snapshot.val().review;
    name = snapshot.val().name;
  }
  $("#reviews-display").text(" \" " + review + " \" " + " -" + name);
});
$(document).on("click", "#submit", function (event) {
  // event.preventDefault();
  // Grabbed values from text boxes
  var reviewerName = $("#fname").val().trim();
  var reviewerReview = $("#subject").val().trim();
  database.ref().set({
    name: reviewerName,
    review: reviewerReview
  });

});
