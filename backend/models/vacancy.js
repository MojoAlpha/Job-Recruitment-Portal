var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Vacancy = new Schema({
    owner: {
        type: Object,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    desig: {
        type: String
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
        type: Object
    }]
},
{timestamps: true})

module.exports = mongoose.model('Vacancy', Vacancy);