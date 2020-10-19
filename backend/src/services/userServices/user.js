var User = require('../../models/user')
var Skill = require('../../models/skill')
var Company = require('../../models/company')
var Notification = require('../../models/notification')
var mongoose = require('mongoose')

exports.userDetails = (req, res) => {
    
    User.findById(req.params.userId, (err, user) => {
        Notification.find({ reciever: req.params.userId, isRead: false }).count()
        .then((unreadCount) => {
            
            if(!user)
            return res.status(404).json({err: "User Not Found!", success: false})
        
        var skill_ids = user.skills.map((id) => {return mongoose.mongo.ObjectID(id)})

        Skill.find({ _id: { $in: skill_ids }})
        .then((skills) => {
            return res.status(200).json({
                type: "U",
                name: user.name,
                email: user.email,
                bio: user.bio,
                addr: user.addr,
                phone: user.phone,
                education: user.education,
                links: user.links,
                dp: user.dp,
                skills: skills,
                unreadNotification: unreadCount,
                connectionCount: user.connections.length
            })
        })
        })
    })
}

exports.extraUserDetails = (req, res) => {
    
    User.findById(req.params.userId, (err, user) => {
        if(err)
            return res.status(500).json({err: err, success: false})
        
        var connect_ids = user.connections.map((id) => {return mongoose.mongo.ObjectID(id)})
        var followd_ids = user.followed.map((id) => {return mongoose.mongo.ObjectID(id)})

        User.find({ _id: { $in: connect_ids }}, {_id: 1, name: 1, dp: 1, bio: 1})
        .then((userList) => {
            Company.find({ _id: { $in: followd_ids }}, {_id: 1, name: 1, logo: 1, desc: 1})
            .then((companyList) => {

                return res.status(200).json({
                    connections: userList,
                    followed: companyList
                })
            })
        })
        
    })
}

exports.getNotifications = (req, res) => {

    Notification.find({ reciever: req.root._id })
    .sort({createdAt: -1})
    .then((notifications) => {
        res.status(200).json({notifications: notifications, success: true})
    }, (err) => res.status(500).json({
        err: err,
        success: false
    }))
}

exports.userConnect = (req, res) => {
    
    User.findById(req.root._id, (err, user1) => {
        User.findById(req.params.userId, (err, user2) => {
            
            if(!user2)
                return res.status(404).json({err: "User Not Found!", success: false})
            
            if(user1.connections.indexOf(user2._id.toString()) >= 0)
                return res.status(403).json({err: "Already A Connection!!", success: false})
            
            user1.connections.push(user2._id)
            user2.connections.push(user1._id)
            user1.save()
            .catch((err) => {
                return res.status(500).json({err: err, success: false})
            })
            user2.save()
            .catch((err) => {
                return res.status(500).json({err: err, success: false})
            })

            return res.status(200).json({msg: "User Connected!", success: true})
        })
    })
}

exports.userDisconnect = (req, res) => {

    User.findById(req.root._id, (err, user1) => {
        User.findById(req.params.userId, (err, user2) => {
            
            if(!user2)
            return res.status(404).json({err: "User Not Found!", success: false})
            
            let userInd1 = user1.connections.indexOf(user2._id.toString())
            let userInd2 = user2.connections.indexOf(user1._id.toString())
            if(userInd1 < 0 && userInd2 < 0)
                return res.status(403).json({err: "User Is Not A Connection!!", success: false})
            
            user1.connections.splice(userInd1)
            user2.connections.splice(userInd2)
            user1.save()
            .catch((err) => {
                return res.status(500).json({err: err, success: false})
            })
            user2.save()
            .catch((err) => {
                return res.status(500).json({err: err, success: false})
            })

            return res.status(200).json({msg: "User Disconnected!", success: true})
        })
    })
}