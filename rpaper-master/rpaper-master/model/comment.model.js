const mongoose = require('mongoose');
mongoose.pluralize(null);
const schema = mongoose.Schema;
 
var commentSchema = new mongoose.Schema(
{
    title: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    reply: [{
        type: Object,
        required: false
    }],
    timestamp: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('comment', commentSchema);