const user = require('../../models/user')
var User = require('../../models/user')

// sending connection request to a user
exports.sendConnectReq = (req, res, next) => {
    
    // restricting permission only to user
    if(req.root.type !== "U")
        return res.status(403).json({err: "Cannot Send A Connection Request!!", success: false})
    
    User.findById(req.params.userId, (err, user) => {
        if(!user)
            return res.status(404).json({err: "User Not Found!!", success: false})

        let userIndex = user.connRequests.indexOf(req.root._id)
        if(userIndex >= 0)
            return res.status(403).json({err: "Already Sent A Connection Request!!", success: false})
        
        if(req.params.userId === req.root._id)
            return res.status(400).json({err: "You Cannot Send Connection Request To Yourself!", success: false})
        
        user.connRequests.push(req.root._id)
        user.save()
        .catch((err) => {
            return res.status(500).json({err: err, success: false})
        })

        next()  //passing control to notification services
    })
}

// disconnecting a user
exports.deleteConnection = (req, res) => {
    if(req.body.userId === undefined)
        return res.status(400).status({err: "User Not Specified!", success: false})

    User.findById(req.root._id, (err, user1) => {
        User.findById(req.body.userId, (err, user2) => {

            let userIndex1 = user1.connections.indexOf(req.body.userId)
            let userIndex2 = user2.connections.indexOf(req.root._id)
            if(userIndex1 < 0 && userIndex2)
                return res.status(403).status({err: "Not A Connection!", success: false})
            
            user1.connections.splice(userIndex1, 1)
            user2.connections.splice(userIndex2, 1)
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

// accepting a connection request
exports.acceptConnectReq = (req, res) => {

    // adding the user into each others connections
    User.findById(req.root._id, (err, user1) => {
        User.findById(req.params.userId, (err, user2) => {
            
            if(err || !user2)
                return res.status(500).json({err: "User Not Found!!", success: false})

            let userIndex = user1.connRequests.indexOf(req.params.userId)
            if(userIndex < 0)
                return res.status(403).json({err: "Request Not Present!!", success: false})
            
            user1.connRequests.splice(userIndex, 1)
            user1.connections.push(req.params.userId)
            user2.connections.push(req.root._id)
            user1.save()
            .catch((err) => {
                return res.status(500).json({err: err, success: false})
            })

            user2.save()
            .catch((err) => {
                return res.status(500).json({err: err, success: false})
            })

            return res.status(200).json({msg: "Connection Request Accepted!!", success: true})
        })
    })
}

// declining a connection request
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