var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto')

var User = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    addr: {
        type: String
    },
    phone: {
        type: String
    },
    dp: {
        type: String,
        default: 'dp/default.png'
    },
    links: [{
        type: Object
    }],
    education: [{
        type: Object
    }],
    exp: [{
        type: Object
    }],
    followed: [{
        type: String
    }],
    skills: [{
        type: String
    }],
    // Pending Requests
    connRequests: [{
        type: String
    }],
    // Accepted Requests
    connections: [{
        type: String
    }],
    salt : String,
    verifyToken: {
        type: String
    },
    tokenExpiry: {
        type: Date
    },
    encry_password: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false
    }
},
{timestamps: true})
// Timestamps to store createdAt & updatedAt fields to the document

// Virtual Function to run before saving an object into Database
User.virtual("password")
    .set(function(password) {
        this._password = password
        this.salt = crypto.randomBytes(50).toString('hex');
        this.encry_password = this.securePassword(password)
    })

User.methods = {
    authenticate :function(password) {
        return this.securePassword(password) === this.encry_password
    } , 

    securePassword: function(password) {
        if(!password) return "";
        try{
            return crypto.createHmac('sha256', this.salt)
            .update(password)
            .digest('hex')
        }
        catch(err) {
            return ""
        }
    }
}

module.exports = mongoose.model('User', User);