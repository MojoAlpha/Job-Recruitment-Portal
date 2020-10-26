var Posts = require('../../models/post')
var User = require('../../models/user')

// Getting All The Posts By The User OR Company
exports.getPosts = (req, res) => {

    Posts.find( {owner: req.params.userId} )
    .sort({createdAt: -1})
    .then((posts) => {
        
        User.findById(req.root._id)
        .then((user) => {
            res.status(200).json({
                posts: posts,
                user: {
                    _id: user._id,
                    name: user.name,
                    dp: user.dp
                }
            })
        })
    })
}