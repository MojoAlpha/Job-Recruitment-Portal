var Posts = require('../../models/post')
var User = require('../../models/user')


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