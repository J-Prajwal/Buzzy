const express = require("express");
const RecordDataModel = require("../models/Record.model");
const recordController = express.Router();
let jwt = require("jsonwebtoken");
const authentication = require("../Middleware/authentication");
const authorization = require("../Middleware/authorization");
const axios = require("axios");

//Post request
recordController.post("/create", authentication, async (req, res) => {
  const { userId, name, student_code, topic, content, time } = req.body;
  const new_record = new RecordDataModel({
    userId,
    name,
    student_code,
    topic,
    content,
    time,
  });
  let message = `Hi everyone, Myself ${name} - ${student_code}.\nI have spoken for ${time} on the topic: ${topic} today.\nRead the content here:\n${content}`;
  const url = process.env.SLACK_SECRET_HOOK;
  const slackResult = await axios.post(url, {
    text: message,
  });
  await new_record.save();
  return res.send({ messege: "Recorded sucessfully", new_record });
});

//User get request
recordController.get("/userdata", authentication, async (req, res) => {
  const { userId } = req.body;
  const recordData = await RecordDataModel.find({ userId });
  res.send(recordData);
});

//Only admin get request
//Top Ten
recordController.get(
  "/leaderboard",
  authentication,
  authorization(["Admin"]),
  async (req, res) => {
    const topTen = await RecordDataModel.find().sort({ time: -1 }).limit(10);
    res.send(topTen);
  }
);

recordController.post(
  "/leaderboard/post",
  authentication,
  authorization(["Admin"]),
  async (req, res) => {
    let message = req.body;
    console.log(message);
    const url = process.env.SLACK_SECRET_HOOK;
    let data = "Top Ranked Speakers of this week: \n\n";
    let newTime = [];
    message.forEach((ele, ind) => {
      newTime = ele.time.split(" ");
      newTime[0] = newTime[0] + " h";
      newTime[1] = newTime[1] + " m";
      newTime[2] = newTime[2] + " s";
      newTime[3] = newTime[3] + " ms";
      data += `Rank: ${ind + 1} - ${ele.name} (${ele.student_code}) - Time: [${newTime.join(" : ")}] \n\n`;
    });
    const slackResult = await axios.post(url, {
      text: data,
    });
  }
);

module.exports = recordController;
