var User = require('../../models/user')
var Skill = require('../../models/skill')
var Company = require('../../models/company')
var Notification = require('../../models/notification')
var mongoose = require('mongoose')

exports.basicDetails = (req, res) => {

    Notification.find({
        owner: req.root._id,
        isRead: false
    }, (err, notifications) => {

        req.root.unreadNotification = notifications.length
        return res.status(200).json(req.root)
    })
}

/* Connection Status Codes :-
    0 - Connection
    1 - Pending Connection Request
    2 - Connection Request Exists
    3 - Neither Of Above */
exports.userDetails = (req, res) => {

    User.findById(req.params.userId, (err, user) => {
        User.findById(req.root._id, (err, usr) => {

            if(!user)
                return res.status(404).json({err: "User Not Found!", success: false})
        
            var connectionStatus = -1
            let isConnection = user.connections.indexOf(req.root._id)
            let isPending = user.connRequests.indexOf(req.root._id)
            let doesReqExist = usr.connRequests.indexOf(req.params.userId)

            if(isConnection >= 0)
                connectionStatus = 0
            else if(isPending >= 0)
                connectionStatus = 1
            else if(doesReqExist >= 0)
                connectionStatus = 2
            else
                connectionStatus = 3
            
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
                    connectionCount: user.connections.length,
                    followedCount: user.followed.length,
                    connectionStatus: connectionStatus
                })
            })
        })


        Skill.find({
                _id: {
                    $in: skill_ids
                }
            })
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
                    connectionCount: user.connections.length,
                    connectionStatus: connectionStatus,
                    exp: user.exp
                })
            })
    })
}

// list of user connections & companies followed
exports.extraUserDetails = (req, res) => {

    User.findById(req.params.userId, (err, user) => {
        if (err)
            return res.status(500).json({
                err: err,
                success: false
            })

        var connect_ids = user.connections.map((id) => {
            return mongoose.mongo.ObjectID(id)
        })
        var followd_ids = user.followed.map((id) => {
            return mongoose.mongo.ObjectID(id)
        })

        User.find({
                _id: {
                    $in: connect_ids
                }
            }, {
                _id: 1,
                name: 1,
                dp: 1,
                bio: 1
            })
            .then((userList) => {
                Company.find({
                        _id: {
                            $in: followd_ids
                        }
                    }, {
                        _id: 1,
                        name: 1,
                        logo: 1,
                        desc: 1
                    })
                    .then((companyList) => {

                        return res.status(200).json({
                            connections: userList,
                            followed: companyList
                        })
                    })
            })

    })
}

// get the notifications of logged user
exports.getNotifications = (req, res) => {

    Notification.find({
            reciever: req.root._id
        })
        .sort({
            updatedAt: -1
        })
        .then((notifications) => {

            res.status(200).json({
                notifications: notifications,
                success: true
            })
            Notification.updateMany({
                    reciever: req.root._id,
                    isRead: false
                }, {
                    isRead: true
                }, {
                    "multi": true
                })
                .catch((err) => {
                    console.log(err)
                    res.status(500).json({
                        err: "Cannot Update isRead Status Of Notifications!",
                        success: true
                    })
                })

        }, (err) => res.status(500).json({
            err: err,
            success: false
        }))
}