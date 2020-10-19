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
    msg: {
        type: String
    },
    link: {
        type: String
    },
    isRead: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Notification', Notification);