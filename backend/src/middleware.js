require('dotenv').config();
var expressJwt = require('express-jwt')
var User = require('./models/user')
var Company = require('./models/company')

var mongoose = require('mongoose')
const db = mongoose.connection

// To Check The Validity Of Jwt Token
exports.isSignedIn = expressJwt({
    secret: process.env.AUTH_KEY,
    algorithms: ['HS256'],
    userProperty: "auth"
})

// Check For A Verified User OR Company
exports.isVerified = (req, res, next) => {
    User.findById(req.auth._id, (err, user) => {
        Company.findById(req.auth._id, (err, company) => {
            
            if(user) {
                if(user.isVerified === false)
                    return res.status(403).json({err: "Not Verified!!", success: false})
                req.root = new Object({
                    type: "U",
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    dp: user.dp
                })
                next()
            }
            else if(company) {
                if(company.isVerified === false)
                    return res.status(403).json({err: "Not Verified!!", success: false})
                req.root = new Object({
                    type: "C",
                    _id: company._id,
                    name: company.name,
                    email: company.email,
                    logo: company.logo
                })
                next()
            }
            else {
                db.collection("admin").findOne({_id: mongoose.mongo.ObjectID(req.auth._id)}, (err, admin) => {

                    if(err || !admin) 
                        return res.status(404).json({err: "User Not Registered!!", success: false})
            
                    req.root = new Object({
                        type: "A",
                        _id: admin._id,
                        usernmae: admin.username
                    })
            
                    next()
                })
            }
        })
    })
}

// Check For The Company To Be Admin Verified To Post Vacancies
exports.isCompanyVerified = (req, res, next) => {
    if(req.root.type !== "C") {
        return res.status(401).json({err: "Not Authorized!!", success: false})
    }

    Company.findById(req.root._id, (err, company) => {
        if(err) 
            return res.status(500).json({err: err, success: false})
        else if(company.adminVerified === false)
                return res.status(401).json({err: "Not Admin Verified!!", success: false})
    
        next()
    })
}

exports.isAdmin = (req, res, next) => {

    if(req.root.type !== "A")
        return res.status(401).json({err: "Not Authorised!", success: false})
    
    next()
}