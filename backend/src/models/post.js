var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Post = new Schema({
    postImg: {
        type: String
    },
    desc: {
        type: String,
        required: true
    },
    links: [{
        type: String
    }],
    owner: {
        type: Object,
        required: true
    }
},
{timestamps: true})

module.exports = mongoose.model('Post', Post);