const mongoose = require('mongoose');
mongoose.pluralize(null);
const schema = mongoose.Schema;
 
var followerSchema = new mongoose.Schema(
{
    user: {
        type: String,
        required: true
    },
    follower: {
        type: String,
        required: true
    }
});

mongoose.model('follower', followerSchema);