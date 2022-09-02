const axios = require("axios");
var express = require("express");
var router = express.Router();
require("dotenv").config();

router.get("/", async function (req, res, next) {
  const result = await axios.get("https://jsonplaceholder.typicode.com/posts");
  const mes = result.data[0].title;
  // const url = process.env.SLACK_SECRET_HOOK;
  // const slackResult = await axios.post(url, {
  //   text: `@channel hi`,
  // });
});

module.exports = router;
