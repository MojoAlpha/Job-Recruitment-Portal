var User = require('../../models/user')

exports.addEducationalQual = (req, res) => {
    
    User.findById(req.root._id, (err, user) => {
        if(err)
            return res.status(500).json({err: err, success: false})

        user.education.push({degree: req.body.degree, insti: req.body.insti, year: req.body.year})       // Directly pushing the education object into the document
        user.save()
        .catch((err) => {
            return res.status(500).json({err: err, success: false})
        })

        return res.status(200).json({msg: "Educational Qualification Added!!", success: true})
    })
}

exports.removeEducationalQual = (req, res) => {
    
    User.findById(req.root._id, (err, user) => {
        if(err)
            return res.status(500).json({err: err, success: false})

        for(let i = 0; i < user.education.length; ++i) {
            if(user.education[i].degree === req.body.degree && user.education[i].insti === req.body.insti && user.education[i].year === req.body.year) {
                user.education.splice(i, 1);
                break;
            }   
        }

        user.save()
        .catch((err) => {
            return res.status(500).json({err: err, success: false})
        })

        return res.status(200).json({msg: "Educational Qualification Removed!!", success: true})
    })
}