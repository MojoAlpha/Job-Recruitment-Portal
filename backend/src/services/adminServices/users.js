var User = require('../../models/user')
const router = require('../../router/adminRouter/api/users')

// Getting A List Of Basic Details Of All Users
exports.getUsers = (req, res) => {

    User.find({}, {name: 1, dp: 1, phone: 1, email: 1}, (err, users) => {

        if(err)
            return res.status(500).json({err: err, success: false})
        
        return res.status(200).json({users: users, success: true})
    })
}

// Getting All The Details Of A User
exports.getUser = (req, res) => {

    User.findById(req.params.userId, (err, user) => {

        if(err)
         return res.status(404).json({err: "User Doesn't Exist!", success: false})

         res.send(user)
    })
}

// Deleting A User
exports.deleteUser = (req, res) => {

    User.findByIdAndDelete(req.params.userId, (err, user) => {

        if(err || !user)
            return res.status(404).json({err: "User Not Found!!", success: false})
        
        return res.status(200).json({msg: "User Deleted!", success: true})
    })
} 