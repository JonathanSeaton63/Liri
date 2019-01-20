require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require("moment");
var command = process.argv[2];
var action = process.argv[3];
// var inputString = process.argv;
var joined = [];
var queryURL = "http://www.omdbapi.com/?t=" + action + "&y=plot=short&apikey=trilogy";
var bandsURL = "https://rest.bandsintown.com/artists/" + action + "/events?app_id=codingbootcamp"
var spotify = new Spotify(keys.spotify);
var fs = require("fs");

if (command === "movie-this") {
    if (action === undefined) {
        action = "Toy+Story"
    }
    axios.get(queryURL).then(
        function (response) {
            console.log("Tttle: " + response.data.Title);
            console.log("Release: " + response.data.Year);
            console.log("The movie's rating is: " + response.data.imdbRating);
            console.log("Rotten Tomatos: " + response.data.Ratings[1].Value);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        }
    );
} 
else if (command === "concert-this") {
    if (action === undefined) {
        action = "imagine+dragons"
    }
    axios.get(bandsURL).then(
        function (response) {
            console.log("Venue: " + response.data[0].venue.name);
            console.log("City: " + response.data[0].venue.city);
            console.log("Date: " + moment(response.data[0].datetime, "YYYY-MM-DDTHH:mm:ss").format("MM/DD/YYYY, h:mm A"));
        }
    );
}
 else if (command === "spotify-this-song") {
    if (action === undefined) {
        action = "believer"
    }
    spotify.search({ type: 'track', query: action }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        var song = data.tracks.items[0];
        for (i = 0; i < song.artists.length; i++) {
            console.log("Artists Name: " + song.artists[i].name);
            console.log("Song Name: " + song.name);
            console.log("Album Name: " + song.album.name);
            console.log("Song Preview: " + song.preview_url);
    
        };
    })
}

fs.appendFile("log.txt", action + " " + joined.join(' ') +
"\n",
function (err) {

    if (err) {
        return console.log("error")
    }
  })

