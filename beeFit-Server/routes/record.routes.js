const express = require('express');
const RecordDataModel = require("../models/Record.model");
const recordController = express.Router();
let jwt = require('jsonwebtoken');
const authentication = require('../Middleware/authentication');
const authorization=require('../Middleware/authorization');

//Post request
recordController.post("/usercreate", authentication, async (req, res) => {
    const {userId,name,student_code,topic,content,time} = req.body;
    const new_record = new RecordDataModel({
        userId,
        name,
        student_code,
        topic,
        content,
        time
    })
    await new_record.save();
    return res.send({ messege: "Recorded sucessfully", new_record });
})


//User get request
recordController.get('/userdata',authentication,async(req,res)=>
{
    const { userId } = req.body;
    const recordData = await RecordDataModel.find({ userId });
    res.send(recordData);
})


//Only admin get request
//Top Ten
recordController.get("/leaderboard",authentication,authorization(["Admin"]) ,async(req,res)=>
{
    const topTen=await RecordDataModel.find().sort({time:-1}).limit(10)
    res.send(topTen);
})





module.exports=recordController;
