import React, { useState, useEffect, useRef } from "react";
import { MdSkipPrevious, MdSkipNext } from "react-icons/md";
import { FaPause } from "react-icons/fa6";
import { IoMdPlay } from "react-icons/io";

const track = {
  name: "",
  album: {
    images: [
      {
        url: "https://cdn.pixabay.com/photo/2016/10/22/00/15/spotify-1759471_640.jpg",
      },
    ],
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
        <div className="main-wrapper border p-2 rounded">
          <img
            src={currentTrack.album.images[0].url}
            className="now-playing__cover"
            alt=""
          />

          <div className="now-playing__side " style={{ color: "white" }}>
            <div className="now-playing__name">{currentTrack.name}</div>
            <div className="now-playing__artist">
              {currentTrack.artists[0].name}
            </div>
            <div className="d-flex justify-content-between align-items-center ">
              <button className="btn-spotify " onClick={handlePreviousTrack}>
                <MdSkipPrevious
                  style={{ width: "1.5rem", height: "1.5rem", color: "white" }}
                />
              </button>

              <button className="btn-spotify" onClick={handlePlayPause}>
                {isPaused ? (
                  <IoMdPlay style={{ width: "1.5rem", height: "1.5rem" }} />
                ) : (
                  <FaPause
                    style={{
                      width: "1.5rem",
                      height: "1.5rem",
                      color: "white",
                    }}
                  />
                )}
              </button>

              <button className="btn-spotify" onClick={handleNextTrack}>
                <MdSkipNext
                  style={{ width: "1.5rem", height: "1.5rem", color: "white" }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SpotifyPlayback;
