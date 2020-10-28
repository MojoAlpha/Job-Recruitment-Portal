var Posts = require('../../models/post')
var User = require('../../models/user')
var Company = require('../../models/company')
const company = require('../../models/company')

// Getting All The Posts By The User OR Company
exports.getPosts = (req, res) => {

    Posts.find( {owner: req.params.Id} )
    .sort({createdAt: -1})
    .then((posts) => {
        
        User.findById(req.params.Id, (err, user) => {
            Company.findById(req.params.Id, (err, company) => {
                var _id, name, pic

                if(user) {
                    _id = user._id,
                    name = user.name,
                    pic = user.dp
                }
                else if(company) {
                    _id = company._id,
                    name = company.name,
                    pic = company.logo
                }
                else
                    return res.status(404).json({err: "Not Found", success: false})
                
                return res.status(200).json({
                    posts: posts,
                    _id: _id,
                    name: name,
                    pic: pic
                })
            })
        })
    })
}