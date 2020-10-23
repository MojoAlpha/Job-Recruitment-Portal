var User = require('../../models/user')
var Notification = require('../../models/notification')
const notification = require('../../models/notification')

exports.connectionReq = (req, res) => {

    Notification.findOne({reciever: req.params.userId, 
                          isRead: false, 
                          "$or":[{msg: "Sent You A Connection Request!"}, 
                                 {msg: "You May Have Pending Connection Requests!"
                                }]
                        }, (err, notification) => {
        if(!notification) {
            var newNotify = new Notification({
                reciever: req.params.userId,
                sender: req.root._id,
                msg: "Sent You A Connection Request!",
                link: `${process.env.HOST}/user/`
            })
        
            newNotify.save()
            .catch((err) => {
                return res.status(500).json({err: err, success: false})
            })
        } 
        else {
            notification.msg = "You May Have Pending Connection Requests!"
            notification.save()
            .catch((err) => {
                return res.status(500).json({err: err, success: false})
            })
        }

        return res.status(200).json({msg: "Connection Request Sent!!", success: true})
    })
}