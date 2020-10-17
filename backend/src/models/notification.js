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
    }
})

module.exports = mongoose.model('Notification', Notification);