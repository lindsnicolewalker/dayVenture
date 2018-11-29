//ALL CAPS used to signify placeholder values


// Initialize Firebase
var config = {
  apiKey: "AIzaSyB4arVe_Ijkq8UJiqiL6WoUwzFgECIBE88",
  authDomain: "dayventure-e1ea5.firebaseapp.com",
  databaseURL: "https://dayventure-e1ea5.firebaseio.com",
  projectId: "dayventure-e1ea5",
  storageBucket: "dayventure-e1ea5.appspot.com",
  messagingSenderId: "670925477890"
};
firebase.initializeApp(config);



firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();


//Store all the dayventure stuff in the dayventure directory

var dayventureRef = database.ref("/dayventure");


// '.info/connected' is a special location provided by Firebase that is updated every time
// the client's connection state changes.
// '.info/connected' is a boolean value, true if the client is connected and false if they are not.
var connectedRef = database.ref(".info/connected");

// When the client's connection state changes...
connectedRef.on("value", function (snap) {

  //used to track individual users or instances
  var userCount = 0;

  // If they are connected..
  if (snap.val()) {

    // Add user to the connections list.
    var con = connectionsRef.push("User Number " + userCount);

    userCount++
    // Remove user from the connection list when they disconnect.
    //not sure if this will remove the specific user number we want, but we will test.
    con.onDisconnect().remove();
  }
});


//A user has identified an activity that they like, and we need to grab the info from that and store it in firebase
$("#ADD-TO-ITENERAY").on("click", function (event) {

  // Prevent form from submitting
  event.preventDefault();

  // Get the input values
  
  //-title
  //-image (or stock photo)
  //-link
  //-cost
  //-rating

  // not displayed but still need to grab: address

  var titleFB = $("#TITLE").val();
  var imageFB = $("#IMAGE").val
  var linkFB = $("#LINK").val();
  var costFB = $("#COST").val();
  var ratingFB = $("#RATING").val();
  var addressFB = $("#ADDRESS").val()

  //create an object to store all these keyz

  var funActivity = {
    title: titleFB,
    image: imageFB,
    link: linkFB,
    cost: costFB,
    rating: ratingFB,
    address: addressFB
  }

  // Log the Bidder and Price (Even if not the highest)
  console.log(bidderPrice);
  console.log(initialBidder);

  if (bidderPrice > highPrice) {

    // Alert
    alert("You are now the highest bidder.");

    // Save the new price in Firebase
    database.ref().set({
      highPrice: bidderPrice,
      highBidder: initialBidder,
    })