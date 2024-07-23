const express = require("express");
const router = express.Router();
const { spotify_client_id, spotify_client_secret } = require("../config");
var spotify_redirect_uri = "http://localhost:4000/auth/callback";
const request = require("request");

const { generateRandomString } = require("../utils");

global.access_token = "";

router.get("/", (req, res) => {
  // res.sendFile(path.join(__dirname, "..", "views", "index.html"));
  res.json("Server is running");
});

router.get("/auth/login", (req, res) => {
  var scope =
    "streaming user-read-email user-read-private user-read-playback-state user-modify-playback-state user-read-currently-playing";

  var state = generateRandomString(16);

  var auth_query_parameters = new URLSearchParams({
    response_type: "code",
    client_id: spotify_client_id,
    scope: scope,
    redirect_uri: spotify_redirect_uri,
    state: state,
  });

  res.redirect(
    "https://accounts.spotify.com/authorize/?" +
      auth_query_parameters.toString()
  );
});

router.get("/auth/callback", (req, res) => {
  var code = req.query.code;

  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri: spotify_redirect_uri,
      grant_type: "authorization_code",
    },
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(spotify_client_id + ":" + spotify_client_secret).toString(
          "base64"
        ),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      access_token = body.access_token;
      res.redirect("http://localhost:5173/");
    }
  });
});

router.get("/auth/token", (req, res) => {
  res.json({ access_token: access_token });
});

module.exports = router;
