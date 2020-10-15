var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Skill = new Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Skill', Skill);