var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Chat = new Schema({
    reciever: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    msg: {
        type: String
    },
    isRead: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

module.exports = mongoose.model('Chat', Chat);