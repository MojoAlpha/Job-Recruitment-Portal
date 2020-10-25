var User = require('../../models/user');
var Company = require('../../models/company');
var crypto = require('crypto')
const { forgetPassMail } = require('../../config/mailTemplate');

exports.userForget = (req, res, next) => {
    
    User.findOne({ email: req.body.email }, (err, user) => {
        if(err)
            return res.status(500).json({err: err, success: false})
        
        if(!user) {
            next()
            return ;
        }

        // Assigning Random String To The Verify Token & Setting Up An Expiry Timer
        user.verifyToken = crypto.randomBytes(30).toString('hex');
        user.tokenExpiry = Date.now() + 3600000                     // Generating A Token With An Expiry Time Of 1 Hour
        user.save()
        .then((user) => {
            forgetPassMail(user.email, `${process.env.HOST}/forget/verify/U/${user.verifyToken}`)
            })
        .catch((err) => {
            return res.status(500).json({ err: err, success: false })
            })
        
        return res.status(200).json({ msg: "Mail Sent!!", success: true})
    })
}

exports.companyForget = (req, res, next) => {
    
    Company.findOne({ email: req.body.email }, (err, company) => {
        if(err)
            return res.status(500).json({err: err, success: false})
        
        if(!company)
            return res.status(404).json({ err: "Email Not Registered!!", success: false})

        company.verifyToken = crypto.randomBytes(30).toString('hex');
        company.tokenExpiry = Date.now() + 3600000
        company.save()
        .then((company) => {
            forgetPassMail(company.email, `${process.env.HOST}/forget/verify/C/${company.verifyToken}`)
        })
        .catch((err) => {
            return res.status(500).json({ err: err, success: false })
        })
        
        return res.status(200).json({ msg: "Mail Sent!!", success: true})
    })
}

exports.userPassReset = (req, res, next) => {
    
    if(req.params.type === "U") {
        User.findOne({verifyToken: req.params.token}, (err, user) => {
            if(err || !user)
                return res.status(404).json({err: "Invalid Token", success: false})
    
            if(user.tokenExpiry < Date.now()) {     // Check fot the expiry of the Verification Token
                user.verifyToken = undefined
                user.tokenExpiry = undefined
                user.save()
                return res.status(403).json({err: "Token Expired!! Resend the request", success: false})
            }
            
            // Nullifying The Temporary Values & Saving New Password
            user.verifyToken = undefined
            user.tokenExpiry = undefined
            user.encry_password =  user.securePassword(req.body.newPassword)
            user.save()
            .catch((err) => {
                return res.status(500).json({ err: err, success: false })
            })
            
            return res.status(200).json({err: "Password Reset Success!!", success: true})
        })
    }
    next()
}

exports.companyPassReset = (req, res, next) => {
    
    if(req.params.type === "C") {
        Company.findOne({verifyToken: req.params.token}, (err, company) => {
            if(err || !company)
                return res.status(404).json({err: "Invalid Token!!", success: false})
            
            // Checking If The Token Is Out Of Expiry
            if(Company.tokenExpiry < Date.now()) {
                company.verifyToken = undefined
                company.tokenExpiry = undefined
                company.save()
                return res.status(403).json({err: "Token Expired!! Resend the Request", success: false})
            }

            company.verifyToken = undefined
            company.tokenExpiry = undefined
            company.encry_password = company.securePassword(req.body.newPassword)
            company.save()
            .catch((err) => {
                return res.status(500).json({ err: err, success: false })
            })
            
            return res.status(200).json({err: "Password Reset Success!!", success: true})
        })
    }
}