let o = {
    loadData: () => {
        $.getJSON(
            // Generated in
            // https://github.com/stephanebruckert/resident-archive/blob/master/functions/to-spotify/main.py#L398
            "https://s3-eu-west-1.amazonaws.com/resident-archive/ra-stats.json",
            (json) => {
            // Embed Spotify track
            const spotifyId = json['spotify_last_uri'].replace('spotify:track:', '');
            document.getElementById("last-song").src = "https://open.spotify.com/embed/track/" + spotifyId;

            // Numbers
            document.getElementById("total-ra-songs").innerHTML = json['total_ra_songs'].toLocaleString();
            document.getElementById("total-spotify-songs").innerHTML = json['total_spotify_songs'].toLocaleString();
            document.getElementById("total-playlists").innerHTML = json['total_playlists'];
            document.getElementById("ratio-ra-spotify").innerHTML = parseFloat(json['ratio_ra_spotify']).toFixed(2);

            // Time
            const timeAgo = moment.unix(json['spotify_last_find_time']).fromNow();
            document.getElementById("spotify-last-find-time").innerHTML = timeAgo;

            // Update meta description
            document.head.querySelector("[name~=description][content]").content += `
                ${json['total_spotify_songs'].slice(0, -3)}k songs in ${json['total_playlists']} playlists.`;
            }
        );
    }
}

$(function() { o.loadData(); });
