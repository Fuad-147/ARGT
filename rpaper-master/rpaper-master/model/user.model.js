const mongoose = require('mongoose');
mongoose.pluralize(null);
const schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
 
var userSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    institution: {
        type: String,
        required: true
    },
    skill: [{
        type: String,
        required: true
    }],
    subject: {
        type: String,
        requied: true
    }
});

mongoose.model('user', userSchema);