const express = require("express");
const router = express.Router();
const { spotify_client_id, spotify_client_secret } = require("../config");
const request = require("request");

const { generateRandomString } = require("../utils");

router.get("/", (req, res) => {
  // res.sendFile(path.join(__dirname, "..", "views", "index.html"));
  res.json("Server is running");
});

router.get("/auth/login", (req, res) => {
  var scope =
    "streaming \
    user-read-email \
    user-read-private";

  var state = generateRandomString(16);

  var auth_query_parameters = new URLSearchParams({
    response_type: "code",
    client_id: spotify_client_id,
    scope: scope,
    redirect_uri: "http://localhost:4000/auth/callback",
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
      redirect_uri: "http://localhost:3000/auth/callback",
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
      var access_token = body.access_token;
      res.redirect("/");
    }
  });
});

module.exports = router;
