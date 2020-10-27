var mongoose = require('mongoose');
var jwt = require('jsonwebtoken')

exports.adminLogin = (req, res) => {
    
    const dbo = mongoose.connection
    dbo.collection("admin").findOne({username: req.body.username})
    .then((admin) => {
        console.log(admin)
    }, (err) =>  console.log(err))

    dbo.collection("admin").findOne({username: req.body.username}, (err, admin) => {

        console.log(req.body)
        console.log(err)
        console.log(admin)
        if(err || !admin)
            return res.status(404).json({err: "Admin User Does Not Exists!", success: false})
        
        if(req.body.password !== admin.password)
            return res.status(200).json({err: "Incorrect Password", success: false})
        
        var token = jwt.sign({_id: admin._id, type: "A"}, process.env.AUTH_KEY, {expiresIn: 86400})     // In Microseconds 1 Day

        return res.status(200).json({msg: "Admin Successfully Logged In!", success: true, token: token})
    })
}