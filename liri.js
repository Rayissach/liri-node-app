require("dotenv").config();
var keys = require("./javascript/keys.js");

var Twitter = require('twitter');
var request = require('request');
var Spotify = require('node-spotify-api');
var fs = require("fs");
// console.log(keys);
var userAnswer = process.argv;
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var song = "";

// evaluate hat user command is 
// * `my-tweets`

// * `spotify-this-song`

// * `movie-this`

// * `do-what-it-says`
if (userAnswer[2] === "my-tweets") {
    userTweets();
} else if (userAnswer[2] === "spotify-this-song") {
	song = userAnswer[3]
	spotifyStuff();
    
} else if (userAnswer[2] === "movie-this") {
    ombd();
    // console.log("movie-this");

} else if (userAnswer[2] === "do-what-it-says") {
    doTask();
};
// console.log(userAnswer);


function userTweets() {

    var params = { screen_name: userAnswer[3], count: 20 };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            if (tweets.length > 20) {
                for (var i = 0; i < 20; i++) {
                    console.log(tweets[i].created_at);
                    console.log(tweets[i].text);
                }
                }
                 else {
                    for (var i = 0; i < tweets.length; i++) {
                        console.log(tweets[i].created_at);
                        console.log(tweets[i].text);
                    }
            }
        }
    });
};


function spotifyStuff () {

var song = userAnswer[3];

	spotify.search({ type: "track", query: song }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
  var resultsSpotify = data.tracks.items;

  for (var i = 0; i < resultsSpotify.length; i++) {
  	 console.log(resultsSpotify[i].artists[0].name);
  	 console.log(resultsSpotify[i].name);
  	 console.log(resultsSpotify[i].external_urls.spotify);
  	 console.log(resultsSpotify[i].album.name);


  	 console.log("=================");

  }

});

}



function ombd() {
var nodeArgs = process.argv;
var movieName = "";
for (var i = 3; i < nodeArgs.length; i++) {

  if (i > 3 && i < nodeArgs.length) {

    movieName = movieName + "+" + nodeArgs[i];

  }

  else {

    movieName += nodeArgs[i];

  }
}
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

request(queryUrl, function(error, response, body) {


  if (!error && response.statusCode === 200) {
  	// * Title of the movie.
   // * Year the movie came out.
   // * IMDB Rating of the movie.
   // * Rotten Tomatoes Rating of the movie.
   // * Country where the movie was produced.
   // * Language of the movie.
   // * Plot of the movie.
   // * Actors in the movie.

    console.log(JSON.parse(body).Title);
    console.log(JSON.parse(body).Year);
    console.log(JSON.parse(body).imdbRating);
    console.log(JSON.parse(body).Ratings[1].Value);
    console.log(JSON.parse(body).Country);
    console.log(JSON.parse(body).Language);
    console.log(JSON.parse(body).Plot);
    console.log(JSON.parse(body).Actors);

  }

});

}

function doTask() {
	// var results;
   fs.readFile('random.txt', "utf8", function(error, data){
    var txt = data.split(',');

    spotifyStuff(txt[1]);
  });
}
