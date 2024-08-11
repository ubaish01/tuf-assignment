const express = require("express");
const app = express();
const AuthRouter = require("./routes/auth.route");
const BannerRouter = require("./routes/banner.route");
app.use(express.json());
const cors = require("cors");

const LOCALHOST = "http://localhost:5173";

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(
  cors({
    origin: [process.env.CLIENT_URL || LOCALHOST, LOCALHOST],
    credentials: true,
  })
);

app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/banner", BannerRouter);

module.exports = app;
