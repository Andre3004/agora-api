const express = require("express");
const {
  ping,
  generateRTCToken,
  generateRTMToken,
} = require("./controllers/tokenController.js");

const router = express.Router();
const path = require("path");

const nocache = (_, resp, next) => {
  resp.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  resp.header("Expires", "-1");
  resp.header("Pragma", "no-cache");
  next();
};

router.get("/ping", nocache, ping);
router.get("/rtc/:channel/:role/:tokentype/:uid", nocache, generateRTCToken);
router.get("/rtm/:uid/", nocache, generateRTMToken);
router.get("/front", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

module.exports = router;
