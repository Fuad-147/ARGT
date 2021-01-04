const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userModel = mongoose.model("user");
const followerModel = mongoose.model("follower");
const md5 = require('md5');

router.post('/login', login);
router.post('/register', registration);
router.post('/follow', follow);
router.post('/get/follow', getFollow);
router.post('/unfollow', unfollow);
router.post('/update', updateProfile);
router.get('/get/profile/:email', getProfile);
router.get('/search/tag/:tag', searchTag);
router.get('/search/email/:email', searchEmail);
router.get('/suggestion/:email/:limit', suggestion);

async function login(req, res)
{
    req.body.password = md5(req.body.password);

    userModel.findOne({email: req.body.email}, (err, docs)=>
    {
        if (err)
            res.send("Error occurs during login");
        else if (!docs)
            res.send("Wrong Email Address");
        else
        {
            userModel.findOne({email: req.body.email, password: req.body.password}, (err, docs)=>
            {
                if (err)
                    res.send("Error occurs during login");
                else if (!docs)
                    res.send("Wrong Password");
                else
                    res.send("Successful Login");
            });
        }
    });
}

async function registration(req, res) 
{
    userModel.findOne({email: req.body.email}, (err, docs)=>
    {
        if (docs)
            res.send("This email has been already registered");
        else 
        {
            var new_user = new userModel();
            new_user.name = req.body.name;
            new_user.email = req.body.email;
            new_user.password = md5(req.body.password);
            new_user.institution = req.body.institution;
            new_user.skill = req.body.skill;
            new_user.subject = req.body.subject;
            new_user.save((err, docs)=>
            {
                if (err)
                    res.send("Error occured during databse write in registrstion");
                else
                    res.send("Successful registration");
            });
        }
    });
}

async function follow(req, res) 
{
    followerModel.findOne({user: req.body.user, follower: req.body.follower}, (err, docs)=>
    {
        if (docs)
            res.send("Already followed");
        else 
        {
            var new_follower = new followerModel();
            new_follower.user = req.body.user;
            new_follower.follower = req.body.follower;
            new_follower.save((err, docs)=>
            {
                if (err) 
                {
                    console.log(err);
                    res.send("Error occured during databse write in follower");
                }
                else
                    res.send("Successfully followed");
            });
        }
    });
}

async function unfollow(req, res)
{
    followerModel.findOneAndDelete({follower: req.body.follower, user: req.body.user}, (err)=>
    {
        if (err)
            res.send("Error during unfollowing");
        else
            res.send("Successful unfollow");
    }).exec();
}

async function getFollow(req, res)
{
    followerModel.find({follower: req.body.follower}, async(err, docs)=>
    {
        let arr = [];

        if (err)
            res.send('Error occurred during db writing');
        else
        {
            for (data of docs)
            {
                var cur = await userModel.findOne({email: data.user}).select('name email -_id').exec();
                arr.push(cur);
            }

            res.send(arr);
        }
    });
}

async function getProfile(req, res)
{
    userModel.findOne({email: req.params.email}, (err, docs)=>
    {
        if (docs)
            res.send(docs);
        else
            res.send('Error during database read in getProfile');
    });
}

async function updateProfile(req, res)
{
    req.body.oldPassword = md5(req.body.oldPassword);

    var updated_user = {
        name: req.body.name,
        email: req.body.email,
        password: md5(req.body.password),
        institution: req.body.institution,
        skill: req.body.skill,
        subject: req.body.subject
    };

    userModel.updateOne({email: req.body.email, password: req.body.oldPassword}, updated_user, (err, docs)=> 
    {
        if (docs)
            res.send("Successfully updated");
        else
            res.send("Wrong credentials");
    });
}

async function searchTag(req, res)
{
    var users = await userModel.find({skill: req.params.tag}).select('name email -_id').exec();
    res.send(users);
}

async function searchEmail(req, res)
{
    var users = await userModel.findOne({email: req.params.email}).select('name email -_id').exec();
    res.send(users);
}

async function suggestion(req, res)
{
    userModel.findOne({email: req.params.email}, (err, sk)=>
    {
        followerModel.find({follower: req.params.email}, (err, docs)=>
        {
            var followed = docs.map(function(doc){return doc.user});
            var query = {
                skill: {$in: sk.skill}, 
                email: {$ne: req.params.email, $nin: followed},
            };

            userModel.find(query, 'name email -_id', (err, docs)=>
            {
                res.send(docs);
            }).limit(parseInt(req.params.limit, 10));
        });
        
    });
}

module.exports = router;