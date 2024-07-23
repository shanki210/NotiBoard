const express = require("express");
const app = express();
const path = require("path");
const { PORT } = require("./config");
const api = require("./routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { CORS_CONFIG } = require("./config");

app.use(cors({ ...CORS_CONFIG }));
app.use(express.json());
app.use(cookieParser());

app.use("/", api);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} `);
});
