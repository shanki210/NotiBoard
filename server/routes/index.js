const express = require("express");
const router = express.Router();
const { google } = require("googleapis");
const { spotify_client_id, spotify_client_secret } = require("../config");
const {
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CALLBACK_URL,
} = require("../config");
var spotify_redirect_uri = "http://localhost:4000/auth/callback";
const request = require("request");

const { generateRandomString } = require("../utils");

global.access_token = "";
global.refreshToken = "";
global.accessToken = "";

const oAuth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL
);

router.get("/", (req, res) => {
  res.json("Server is running");
});

router.get("/auth/google", (req, res) => {
  const scopes = ["https://www.googleapis.com/auth/calendar.readonly"];
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });
  res.redirect(authUrl);
});

router.get("/auth/google/callback", async (req, res) => {
  const { code } = req.query;
  try {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    global.accessToken = tokens.access_token;
    global.refreshToken = tokens.refresh_token;

    // Redirect to home screen or wherever you want after successful authorization
    res.redirect("http://localhost:5173/"); // Replace with your front-end URL
  } catch (error) {
    console.error("Error retrieving access token", error);
    res.status(500).send("Error retrieving access token");
  }
});

router.get("/api/schedule", async (req, res) => {
  try {
    oAuth2Client.setCredentials({
      access_token: global.accessToken,
      refresh_token: global.refreshToken,
    });
    const calendar = google.calendar({ version: "v3", auth: oAuth2Client });
    const response = await calendar.events.list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    });
    const events = response.data.items.map((event) => ({
      id: event.id,
      title: event.summary,
      time: new Date(event.start.dateTime || event.start.date).toLocaleString(),
    }));
    res.json(events);
  } catch (error) {
    console.error("Error fetching schedule", error);
    res.status(500).send("Error fetching schedule");
  }
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
      global.access_token = body.access_token;
      res.redirect("http://localhost:5173/"); // Redirect to your home screen
    }
  });
});

router.get("/auth/token", (req, res) => {
  res.json({ access_token: global.access_token });
});

router.get("/auth/google/token", (req, res) => {
  res.json({ access_token: global.accessToken });
});

module.exports = router;
