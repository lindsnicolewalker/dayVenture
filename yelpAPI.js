
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

    //make the owl carousel
    var carousel = $('<div id="owl-demo" class="owl-carousel owl-theme">');

    for (var i = 0; i < response.businesses.length; i++) {

      //Event ID to track events internally
      var eventID = "eventIDyelp" + [i]

      //Event Title
      var title = response.businesses[i].name;
      //activity type
      var activityType;


      //image
      var imageURL = response.businesses[i].image_url;
      // console.log(imageURL)

      //event URL
      var link = response.businesses[i].url
      // console.log(link)
      //   var cost;

      //    rating;
      var rating = response.businesses[i].rating
      // console.log(rating)

      //cost

      // address - this response is an array, where each element is a 'line' of an address (usually). Let's leave it for now, but later we will need to interpret it.
      var address = [];
      address = response.businesses[i].location.display_address
      // console.log(address)




      // Create a div to display all that sweet data we got
      var displayDiv = $('<div class="card-item">');

      var displayTitle = $("<div>" + title + "</div>")
      displayTitle.addClass(eventID)
      displayTitle.attr("id", "title")
      displayDiv.append(title, "<br>")

      var displayImage = $("<img>")
      displayImage.attr("src", imageURL)
      displayImage.attr("alt", title)
      displayImage.attr("id", "image")
      displayImage.addClass(eventID)
      displayImage.appendTo(displayDiv);


      var displayLink = $("<a>");
      displayLink.attr("href", link)
      displayLink.text("Link: " + title)
      displayLink.addClass(eventID)
      displayDiv.append(displayLink, "<br>")

      var displayRating = $("<p>");
      displayRating.text("Rated " + rating + " stars on Yelp!")
      displayRating.attr("data-rating", rating)
      displayRating.addClass(eventID)
      displayDiv.append(displayRating, "<br>")

      // var datButton = $("<button>")
      // datButton.text("Let's Do It!")
      // datButton.attr("value", eventID, "id", eventID, "class", "button")
      // displayDiv.append(datButton)

      //FOR NOW going to store the address in the div because it's an array.

      //Store the address in the card, but don't display it
      // var storeAddress = $("<a>")
      // storeAddress.addClass(eventID)
      // storeAddress.text(address)
      // storeAddress.attr("data-address",  address)
      // displayDiv.append(storeAddress, "<br>")

      //populate the Owl carousel with the display div we created
      carousel.append(displayDiv);


    }

    $("#carousel-container").html(carousel);

    $("#owl-demo").owlCarousel({
      items: 3,
      dots: false,
      nav: true
    });


    // on click of event, display that event has been selected and grab it's data
    $(".owl-item").on("click", function () {
      $(this).toggleClass('checked');

      //click activity only logs a click, so we need to distinguish between clicking an item the first time and clicking it subsequent times.
      // var owlItemState = $(".owl-item").hasClass("checked");

      // console.log(owlItemState)

      if ($(this).hasClass("checked")) {

        //grab the info from the checked activity
        //title
        var titleFB = $(this).next().find("img").attr("alt");
        // console.log(titleFB)

        //image URL
        var imageFB = $(this).next().find("img").attr("src");
        // console.log(imageFB)

        //link to activity
        var linkFB = $(this).next().find("a").attr("href");
        // console.log(linkFB)

        //cost

        //rating
        var ratingFB = $(this).next().find("p").attr("data-rating");
        // console.log(ratingFB)

        //address
        // var addressFB $(this).next().find("a").attr("href")

        var eventIDFB = $(this).next().find("a").attr("href");
        console.log(eventIDFB)

    
        var funActivity = {
          eventID: eventIDFB,
          title: titleFB,
          image: imageFB,
          link: linkFB,
          // cost: costFB,
          rating: ratingFB,
          // address: addressFB
        }

        // console.log(funActivity)
        
        database.ref().set({
          funActivity
        
        //end of database ref set
        });
      
        //end of owl item click "IF" statement
      };

      //end of click activity
    })


    //end of ajax response
  });

//end of document ready
});
