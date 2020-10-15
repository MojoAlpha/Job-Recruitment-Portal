const User = require("../../models/user")
var fs = require('fs')

exports.detailUpdate = (req, res) => {

    User.findById(req.root._id, (err, user) => {
        if(err)
            return res.status(500).json({err: err, success: false})
        
        if(req.body.phone !== undefined)
            user.phone = req.body.phone
        if(req.body.bio !== undefined)
            user.bio = req.body.bio
        if(req.body.addr !== undefined)
            user.addr = req.body.addr
        if(req.body.name !== undefined)
            user.name = req.body.name
        
        user.save()
        .catch((err) => {
            return res.status(500).json({err: err, success: false})
        })

        return res.status(200).json({msg: "Details Updated", success: true})
    })
}

exports.passwdUpdate = (req, res) => {
    User.findById(req.root._id, (err, user) => {

        if(!user.authenticate(req.body.currPassword))   // Checking Validity Of User, via Current Password Match!!
            return res.status(401).json({err: "Current Password Doesn't Match!!", success: false})
        
        user.encry_password =  user.securePassword(req.body.newPassword)
        user.save()
        .catch((err) => {
            return res.status(500).json({err: err, success: false})
        })

        return res.status(200).json({msg: "Password Updated!", success: true})
    })
}

exports.dpUpdate = (req, res) => {

    if(req.file === undefined)
        return res.status(400).json({err: "Select A Profile Picture!!", success: false})

    User.findById(req.root._id, (err, user) => {

        if(user.dp !== 'dp/default.png')
            fs.unlinkSync(`./public/${user.dp}`)
        
        var dpPath = req.file.path
        user.dp = dpPath.slice(dpPath.indexOf('/') + 1)
        user.save()
        .catch((err) => {
            return res.status(500).json({err: err, success: false})
        })

        return res.status(200).json({msg: "Display Picture Updated!", success: true})
    })
}