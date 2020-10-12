var User = require('../models/user');
var Skill = require('../models/skill')
var fs = require('fs')
var {validationResult} = require('express-validator');
const mongoose = require('mongoose');

// USER DETAIL CONTROLLER
exports.userDetails = (req, res) => {
    User.findById(req.root._id, (err, user) => {
        if(err || !user)
            return res.status(404).json({err: "Not Availble!!"})
        
        var skill_ids = user.skills.map((id) => { return mongoose.mongo.ObjectId(id) })

        // Aggregating the objects from skills collection to currecnt object
        Skill.find({ _id: { $in: skill_ids }}, (err, skills) => {

            return res.status(200).json({   // Passing Public Inforamation
                name: user.name,
                email: user.email,
                bio: user.bio,
                education: user.education,
                addr: user.addr,
                phone: user.phone,
                links: user.links,
                dp: user.dp,
                skills: skills,
                connectionCount: user.connections.length
            })
        })
    })
}

// PROFILE PICTURE CHANGE CONTROLLER
exports.chngProfilePicture = (req, res) => {
    User.findById(req.root._id, (err, user) => {
        if(err || !user)
            return res.status(404).json({err: err, success: false})
        
        // To Delete Your Profile Picture, If it is Changed
        if(user.dp !== 'dp/default.png')
            fs.unlinkSync(`./public/${user.dp}`)
        
        var dpPath = req.file.path
        user.dp = dpPath.slice(dpPath.indexOf('/') + 1)
        user.save((err, user) => {
            if(err)
                return res.status(400).json({err: err, success: false})
        })

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json({msg: "Profile Picture Updated!!", success: true})
    })
}

// CHANGING PASSWORD CONTROLLER
exports.chngPassword = (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty())
        return res.status(400).json({err: errors.array(), success: false})

    User.findById(req.root._id, (err, user) => {
        if(err || !user)
            return res.status(404).json({err: err, success: false})

        if(!user.authenticate(req.body.currPassword))   // Checking Validity Of User, via Current Password Match!!
            return res.status(401).json({err: "Current Password Doesn't Match!!", success: false})

        if(req.body.currPassword === req.body.newPassword)
            return res.status(400).json({err: "Passwords Shouldn't Match", success: false})

        user.encry_password =  user.securePassword(req.body.newPassword)
        user.save((err, user) => {
            if(err)
                return res.status(400).json({err: err, success: false})
        })

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json({msg: "Password Updated", success: true})
    })
}

// BASIC DETAILS UPDATE CONTROLLER
exports.updateDetails = (req, res) => {
    User.findById(req.root._id, (err, user) => {
        if(err || !user)
            return res.status(404).json({err: err, success: false})

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
            if(err)
                return res.status(400).json({err: err, success: false})
        })

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json({msg: "Details Updated", success: true})
    })
}

// ADD LINK TO USER DOCUMENT CONTROLLER
exports.addLink = (req, res) => {
    if(req.body.link.title === undefined || req.body.link.link === undefined)
        return res.status(400).json({err: "Link Not Found", success: false})

    User.findById(req.root._id, (err, user) => {
        if(err || !user)
            return res.status(404).json({err: err, success: false})

        user.links.push(req.body.link)
        user.save((err, user) => {
            if(err)
                return res.status(400).json({err: err, success: false})
        })

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json({msg: "Link Added", success: true})
    })
}

// REMOVE LINK FROM USER DOCUMENT CONTROLLER
exports.removeLink = (req, res) => {
    if(req.body.link === undefined || req.body.link.link === undefined)
        return res.status(400).json({err: "Link Not Found", success: false})

    User.findById(req.root._id, (err, user) => {
        if(err || !user)
            return res.status(404).json({err: err, success: false})

        for(let i = 0; i < user.links.length; ++i) {        
            if(user.links[i].title === req.body.link.title && user.links[i].link === req.body.link.link) {
                user.links.splice(i, 1);
                break;
            }
        }

        user.save((err, user) => {
            if(err)
                return res.status(400).json({err: err, success: false})
        })

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json({msg: "Link Removed", success: true})
    })
}

// ADD SKILL CONTROLLER
exports.addSkill = (req, res) => {
    if(req.body.skillId === undefined)
        return res.status(400).json({err: "Skill not specified!!"})

    User.findById(req.root._id, (error, user) => {
        if(error || !user)
            return res.status(404).json({err: "User Not Found!!", success: false})

        Skill.findById(req.body.skillId, (err, skill) => {
            if(err || !skill)
                return res.status(404).json({err: "Skill Not Found!!", success: false})

            if(user.skills.indexOf(req.body.skillId) > -1)      // Check if skill exists or not
                return res.status(403).json({err: "Skill Already Exists", success: false})

            user.skills.push(req.body.skillId)      // Storing Skill ID as a String
            user.save((err, user) => {
                if(err)
                    return res.status(500).json({err: "Internal Error", success: false})
            })

            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.json({msg: "Skill Added", success: true})
        })
    })
}

// REMOVE SKILL CONTROLLER
exports.removeSKill = (req, res) => {
    if(req.body.skillId === undefined)
        return res.status(400).json({err: "Skill not specified!!"})

    User.findById(req.root._id, (error, user) => {
        if(error || !user)
            return res.status(404).json({err: "User Not Found!!", success: false})

        let elemIndex = user.skills.indexOf(req.body.skillId)
        if(elemIndex < 0)
            return res.status(404).json({err: "You Don't have this skill!!", success: false})

        user.skills.splice(elemIndex, 1)
        user.save((err, user) => {
            if(err)
                return res.status(500).json({err: "Internal Error!!"})
        })

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json({msg: "Skill Removed", success: true})
    })
}

// ADD EDUCATION DETAILS CONTROLLER
exports.addEducation = (req, res) => {
    if(req.body.edu.degree === undefined || req.body.edu.insti === undefined || req.body.edu.year === undefined)
        return res.status(400).json({err: "Education Details Not Found", success: false})
    
    User.findById(req.root._id, (err, user) => {
        if(err || !user)
            return res.status(404).json({err: err, success: false})

        user.education.push(req.body.edu)       // Directly pushing the education object into the document
        user.save((err, user) => {
            if(err)
                return res.status(400).json({err: err, success: false})
        })

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json({msg: "Education Details Added", success: true})
    })
}

// REMOVE EDUCATION DETAILS CONTROLLER
exports.removeEducation = (req, res) => {
    if(req.body.edu.degree === undefined || req.body.edu.insti === undefined || req.body.edu.year === undefined)
        return res.status(400).json({err: "Education Details Not Found", success: false})
    
    User.findById(req.root._id, (err, user) => {
        if(err || !user)
            return res.status(404).json({err: err, success: false})

        for(let i = 0; i < user.education.length; ++i) {
            if(user.education[i].degree === req.body.edu.degree && user.education[i].insti === req.body.edu.insti && user.education[i].year === req.body.edu.year) {
                user.education.splice(i, 1);
                break;
            }
        }

        user.save((err, user) => {
            if(err)
                return res.status(400).json({err: err, success: false})
        })

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json({msg: "Education Detail Removed", success: true})
    })
}