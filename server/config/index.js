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

exports.CORS_CONFIG = {
  origin: exports.BASE_CLIENT_URL,
  credentials: true,
};

exports.GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
exports.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
exports.GOOGLE_CALLBACK_URL = `${exports.BASE_SERVER_URL}/auth/google/callback`;

exports.GOOGLE_SERVICE_ACCOUNT_KEY =
  JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY) || undefined;
