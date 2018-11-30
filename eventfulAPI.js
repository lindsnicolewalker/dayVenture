// Some APIs will give us a cross-origin (CORS) error. This small function is a fix for that error. You can also check out the chrome extenstion (https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en).
jQuery.ajaxPrefilter(function (options) {
  if (options.crossDomain && jQuery.support.cors) {
    options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
  }
});

//our key for eventful API
var eventfulKey = "mZ27S7VPD3fjVM4g";

//later, this will be grabbed from the users location. for now, let's use San Francisco"
var where = "San+Francisco";

//search terms
var query = "party"


var eventfulQueryURL = "http://api.eventful.com/json/events/search?...&app_key="
  + eventfulKey +
  "&location=" + where +
  "&keywords=" + query +
  "&date=today"

$.ajax({
  url: eventfulQueryURL,
  method: "GET"
}).then(function (response) {

  response = JSON.parse(response)
  console.log(response)

//shorten our path to getting the data we want, incorporating the ability to use a for loop in the future:


for (var i = 0; i<response.events.event.length; i++) {


//Event Title
  var title = response.events.event[i].title;
  //activity type
  var activityType;
  
  //image: medium, small, and thumb are available. medium selected
  var imageURL = response.events.event[i].image.medium.url;
  console.log(imageURL)

  //event URL
  var link = response.events.event[i].url
  var cost;
  var reviews;


  displayDiv = $("<div>")
  displayDiv.append(title, "<br>")
  displayImage = $("<img>")
  displayImage.attr("src", "https:" + imageURL)
  displayDiv.append(displayImage, "<br>")


  displayLink = $("<a>");
  displayLink.attr("href", link)
  displayLink.text("Link to" + title)
  displayDiv.append(displayLink, "<br>")


  $("#eventful-results").append(displayDiv, "<hr>")

}

});