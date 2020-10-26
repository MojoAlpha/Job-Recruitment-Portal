var Posts = require('../../models/post');
const User = require('../../models/user');

// Creating A Post
exports.createPost = (req, res) => {

    var newPost = new Posts({
        owner: req.root._id,
        type: req.root.type,
        desc: req.body.desc,
        links: req.body.links,
    })

    // Saving Post Image Field Only If Image Is Given
    if(req.file !== undefined)
        newPost.postImg=req.file.path

    newPost.save()
    .catch((err) => {
        return res.status(500).json({err: err, success: false})
    })

    return res.status(200).json({msg: "Successfully Posted", success: true})
}

// Updating A Post
exports.updatePost = (req, res) => {
    
    Posts.find( {_id: req.params.postId}, (err, post) => {
        if(err || !post)
            return res.status(404).json({err: "Post Not Found!!", success: false})
        
        if(post.owner === req.root._id)
            return res.status(401).json({err: "Unauthorised To Update This Post!", success: false})
        
        if(req.body.desc !== undefined)
            post.desc = req.body.desc
        if(req.body.links !== undefined)
            post.links = req.body.links
        if(req.file.path !== undefined)
            post.postImg = req.file.path
        
        newPost.save()
        .catch((err) => {
            return res.status(500).json({err: err, success: false})
        })
    
        return res.status(200).json({msg: "Post Successfully Updated!", success: true})
    })
}

// Deleting A Post
exports.deletePost = (req, res) => {

    Posts.find( {_id: req.params.postId}, (err, post) => {
        if(err || !post)
            return res.status(404).json({err: "Post Not Found!!", success: false})
        
        // Check For The Owner & Person Firing The Request
        if(post.owner === req.root._id)
            return res.status(401).json({err: "Unauthorised To Update This Post!", success: false})
        
        Posts.findByIdAndDelete(req.params.postId)
        .catch((err) => {
            return res.status(500).json({err: err, success: false})
        })
    
        return res.status(200).json({msg: "Post Successfully Deleted!", success: true})
    })
}