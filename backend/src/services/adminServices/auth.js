var mongoose = require('mongoose');
var jwt = require('jsonwebtoken')
const db = mongoose.connection

exports.adminLogin = (req, res) => {
    
    db.collection("admin").findOne({username: req.body.username}, (err, admin) => {

        if(err || !admin)
            return res.status.json({err: "Admin User Does Not Exists!", success: false})
        
        if(req.body.password !== admin.password)
            return res.status(200).json({err: "Incorrect Password", success: false})
        
        var token = jwt.sign({_id: admin._id, type: "A"}, process.env.AUTH_KEY, {expiresIn: 86400})     // In Microseconds 1 Day

        res.status(200).json({msg: "Admin Successfully Logged In!", success: true, token: token})
    })
}