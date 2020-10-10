var User = require('../models/user')
var Company = require('../models/company')
const {validationResult} = require('express-validator')
var crypto = require('crypto')
var jwt = require('jsonwebtoken')
var keys = require('../config/keys');
var {emailVerification, welcomeEmail, forgetPassMail} = require('../config/mailTemplate')

//SIGNUP CONTROLLER
exports.Signup = (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty())       // Checking Any Errors From Express-Validator
        return res.status(400).json({err: errors.array()[0].msg, success: false})
    
    User.findOne({ email: req.body.email }, (err, user) => {        // Checking For The Email ID In Both Collections
        Company.findOne({ email: req.body.email }, (err, company) => {            
            if(err)
                return res.status(500).json({ err: err, success: false})
            
            if(user || company)
                return res.status(403).json({ err: "Email Already Registered!!", success: false})
            
            if(req.body.type === "U") {
                var newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    verifyToken: crypto.randomBytes(30).toString('hex')     // Generating Random String For Verify Token
                })

                newUser.save((err, user) => {       // Saving A New User As A Developer
                    if(err)
                        return res.status(500).json({err: err, success: false})
                    
                    emailVerification(user.email, user.name, `http://localhost:8000/auth/verify/U/${user.verifyToken}`)     // Sending Verify Token Via Email
                    res.statusCode = 200
                    res.setHeader('Content-Type', 'application/json')
                    res.json({success: true, msg: "User Successfully Registered!!"})
                })
            }
            else if(req.body.type === "C") {        // Saving A New User As A Company
                var newCompany = new Company({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    verifyToken: crypto.randomBytes(30).toString('hex')
                })

                newCompany.save((err, company) => {
                    if(err)
                        return res.status(500).json({err: err, success: false})
                    
                    emailVerification(company.email, company.name, `http://localhost:8000/auth/verify/C/${company.verifyToken}`)
                    res.statusCode = 200
                    res.setHeader('Content-Type', 'application/json')
                    res.json({success: true, msg: "Company Successfully Registered!!"})
                })
            }
            else    
            return res.status(403).json({err: "Invalid Signup!!", success: false}) 
        })
    })
}

exports.Verfication = (req, res) => {
    if(req.params.type === "U") {
        User.findOne({verifyToken: req.params.token}, (err, user) => {
            if(err || !user)
                return res.status(404).json({err: "Invalid Token!!", success: false})
    
            user.isVerified = true
            user.verifyToken = undefined
            user.save((err, user) => {
                if(err)
                    return res.status(500).json({err: err, success: false})
                
                welcomeEmail(user.email, user.name)     // Sending Welcome Email 
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')       // AuthToken Expires After 28 Days
                res.json({ msg: "Verification Successfull!!", success: true, token: jwt.sign({_id: user._id, type: "U"}, keys.authKey, {expiresIn: 604800}) })
            })
        })
    } 
    else if(req.params.type === "C") {
        Company.findOne({verifyToken: req.params.token}, (err, company) => {
            if(err || !company)
                return res.status(404).json({err: "Invalid Token!!", success: false})
            
            company.isVerified = true
            company.verifyToken = undefined
            company.save((err, company) => {
                if(err)
                    return res.status(500).json({err: err, success: false})
                
                welcomeEmail(company.email, company.name)
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json({msg: "Verification Successfull!!", success: true, token: jwt.sign({_id: company._id, type: "C"}, keys.authKey, {expiresIn: 604800}) })
            })
        })
    } else
        return res.status(400).json({err: "Invalid Request!!", success: false})
}

exports.Login = (req, res) => {
    if(req.body.email === undefined || req.body.password === undefined)
        return res.status(400).json({ err: "Please Fill All The Fields!!", success: false})
    
    User.findOne({ email: req.body.email }, (err, user) => {        // Checking Both Collections For Existing Users OR Companies
        Company.findOne({ email: req.body.email }, (err, company) => {
            if(err)
                return res.status(500).json({ err: err, success: false })
            
            if(user) {
                if(!user.authenticate(req.body.password)) {     // Authenticate Method From User Model
                    return res.status(401).json({err: "Email & Password Don't Match!!", success: false})
                }

                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json({msg: 'Login Success As A Developer!!', success: true, token: jwt.sign({_id: user._id, type: "U"}, keys.authKey, {expiresIn: 604800})})
            }
            else if(company) {
                if(!company.authenticate(req.body.password)) {      // Authenticate Method From Comapany Model
                    return res.status(401).json({err: "Emaill & Password Don't Match!!", success: false})
                }

                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json({msg: 'Login Success As A Company!!', success: true, token: jwt.sign({_id: company._id, type: "C"}, keys.authKey, {expiresIn: 604800})})
            }
        })
    })
}

exports.ForgetVerify = (req, res) => {

    if(req.body.email === undefined) {
        return res.status(403).json({err: "Email isn't Provided!!", success: false})
    }

    User.findOne({ email: req.body.email }, (err, user) => {
        Company.findOne({ email: req.body.email }, (err, company) => {
            if(err)
                return res.status(500).json({ err: err, success: false })
            
            if(user) {
                user.verifyToken = crypto.randomBytes(30).toString('hex');
                user.tokenExpiry = Date.now() + 3600000                     // Generating A Token With An Expiry Time Of 1 Hour
                user.save((err, user) => {
                    if(err)
                        return res.status(500).json({err: err, success: false})

                    forgetPassMail(user.email, `http://localhost:8000/auth/forget/U/${user.verifyToken}`)
                    res.statusCode = 200
                    res.setHeader('Content-Type', 'application/json')
                    res.json({msg: "Mail Sent!!", success: true})
                })
            }
            else if(company) {
                company.verifyToken = crypto.randomBytes(30).toString('hex');
                company.tokenExpiry = Date.now() + 3600000
                company.save((err, company) => {
                    if(err)
                        return res.status(500).json({err: err, success: false})
                    
                    forgetPassMail(company.email, `http://localhost:8000/auth/forget/C/${company.verifyToken}`)
                    res.statusCode = 200
                    res.setHeader('Content-Type', 'application/json')
                    res.json({msg: "Mail Sent!!", success: true})
                })
            }
            else
                return res.status(404).json({ err: "Email Isn't Registered!!", success: false })
        })
    })
}

exports.ForgetReset = (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({err: errors.array()[0].msg, success: false})
    }

    if(req.params.type === "U") {
        User.findOne({verifyToken: req.params.token}, (err, user) => {
            if(err || !user)
                return res.status(404).json({err: "Invalid Token", success: false})
    
            if(user.tokenExpiry < Date.now()) {
                user.verifyToken = undefined
                user.tokenExpiry = undefined
                user.save()
                return res.status(403).json({err: "Token Expired!! Resend the request", success: false})
            }
    
            user.verifyToken = undefined
            user.tokenExpiry = undefined
            user.encry_password =  user.securePassword(req.body.newPassword)
            user.save((err, user) => {
                if(err)
                    return res.status(500).json({err: err, success: false})
            })

            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.json({msg: "Password Reset Complete!!", success: true})
        })
    }
    else if(req.params.type === "C") {
        Company.findOne({verifyToken: req.params.token}, (err, company) => {
            if(err || !company)
                return res.status(404).json({err: "Invalid Token!!", success: false})
            
            if(Company.tokenExpiry < Date.now()) {
                company.verifyToken = undefined
                company.tokenExpiry = undefined
                company.save()
                return res.status(403).json({err: "Token Expired!! Resend the Request", success: false})
            }

            company.verifyToken = undefined
            company.tokenExpiry = undefined
            company.encry_password = company.securePassword(req.body.newPassword)
            company.save((err, company) => {
                if(err)
                    return res.status(500).json({err: err, success: false})
            })

            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.json({msg: "Password Reset Complete!!", success: true})
        })
    }
    else
        return res.status(400).json({err: "Invalid Request!!", success: false})
}

exports.resendVerify = (req, res) => {      // Resending The Verification Mail
    if(req.body.email === undefined)
        return res.status(400).json({ err: "Email Not Specified!!", success: false})
    User.findOne({ email: req.body.email }, (err, user) => {
        Company.findOne({ email: req.body.email }, (err, company) => {
            if(err)
                return res.status(500).json({err: err, success: false})
            
            if(user)
                emailVerification(user.email, user.name, `http://localhost:8000/auth/verify/U/${user.verifyToken}`)
            else if(company)
                emailVerification(company.email, company.name, `http://localhost:8000/auth/verify/C/${company.verifyToken}`)
            else
                return res.status(404).json({ err: "Email Not Registered!!", success: false})
            
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.json({success: true, msg: "Email Resend Complete!!"})
        })
    })
}