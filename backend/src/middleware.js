require('dotenv').config();
var expressJwt = require('express-jwt')
var User = require('./models/user')
var Company = require('./models/company')

exports.isSignedIn = expressJwt({
    secret: process.env.AUTH_KEY,
    algorithms: ['HS256'],
    userProperty: "auth"
})

exports.isVerified = (req, res, next) => {
    User.findById(req.auth._id, (err, user) => {
        Company.findById(req.auth._id, (err, company) => {
            
            if(!user && !company)
                return res.status(401).json({err: "Not Registered!!", success: false})
            
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

            if(company) {
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
        })
    })
}

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