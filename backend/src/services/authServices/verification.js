var User = require('../../models/user');
var Company = require('../../models/company');
var jwt = require('jsonwebtoken')
const { welcomeEmail } = require('../../config/mailTemplate');

exports.userVerification = (req, res, next) => {
    
    if(req.params.type === "U") {
        User.findOne({verifyToken: req.params.token}, (err, user) => {
            if(err)
                return res.status(404).json({err: err, success: false})
            
            if(!user)
                return res.status(404).json({ err: "Invalid Token!!", success: false})
    
            user.isVerified = true
            user.verifyToken = undefined
            user.save()
            .then((user) => {
                welcomeEmail(user.email, user.name)
            })
            .catch((err) => {
                return res.status(500).json({err: err, success: false})
            })
            
            var token = jwt.sign({_id: user._id, type: "U"}, process.env.AUTH_KEY, {expiresIn: 604800})     // AuthToken Expires After 28 Days
            return res.status(200).json({ msg: "Verification Successfull!!", success: true, token: token, type: "U"})
        })
    }

    next()
}

exports.companyVerification = (req, res, next) => {

    if(req.params.type === "C") {
        Company.findOne({verifyToken: req.params.token}, (err, company) => {
            if(err)
                return res.status(404).json({err: err, success: false})

            if(!company)
                return res.status(404).json({ err: "Invalid Token!!", success: false})
            
            company.isVerified = true
            company.verifyToken = undefined
            company.save()
            .then((company) => {
                welcomeEmail(company.email, company.name)
            })
            .catch((err) => {
                return res.status(500).json({err: err, success: false})
            })

            var token = jwt.sign({_id: company._id, type: "C"}, process.env.AUTH_KEY, {expiresIn: 604800})     // AuthToken Expires After 28 Days
            return res.status(200).json({ msg: "Verification Successfull!!", success: true, token: token, type: "C"})
        })
    }
}