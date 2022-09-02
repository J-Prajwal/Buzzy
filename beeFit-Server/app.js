var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var fitnessRouter = require('./routes/fitness');
var app = express();
const connection = require('./Config/db.js');
const cors = require('cors');
app.use(cors());
app.use(express.json());
require("dotenv").config();


const userController = require('./Routes/user.routes');
const recordController = require('./Routes/record.routes.js');





app.get('/', (req, res) => {
    res.send("Homepage");
})

app.use("/user", userController);
app.use('/record',recordController);



// Slack Bot
app.use(logger('dev'));
// app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/fitness', fitnessRouter);

module.exports = app;


app.listen(process.env.PORT, async () => {
    try {
        await connection
        console.log("Connection sucessfull")
    }
    catch (err) {
        console.log(err)
    }
    console.log('Listening on port http://localhost:7000');
})