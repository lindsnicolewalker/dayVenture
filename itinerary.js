 // Initialize Firebase
 var config = {
  apiKey: "AIzaSyCLn3kgPLJpalQ9LC4DR2lkQvEohkAIe3k",
  authDomain: "blazeit-22443.firebaseapp.com",
  databaseURL: "https://blazeit-22443.firebaseio.com",
  projectId: "blazeit-22443",
  storageBucket: "blazeit-22443.appspot.com",
  messagingSenderId: "784716485493"
};
// firebase.initializeApp(config);

var database = firebase.database();

//every time an event is published to firebase, it will start to fill out the itinerary

dataRef.ref().on("child_added", function(childSnapshot) {
 
  var itineraryDiv = $('<div class="itinerary-card">');

  var itineraryTitle = $("<div>" + title + "</div>")
  itineraryTitle.addClass(eventID)
  itineraryTitle.attr("id", "title")
  itineraryDiv.append(title, "<br>")

  var itineraryImage = $("<img>")
  itineraryImage.attr("src", imageURL)
  itineraryImage.attr("alt", title)
  itineraryImage.attr("id", "image")
  itineraryImage.addClass(eventID)
  itineraryImage.appendTo(itineraryDiv);


  var itineraryLink = $("<a>");
  itineraryLink.attr("href", link)
  itineraryLink.text("Link: " + title)
  itineraryLink.addClass(eventID)
  itineraryDiv.append(itineraryLink, "<br>")

  var itineraryRating = $("<p>");
  itineraryRating.text("Rated " + rating + " stars on Yelp!")
  itineraryRating.attr("data-rating", rating)
  itineraryRating.addClass(eventID)
  itineraryDiv.append(itineraryRating, "<br>")

  $("#itinerary-display").append()



 // Handle the errors
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});