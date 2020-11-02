require('dotenv').config()
var User = require('../../models/user');
var Company = require('../../models/company');
var { emailVerification } = require('../../config/mailTemplate')
var crypto = require('crypto')

exports.UserSignup = (req, res, next) => {

    if(req.body.type === "U") {
        User.findOne({ email: req.body.email }, (err, user) => {

            if(err)
                return res.status(500).json({ err: err, success: false})

            var newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                verifyToken: crypto.randomBytes(30).toString('hex')     // Generating Random String For Verification Token
            })

            // Sending Verification Mail After Successful Save Of The User
            newUser.save()
            .then((user) => {
                emailVerification(user.email, user.name, `http://localhost:3000/auth/verify/U/${user.verifyToken}`)
            })
            .catch((err) => {
                return res.status(500).json({ err: err, success: false })
            })
            
            return res.status(200).json({
                msg: "SignUp Successful As A Developer!! Please Verify Your Email!!",
                success: true
            })
        })
    }

    next();
}

exports.CompanySignup = (req, res, next) => {

    if(req.body.type === "C") {
        Company.findOne({ email: req.body.email }, (err, company) => {

            if(err)
                return res.status(500).json({ err: err, success: false})
            
            var newCompany = new Company({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                verifyToken: crypto.randomBytes(30).toString('hex')     // Generating Random String For Verification Token
            })

            newCompany.save()
            .then((company) => {
                emailVerification(company.email, company.name, `http://localhost:3000/auth/verify/C/${company.verifyToken}`)
            })
            .catch((err) => {
                return res.status(500).json({ err: err, success: false })
            })
            
            return res.status(200).json({
                msg: "SignUp Successful As A Company!! Please Verify Your Email!!",
                success: true
            })
        })
    }
}