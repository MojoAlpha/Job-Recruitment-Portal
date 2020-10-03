var User = require('../models/user')
const {validationResult} = require('express-validator')
var crypto = require('crypto')
var jwt = require('jsonwebtoken')
var expressJwt = require('express-jwt')
var keys = require('../config/keys');
var mailer = require('../config/nodeMailer')

// USER AUTH CONTROLLERS

exports.userSignup = (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({err: errors.array(), success: false})
    }

    User.findOne({email: req.body.email}, (err, user) => {
        if(err) {
            return res.status(500).json({err: err, success: false})
        }
        if(user) {
            return res.status(401).json({err: 'Email Already Registered!!', success: false})
        }

        var newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            dp: 'dp/default.png',
            verifyToken: crypto.randomBytes(30).toString('hex')
        })
    
        newUser.save((err, user) => {
            if(err) {
                return res.status(500).json({err: err, success: false})
            }

            var mailOptions = {
                to: user.email,
                from: keys.EMAIL_ADDR,
                subject: "Google Account Verification",
                text:
                    "Hello " + user.name.split(' ')[0] + " !!" +
                    "\nTo proceed with the registration process, please click on the link below to verify your google account!!\n" +
                    "Link : " + `http://localhost:8000/auth/verify/${user.verifyToken}` 
            }
    
            mailer.sendMail(mailOptions, (err) => {
                if(err) {
                    return res.status(500).json({err: err, success: false})
                }
    
                console.log("Confirmation Email Sent!!")
            })
        })

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json({success: true, msg: "Successfully Registered!!"})
    })
}

exports.userVerfication = (req, res) => {
    User.findOne({verifyToken: req.params.token}, (err, user) => {
        if(err || !user) {
            return res.status(404).json({err: "Invalid Token!!", success: false})
        }

        user.isVerified = true
        user.verifyToken = undefined
        user.save((err, user) => {
            if(err) {
                return res.status(500).json({err: err, success: false})
            }
            
            var mailOptions = {
                to: user.email,
                from: keys.EMAIL_ADDR,
                subject: "Welcome To DevHub",
                text:
                "Welcome " + user.name.split(' ')[0] + "!!\n" +
                "We whole heartedly welcome you to the DevHub family. I hope you will make great connections through us and find your dream job!!\n" + 
                "We kindly request you to like our Facebook page & follow us on instagram\n" +
                "DevHub is a platform for professionals, to aid in your professional reach to people\n" +
                "Wishing you a great day!!"
            }
    
            mailer.sendMail(mailOptions, (err) => {
                if(err) {
                    return res.status(500).json({err: err, success: false})
                }
    
                console.log("Welcome Email Sent!!")
            })
        })

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json({msg: "Verification Successfull!!", success: true})
    })
}

exports.userForgetVerify = (req, res) => {
    if(req.body.email === undefined) {
        return res.status(403).json({err: "Email isn't Provided!!", success: false})
    }

    User.findOne({ email: req.body.email }, (err, user) => {
        if(err || !user) {
            return res.status(404).json({err: "Email not registered", success: false})
        }

        user.verifyToken = crypto.randomBytes(30).toString('hex');
        user.tokenExpiry = Date.now() + 3600000                     // verify token expires after 1 hour
        user.save((err, user) => {
            if(err) {
                return res.status(500).json({err: err, success: false})
            }

            var mailOptions = {
                to: user.email,
                from: keys.EMAIL_ADDR,
                subject: "Password Reset Confirmation",
                text:
                    "This email has been sent in response to the request made to your account to reset your password!!\n" +
                    "If it was you click on the link below, otherwise it will expire in next 15 minutes\n" + "Link : " +
                    `http://localhost:8000/forget/verify/${user.verifyToken}`
            }
    
            mailer.sendMail(mailOptions, (err) => {
                if(err) {
                    return res.status(500).json({err: err, success: false})
                }
    
                console.log("Password Reset Mail Sent!!")
            })
        })

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json({msg: "Mail Sent!!", success: true})
    })
}

exports.userForgetReset = (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({err: errors.array(), success: false})
    }

    User.findOne({verifyToken: req.params.token}, (err, user) => {
        if(err || !user) {
            return res.status(400).json({err: "Invalid Token", success: false})
        }

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
            if(err) {
                return res.status(500).json({err: err, success: false})
            }

            var authToken = jwt.sign({_id: user._id, type: "U"}, keys.authKey, {expiresIn: 604800})
            res.status(200).json({success: true, msg: "Password Updated!!", token: authToken})
        })
    })
}


// Custom Middlewares

// Decoding jwt Token & Storing it in req.auth
exports.isSignedIn = expressJwt({
    secret: keys.authKey,
    algorithms: ['HS256'],
    userProperty: "auth"
})

// Checking for the user in DB & Storing it in req.root
exports.isVerified = (req, res, next) => {
    User.findById(req.auth._id, (err, user) => {
        if(err || !user) {
            return res.status(403).json({
                err: "Not Authenticated!!"
            })
        }
        else if(user.isVerified === false) {
            return res.status(403).json({
                err: "Not Verified!!"
            })
        }
        req.root = user
        next()
    })
}