const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const followerModel = mongoose.model("follower");
const paperModel = mongoose.model("paper");
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/paper/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({storage: storage});

router.get('/get/newest/:follower/:limit/:page', getNewestPaper);
router.post('/submit', upload.single('file'), submitPaper);
router.get('/get/:author', getPaper);
router.post('/delete', deletePaper);

async function getNewestPaper(req, res)
{
    followerModel.find({follower: req.params.follower}, (err, docs)=>
    {   
        var users = docs.map(function(doc){return doc.user});
        var options = {
            page: parseInt(req.params.page, 10), 
            limit: parseInt(req.params.limit, 10), 
            sort: {'timestamp': -1}
        };

        paperModel.paginate({author: {$in: users}}, options, (err, docs)=>
        {
            if (err)
                res.send("Error during fetching paper in newest paper");

            res.send(docs);
        });
    });
}

async function submitPaper(req, res)
{
    paperModel.findOne({title: req.body.title, author: req.body.author}, (err, docs)=>
    {
        if (docs)
            res.send("This paper has been already existed");
        else 
        {
            var new_paper = new paperModel();
            new_paper.title = req.body.title;
            new_paper.abstract = req.body.abstract;
            new_paper.author = req.body.author;
            new_paper.tag = JSON.parse(req.body.tag);
            new_paper.url = '/paper/' + req.body.title + '.pdf';
            new_paper.save((err, docs)=>
            {
                if (err) 
                    res.send("Error occured during databse write in paper uploading");
                else
                    res.send("Successful paper upload");
            });
        }
    });
}

async function getPaper(req, res)
{
    paperModel.find({author: req.params.author}, (err, docs)=>
    {
        if (err)
            res.send("Error in fetching from db in getPaper");
        else 
            res.send(docs);
    });
}

async function deletePaper(req, res)
{
    paperModel.deleteOne({title: req.body.title, author: req.body.author}, (err)=>
    {
        if (err)
            res.send("Error during deleting a paper");
        else
            res.send("Successful deletion of paper");
    });
}

module.exports = router;