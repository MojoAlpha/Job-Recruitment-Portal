var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

var Company = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    desc: {
        type: String
    },
    logo: {
        type: String
    },
    hq: {
        type: String
    },
    size: {
        type: Number
    },
    links: [{
        type: String
    }]
},
{timestamps: true})

module.exports = mongoose.model('Company', Company);