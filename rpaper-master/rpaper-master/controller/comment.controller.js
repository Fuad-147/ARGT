const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const commentModel = mongoose.model("comment");

router.post('/add', addComment);
router.post('/reply', replyComment);
router.get('/get/:title', getComment);

async function addComment(req, res)
{
    var new_comment = new commentModel();
    new_comment.title = req.body.title;
    new_comment.comment = req.body.comment;
    new_comment.email = req.body.email;

    new_comment.save((err, docs)=>
    {
        if (err)
            res.send("Error during comment write in db");
        else
            res.send(new_comment);
    });
}

async function replyComment(req, res)
{
    var new_reply = new Object();
    new_reply.email = req.body.email;
    new_reply.reply = req.body.reply;

    var added_reply = await commentModel.findOne({_id: req.body._id}).exec();
    added_reply.reply.push(new_reply);

    commentModel.updateOne({_id: req.body._id}, added_reply, (err, docs)=>
    {
        if (err)
            res.send("Error during reply adding");
        else if (!docs)
            res.send("No comment found");
        else
            res.send("Succesful reply");
    });
}

async function getComment(req, res)
{
    commentModel.find({title: req.params.title}, (err, docs)=>
    {
        if (err)
            res.send("Error during fetching comment");
        else
            res.send(docs);
    }).sort([['timestamp', -1]]);
}

module.exports = router;