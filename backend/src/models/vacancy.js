var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Vacancy = new Schema({
    owner: {
        type: String,
        required: true
    },
    location: {
        type: String
    },
    salary: {
        type: String
    },
    desig: {
        type: String,
        required: true
    },
    desc: {
        type: String
    },
    isOpen: {
        type: Boolean,
        default: true
    },
    requiredSkill: [{
        type: String
    }],
    applicants: [{
        type: String
    }],
    accepted: [{
        type: String
    }]
},
{timestamps: true})

module.exports = mongoose.model('Vacancy', Vacancy);