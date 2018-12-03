//YELP KEY

// Client ID
// mSosLSg7eDfpp54l0C7VhA

// API Key
// 93-sQptypfHJJ-zn2q1fOKSujEsPzhm_gVzq-5g7q_P1G4TIsuM7G126ydE37pmuFcd4o2t-_a8pkiBHZV6Rt1eRkcfzMmOJ5OIFZwsFPvrkjFHdcNEYo1_JBiMAXHYx
$(document).ready(function () {

  // Some APIs will give us a cross-origin (CORS) error. This small function is a fix for that error. You can also check out the chrome extenstion (https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en).
  jQuery.ajaxPrefilter(function (options) {
    if (options.crossDomain && jQuery.support.cors) {
      options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
  });

  //our key for yelp API
  var yelpKey = "93-sQptypfHJJ-zn2q1fOKSujEsPzhm_gVzq-5g7q_P1G4TIsuM7G126ydE37pmuFcd4o2t-_a8pkiBHZV6Rt1eRkcfzMmOJ5OIFZwsFPvrkjFHdcNEYo1_JBiMAXHYx";

  //later, this will be grabbed from the users location. for now, let's use San Francisco"
  var where = "San+Francisco";

  //search terms
  var query = "party"

  // categories string

  // sort_by string (options best_match, rating, review_count, OR distance)

  var sorted = "rating"

  var yelpQueryURL = "https://api.yelp.com/v3/businesses/search?&location="
    + where +
    "&term=" + query +
    "&sort_by=" + sorted +
    "&open_now=true" +
    "&attribute=hot_and_new";

  // var yelpQueryURL = "https://api.yelp.com/v3/businesses/";

  //   var searchRequest ={
  //     location: where,
  //     term: query,
  //   }


  $.ajax({
    url: yelpQueryURL,
    headers: {
      'Authorization': "Bearer " + yelpKey,
    },
    method: "GET",
    dataType: 'json',
  }).then(function (response) {

    // response = JSON.parse(response)
    console.log(response)

    //shorten our path to getting the data we want, incorporating the ability to use a for loop in the future:
    var carousel = $('<div id="owl-demo" class="owl-carousel owl-theme">');

    for (var i = 0; i < response.businesses.length; i++) {


      //Event Title
      var title = response.businesses[i].name;
      //activity type
      var activityType;

      //image
      var imageURL = response.businesses[i].image_url;

      //event URL
      var link = response.businesses[i].url
      // console.log(link)
      //   var cost;

      //    rating;
      var rating = response.businesses[i].rating
      // console.log(rating)

      // address
      // var address = businesses[x].location.address1;


      // Owl Carousel starts here
      var displayDiv = $('<div class="card-item">');
      displayDiv.append(title, "<br>")

      var displayImage = $("<img>")
      displayImage.attr("src", imageURL)
      displayImage.appendTo(displayDiv);


      var displayLink = $("<a>");
      displayLink.attr("href", link)
      displayLink.text("Link: " + title)
      displayDiv.append(displayLink, "<br>")

      var displayRating = $("<p>");
      displayRating.text("Rated " + rating + " stars on Yelp!")
      displayDiv.append(displayRating, "<br>")

      carousel.append(displayDiv);


    }
    $("#carousel-container").html(carousel);

    $("#owl-demo").owlCarousel({
      items: 3,
      dots: true,
      nav: false
    });

    $(".owl-item").on("click", function () {
      $(this).toggleClass('checked');
    });

  });

});



// Lindsey's testimonials



var name = "";
var review = "";


$(document).on("click", "#submit", function (event) {
  event.preventDefault();

  // Grabbed values from text boxes
  name = $("#fname").val().trim();
  review = $("#subject").val().trim();

  // $("#reviews-display").append(" \" " + review + " \" " + " - " + name);
  $("#reviews-display").append ("<div <p>"+ " \" " + review + " \" " + " - " + name+ "</p> </div>");

});


// Lindsey's FB

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAXIOcZoTp4y2t9tYtyiN1JA6HRZoIvT28",
  authDomain: "dayventurebylolz.firebaseapp.com",
  databaseURL: "https://dayventurebylolz.firebaseio.com",
  projectId: "dayventurebylolz",
  storageBucket: "dayventurebylolz.appspot.com",
  messagingSenderId: "858404665634"
};
firebase.initializeApp(config);

var database = firebase.database();

var review = "";
var name = "";

database.ref().on("child_added", function (snapshot) {

  if (snapshot.child("review").exists() && snapshot.child("name").exists()) {

    review = snapshot.val().review;
    name = snapshot.val().name;
  }

var reviewCarousel = $('<div id="review-carousel">');
// $("#reviews-display").append("<div <p>" + " \" " + review + " \" " + " - " + name + "</p> </div>");

$("#reviews-display").append( " \" " + review + " \" " + " - " + name );




});


$(document).on("click", "#submit", function (event) {
  // event.preventDefault();

  // Grabbed values from text boxes
  var reviewerName = $("#fname").val().trim();
  var reviewerReview = $("#subject").val().trim();

  database.ref().push({
    name: reviewerName,
    review: reviewerReview
  });
});




//  var http://api.openweathermap.org/data/2.5/forecast?appid=f54f78656d096d76ff850ad75c4be18e&q=94553,us
// apiKey = f54f78656d096d76ff850ad75c4be18e

$(document).on("click", "#getstarted-button", function (event) {
  event.preventDefault();
  var zipInput = $("#zipInput").val().trim();
  console.log(zipInput);
  var query = "http://api.openweathermap.org/data/2.5/forecast?appid=f54f78656d096d76ff850ad75c4be18e&q=" + zipInput + ",us"
  $.get(query)

    .then(function (data) {
      console.log(data)
      var kelvin = data.list[0].main.temp;
      var fahrenheit = Math.floor(kelvin * 9 / 5 - 459.67);
      console.log(fahrenheit);
      $("#weather-results").append("<h1>The weather in " + data.city.name + " is " + fahrenheit + "\u{000B0} F</h1>")
    })

    .catch(function (error) {
      console.log(error);


    })
})

