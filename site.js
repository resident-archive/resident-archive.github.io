var o = {
	loadData: () => {
    $.getJSON(
      // Generated in
      // https://github.com/stephanebruckert/resident-archive/blob/master/functions/to-spotify/main.py#L398
      "https://s3-eu-west-1.amazonaws.com/resident-archive/ra-stats.json",
      (json) => {
        // Embed Spotify track
        const spotify_id = json['spotify_last_uri'].replace('spotify:track:', '');
        document.getElementById("last-song").src = "https://open.spotify.com/embed/track/" + spotify_id;

        // Numbers
        document.getElementById("total-ra-songs").innerHTML = json['total_ra_songs'].toLocaleString();
        document.getElementById("total-spotify-songs").innerHTML = json['total_spotify_songs'].toLocaleString();
        document.getElementById("total-playlists").innerHTML = json['total_playlists'];
        document.getElementById("ratio-ra-spotify").innerHTML = json['ratio_ra_spotify'];

        // Time
        const time_ago = moment.unix(json['spotify_last_find_time']).fromNow();
        document.getElementById("spotify-last-find-time").innerHTML = time_ago;
      }
    );
	}
}

$(function() { o.loadData(); });
