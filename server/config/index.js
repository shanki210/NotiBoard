const dotenv = require("dotenv");
dotenv.config();
exports.PORT = process.env.PORT || 4001;

exports.dbSecretFields = ["__v", "password"];

exports.LOCALHOST_CLIENT_URL = process.env.LOCALHOST_CLIENT_URL;
exports.LOCALHOST_SERVER_URL = process.env.LOCALHOST_SERVER_URL;

exports.spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
exports.spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;

exports.SESSIONS_SECRET = process.env.SESSIONS_SECRET;

exports.BASE_CLIENT_URL = exports.LOCALHOST_CLIENT_URL;
exports.BASE_SERVER_URL = exports.LOCALHOST_SERVER_URL;
const allowedOrigins = [
  exports.BASE_CLIENT_URL,
  "https://sdk.scdn.co",
  "https://yet-another-allowed-origin.com",
];

exports.CORS_CONFIG = {
  origin: function (origin, callback) {
    // Allow requests with no origin, like mobile apps or curl requests
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

exports.GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
exports.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
exports.GOOGLE_CALLBACK_URL = `${exports.BASE_SERVER_URL}/auth/google/callback`;

exports.GOOGLE_SERVICE_ACCOUNT_KEY =
  JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY) || undefined;
