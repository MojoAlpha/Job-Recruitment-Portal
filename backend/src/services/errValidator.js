const { validationResult } = require('express-validator');
var User = require('../models/user');
var Company = require('../models/company');

// Error Handler For Handling Checks On Fields From Express Validator
exports.errHandler = (req, res, next) => {
    
    const errors = validationResult(req)

    if(!errors.isEmpty())
    {
        return res.status(400).json({
            err: errors.array()[0].msg,     
            location: errors.array()[0].param,  // returning the location of the error
            success: false
        })
    }

    next();
}

// returns error, if the email already exists (For User/Company Registration)
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

// returns error, if the email doesn't exists (For User/Company Login) 
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