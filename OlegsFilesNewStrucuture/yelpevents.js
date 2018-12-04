// Some APIs will give us a cross-origin (CORS) error. This small function is a fix for that error. 
jQuery.ajaxPrefilter(function (options) {
  if (options.crossDomain && jQuery.support.cors) {
    options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
  }
});

//our key for yelp API
var yelpKey = "93-sQptypfHJJ-zn2q1fOKSujEsPzhm_gVzq-5g7q_P1G4TIsuM7G126ydE37pmuFcd4o2t-_a8pkiBHZV6Rt1eRkcfzMmOJ5OIFZwsFPvrkjFHdcNEYo1_JBiMAXHYx";

        
var where = "san+francisco";



//search terms
var query = "events"

// sort_by string (options best_match, rating, review_count, OR distance)
var sorted = "rating"

var yelpQueryURL = "https://api.yelp.com/v3/events/search?&location="
  + where +
  ""

$.ajax({
  url: yelpQueryURL,
  headers: {
    'Authorization': "Bearer " + yelpKey,
  },
  method: "GET",
  dataType: 'json',
}).then(function (response) {

  console.log(response)

      });
      