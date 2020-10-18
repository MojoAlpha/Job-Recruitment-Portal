var User = require('../../models/user')

exports.addLink = (req, res) => {

    User.findById(req.root._id, (err, user) => {
        if(err)
            return res.status(500).json({err: err, success: false})
        
        user.links.push({title: req.body.title, url: req.body.url})
        user.save()
        .catch((err) => {
            return res.status(500).json({err: err, success: false})
        })

        return res.status(200).json({msg: "New Link Added!!", success: true})
    })
}

exports.updateLink = (req, res) => {

    User.findById(req.root._id, (err, user) => {
        if(err)
            return res.status(500).json({err: err, success: false})
        
        user.links[req.body.index].title = req.body.title
        user.links[req.body.index].url = req.body.url 
        user.save()
        .catch((err) => {
            return res.status(500).json({err: err, success: false})
        })

        return res.status(200).json({msg: "Link Updated!!", success: true})
    })
}

exports.removeLink = (req, res) => {
    
    User.findById(req.root._id, (err, user) => {
        if(err)
            return res.status(500).json({err: err, success: false})
        
        for(let i = 0; i < user.links.length; ++i) {
            if(user.links[i].title === req.body.title && user.links[i].url === req.body.url) {
                user.links.splice(i, 1);
                break;
            }
        }
        user.save()
        .catch((err) => {
            return res.status(500).json({err: err, success: false})
        })

        return res.status(200).json({msg: "Link Removed!!", success: true})
    })
}