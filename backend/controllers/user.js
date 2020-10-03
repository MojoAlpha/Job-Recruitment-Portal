var User = require('../models/user');
var fs = require('fs')
var {validationResult} = require('express-validator')

exports.userDetails = (req, res) => {
    return res.status(200).json({
        name: req.root.name,
        email: req.root.email,
        bio: req.root.bio,
        education: req.root.education,
        addr: req.root.addr,
        phone: req.root.phone,
        links: req.root.links,
        skills: req.root.skills,
        dp: req.root.dp,
        connectionCount: req.root.connections.length
    })
}

exports.chngProfilePicture = (req, res) => {
    User.findById(req.root._id, (err, user) => {
        if(err || !user) {
            return res.status(404).json({err: err, success: false})
        }

        if(user.dp !== 'dp/default.png') {
            fs.unlinkSync(`./public/${user.dp}`)
        }
        
        var dpPath = req.file.path
        user.dp = dpPath.slice(dpPath.indexOf('/') + 1)
        user.save((err, user) => {
            if(err) {
                return res.status(400).json({err: err, success: false})
            }
        })

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json({msg: "Profile Picture Updated!!", success: true})
    })
}

exports.chngPassword = (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({err: errors.array(), success: false})
    }
    User.findById(req.root._id, (err, user) => {
        if(err || !user) {
            return res.status(404).json({err: err, success: false})
        }

        if(!user.authenticate(req.body.currPassword)) {
            return res.status(401).json({err: "Current Password Doesn't Match!!", success: false})
        }

        if(req.body.currPassword === req.body.newPassword) {
            return res.status(400).json({err: "Passwords Shouldn't Match", success: false})
        }

        user.encry_password =  user.securePassword(req.body.newPassword)
        user.save((err, user) => {
            if(err) {
                return res.status(400).json({err: err, success: false})
            }
        })

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json({msg: "Password Updated", success: true})
    })
}

exports.updateDetails = (req, res) => {
    User.findById(req.root._id, (err, user) => {
        if(err || !user) {
            return res.status(404).json({err: err, success: false})
        }
        // Check for missing details from Request
        if(req.body.phone !== undefined)
            user.phone = req.body.phone
        if(req.body.bio !== undefined)
            user.bio = req.body.bio
        if(req.body.addr !== undefined)
            user.addr = req.body.addr
        if(req.body.name !== undefined)
            user.name = req.body.name

        user.save((err, user) => {
            if(err) {
                return res.status(400).json({err: err, success: false})
            }
        })

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json({msg: "Details Updated", success: true})
    })
}

exports.addLink = (req, res) => {
    if(req.body.link === undefined) {
        return res.status(400).json({err: "Link Not Found", success: false})
    }

    User.findById(req.root._id, (err, user) => {
        if(err || !user) {
            return res.status(404).json({err: err, success: false})
        }

        user.links.push(req.body.link)
        user.save((err, user) => {
            if(err) {
                return res.status(400).json({err: err, success: false})
            }
        })

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json({msg: "Link Added", success: true})
    })
}

exports.deleteLink = (req, res) => {
    //
}