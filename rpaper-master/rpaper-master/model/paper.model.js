const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');
mongoose.pluralize(null);
const schema = mongoose.Schema;
 
var paperSchema = new mongoose.Schema(
{
    title: {
        type: String,
        required: true
    },
    abstract: {
        type: String,
        required: true
    },
    tag: [{
        type: String,
        required: true
    }],
    author: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

paperSchema.plugin(paginate);
mongoose.model('paper', paperSchema);