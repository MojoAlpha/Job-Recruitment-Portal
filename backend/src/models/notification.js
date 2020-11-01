var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Notification = new Schema({
    reciever: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    code: {
        type: Number
    },
    link: {
        type: String
    },
    // For The Unread Notification Count
    isRead: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

module.exports = mongoose.model('Notification', Notification);