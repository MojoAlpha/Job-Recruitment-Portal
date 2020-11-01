var User = require('../../models/user')
var Notification = require('../../models/notification')

/*
CONNECTION CODE
0 - Any One User Has Sent You Connection Request
1 - Many Users Have Sent You Connection Request
*/

// Notification To The User After Recieving Connection Request
exports.connectionReq = (req, res) => {

    // Checking If An Unread Such Notification Already Exists
    Notification.findOne({reciever: req.params.userId, 
                          isRead: false, 
                          "$or":[{code: 0}, 
                                 {code: 1
                                }]
                        }, (err, notification) => {
        
        // If Not, Create A New Notification
        if(!notification) {
            var newNotify = new Notification({
                reciever: req.params.userId,
                sender: req.root._id,
                code: 0,
                link: `${process.env.HOST}/user/`
            })
        
            newNotify.save()
            .catch((err) => {
                return res.status(500).json({err: err, success: false})
            })
        } 
        // If Exists, Just Stack It Into One With Previous One
        else {
            notification.code = 1
            notification.save()
            .catch((err) => {
                return res.status(500).json({err: err, success: false})
            })
        }

        return res.status(200).json({msg: "Connection Request Sent!!", success: true})
    })
}

// This Approach Lowers The Number Of Connection Request Notifications & Ensures That Important Notification Related To Jobs Remain