const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const routes = require("./routes.js");
app.use("/", routes);
app.use(express.static(path.join(__dirname, "build")));

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
