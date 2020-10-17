var User = require('../../models/user')

exports.sendConnectReq = (req, res, next) => {
    
    if(req.root.type !== "U")
        return res.status(403).json({err: "Cannot Send A Connection Request!!", success: false})
    
    User.findById(req.params.userId, (err, user) => {
        if(!user)
            return res.status(404).json({err: "User Not Found!!", success: false})

        let userIndex = user.connRequests.indexOf(req.root._id)
        if(userIndex >= 0)
            return res.status(403).json({err: "Already Sent A Connection Request!!", success: false})
        
        user.connRequests.push(req.root._id)
        user.save()
        .catch((err) => {
            return res.status(500).json({err: err, success: false})
        })

        next()
    })
}

exports.acceptConnectReq = (req, res) => {

    User.findById(req.root._id, (err, user) => {
        if(err)
            return res.status(500).json({err: err, success: false})

        let userIndex = user.connRequests.indexOf(req.params.userId)
        if(userIndex < 0)
            return res.status(403).json({err: "Request Not Present!!", success: false})
        
        user.connRequests.splice(userIndex, 1)
        user.connections.push(req.params.userId)
        user.save()
        .catch((err) => {
            return res.status(500).json({err: err, success: false})
        })

        return res.status(200).json({msg: "Connection Request Accepted!!", success: true})
    })
}

exports.declineConnectReq = (req, res) => {

    User.findById(req.root._id, (err, user) => {
        if(err)
            return res.status(500).json({err: err, success: false})

        let userIndex = user.connRequests.indexOf(req.params.userId)
        if(userIndex < 0)
            return res.status(403).json({err: "Request Not Present!!", success: false})
        
        user.connRequests.splice(userIndex, 1)
        user.save()
        .catch((err) => {
            return res.status(500).json({err: err, success: false})
        })

        return res.status(200).json({msg: "Connection Request Declined!!", success: true})
    })
}