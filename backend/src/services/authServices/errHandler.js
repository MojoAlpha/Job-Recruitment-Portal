const { validationResult } = require('express-validator');
var User = require('../../models/user');
var Company = require('../../models/company');

exports.authErrors = (req, res, next) => {
    
    const errors = validationResult(req)

    if(!errors.isEmpty())
    {
        return res.status(400).json({
            err: errors.array()[0].msg,
            location: errors.array()[0].param, 
            success: false
        })
    }

    next();
}

exports.emailExists = (req, res, next) => {
    
    User.findOne({ email: req.body.email }, (err, user) => {
        Company.findOne({ email: req.body.email }, (err, company) => {
            
            if(!user && !company)
                next()
            else
                return res.status(403).json({err: "Email Already Exists!!", success: false})
        })
    })
}

exports.emailNotExists = (req, res, next) => {
    
    User.findOne({ email: req.body.email }, (err, user) => {
        Company.findOne({ email: req.body.email }, (err, company) => {
            
            if(!user && !company)
                return res.status(403).json({err: "Email Is Not Registered!!", success: false})
            else
                next()
        })
    })
}