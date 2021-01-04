const mongoose = require("mongoose");
const userModel = require('./model/user.model');
const followerModel = require('./model/follower.model');
const paperModel = require('./model/paper.model');
const commentModel = require('./model/comment.model');
const userController = require('./controller/user.controller');
const paperController = require('./controller/paper.controller');
const commentController = require('./controller/comment.controller');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const dburl = "mongodb://localhost:27017/rpaper";

mongoose.set('useCreateIndex', true);

mongoose.connect(dburl, { useUnifiedTopology: true, useNewUrlParser: true }, (err)=>{
    if (!err)
        console.log("Successfully connected to database");
    else
        console.log("Error occurred during database connection");
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.static('uploads'));
app.use('/user', userController);
app.use('/paper', paperController);
app.use('/comment', commentController);

app.listen("80", ()=>
{
    console.log("Server started at port 80");
});