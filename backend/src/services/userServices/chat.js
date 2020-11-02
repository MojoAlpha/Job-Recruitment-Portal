var Chat = require('../../models/chat')

exports.allChats = (req, res) => {
    console.log(req.root)
}

exports.userChats = (req, res) => {

    Chat.aggregate([
        {"$match": {
            "$or": [{"$and": [{"reciever": req.root._id.toString()}, {"sender": req.params.userId.toString()}]}, {"$and": [{"reciever": req.params.userId.toString()}, {"sender": req.root._id.toString()}]}]
        }},
        {"$sort": {"createdAt": -1}}
    ])
    .then((userChats) => {
        res.send(userChats)
    })
}