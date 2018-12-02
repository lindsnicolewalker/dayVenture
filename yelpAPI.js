//YELP KEY

// Client ID
// mSosLSg7eDfpp54l0C7VhA

// API Key
// 93-sQptypfHJJ-zn2q1fOKSujEsPzhm_gVzq-5g7q_P1G4TIsuM7G126ydE37pmuFcd4o2t-_a8pkiBHZV6Rt1eRkcfzMmOJ5OIFZwsFPvrkjFHdcNEYo1_JBiMAXHYx
$(document).ready(function(){

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
      console.log(imageURL)

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

$(".owl-item").on("click", function(){
  $(this).toggleClass('checked');
});

});

});



// Lindsey's testimonials


 
var name = "";
var review = ""; 


$(document).on("click", "#submit", function(event) {
  event.preventDefault();

  // Grabbed values from text boxes
  name = $("#fname").val().trim();
  review = $("#subject").val().trim();

  $("#reviews-display").text(" \" " + review + " \" " + " - " + name);
 
   
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

var review = "DAYVENTURE IS AWESOME. FIVE STARS";
var name = "Harry Potter";

database.ref().on("value", function(snapshot){

  if(snapshot.child("review").exists() && snapshot.child("name").exists()){

    review = snapshot.val().review; 
    name= snapshot.val().name; 
 }

  $("#reviews-display").text(" \" " + review + " \" " + " -" + name);
 });


  $(document).on("click", "#submit", function(event) {
  // event.preventDefault();

  // Grabbed values from text boxes
  var reviewerName = $("#fname").val().trim();
  var reviewerReview = $("#subject").val().trim();

  database.ref().set({
  name: reviewerName,
  review: reviewerReview
});
   
}); 





