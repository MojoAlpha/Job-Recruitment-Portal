var Posts = require('../../models/post');
const User = require('../../models/user');

exports.createPost = (req, res) => {

    var newPost = new Posts({
        owner: req.root._id,
        type: req.root.type,
        desc: req.body.desc,
        links: req.body.links,
        postImg: req.file.path
    })

    newPost.save()
    .catch((err) => {
        return res.status(500).json({err: err, success: false})
    })

    return res.status(200).json({msg: "Successfully Posted", success: true})
}

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