var User = require('../../models/user');
var Company = require('../../models/company');
var jwt = require('jsonwebtoken')

exports.UserLogin = (req, res, next) => {
    
    User.findOne({ email: req.body.email }, (err, user) => {
        
        if(err)
            return res.status(500).json({ err: err, success: false })
        
        if(!user) {
            next()
            return ;
        }
        
        if(!user.authenticate(req.body.password)) {     // Authenticate Method From User Model
            return res.status(401).json({err: "Email & Password Don't Match!!", success: false})
        }

        var token = jwt.sign({_id: user._id, type: "U"}, process.env.AUTH_KEY, {expiresIn: 604800})
        
        return res.status(200).json({msg: 'Login Success As A Developer!!', type: "U", success: true, token: token})
    })
}

exports.CompanyLogin = (req, res, next) => {

    Company.findOne({ email: req.body.email }, (err, company) => {
        
        if(err)
            return res.status(500).json({ err: err, success: false })
        
        if(!company)
            return res.status(404).json({err: "Email Not Registered!!", success: false})
        
        if(!company.authenticate(req.body.password)) {      // Authenticate Method From Comapany Model
            return res.status(401).json({err: "Emaill & Password Don't Match!!", success: false})
        }

        var token = jwt.sign({_id: company._id, type: "C"}, process.env.AUTH_KEY, {expiresIn: 604800})
        
        return res.status(200).json({msg: 'Login Success As A Company!!', type: "C", success: true, token: token})
    })
}