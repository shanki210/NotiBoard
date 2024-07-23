import React, { useState, useEffect, useRef } from "react";

const track = {
  name: "",
  album: {
    images: [{ url: "" }],
  },
  artists: [{ name: "" }],
};

function SpotifyPlayback(props) {
  const [isPaused, setPaused] = useState(false);
  const [isActive, setActive] = useState(false);
  const [currentTrack, setTrack] = useState(track);
  const playerRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb) => {
          cb(props.token);
        },
        volume: 0.5,
      });

      playerRef.current = player; // Store the player instance in a ref

      player.addListener("initialization_error", ({ message }) => {
        console.error("Failed to initialize", message);
      });

      player.addListener("authentication_error", ({ message }) => {
        console.error("Failed to authenticate", message);
      });

      player.addListener("account_error", ({ message }) => {
        console.error("Failed to validate Spotify account", message);
      });

      player.addListener("playback_error", ({ message }) => {
        console.error("Failed to perform playback", message);
      });

      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        setActive(true);
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
        setActive(false);
      });

      player.addListener("player_state_changed", (state) => {
        if (!state) {
          return;
        }

        setTrack(state.track_window.current_track);
        setPaused(state.paused);

        player.getCurrentState().then((state) => {
          !state ? setActive(false) : setActive(true);
        });
      });

      player.connect();
    };

    // Clean up the player instance on component unmount
    return () => {
      if (playerRef.current) {
        playerRef.current.disconnect();
      }
    };
  }, [props.token]);

  const handlePlayPause = () => {
    const player = playerRef.current;
    console.log(player);
    if (player) {
      player.togglePlay().then(() => {
        setPaused((prev) => !prev);
      });
    } else {
      console.error("Player is not initialized");
    }
  };

  const handlePreviousTrack = () => {
    const player = playerRef.current;
    if (player) {
      player.previousTrack().catch((error) => {
        console.error("Error while switching to previous track", error);
      });
    } else {
      console.error("Player is not initialized");
    }
  };

  const handleNextTrack = () => {
    const player = playerRef.current;
    if (player) {
      player.nextTrack().catch((error) => {
        console.error("Error while switching to next track", error);
      });
    } else {
      console.error("Player is not initialized");
    }
  };

  if (!isActive) {
    return (
      <div className="container">
        <div className="main-wrapper">
          <b>
            Instance not active. Transfer your playback using your Spotify app
          </b>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="main-wrapper">
          <img
            src={currentTrack.album.images[0].url}
            className="now-playing__cover"
            alt=""
          />

          <div className="now-playing__side">
            <div className="now-playing__name">{currentTrack.name}</div>
            <div className="now-playing__artist">
              {currentTrack.artists[0].name}
            </div>

            <button className="btn-spotify" onClick={handlePreviousTrack}>
              &lt;&lt;
            </button>

            <button className="btn-spotify" onClick={handlePlayPause}>
              {isPaused ? "PLAY" : "PAUSE"}
            </button>

            <button className="btn-spotify" onClick={handleNextTrack}>
              &gt;&gt;
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SpotifyPlayback;
