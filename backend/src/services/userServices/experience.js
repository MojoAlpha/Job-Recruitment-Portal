var User = require('../../models/user')

exports.addExperience = (req, res) => {

    User.findById(req.root._id, (err, user) => {
        if(err)
            return res.status(500).json({err: err, success: false})

        user.exp.push({desig: req.body.desig, company: req.body.company, startDate: req.body.startDate, endDate: req.body.endDate})       // Directly pushing the education object into the document
        user.save()
        .catch((err) => {
            return res.status(500).json({err: err, success: false})
        })

        return res.status(200).json({msg: "Working Experience Added!!", success: true})
    })
}

exports.updateExperience = (req, res) => {

    User.findById(req.root._id, (err, user) => {
        if(err)
            return res.status(500).json({err: err, success: false})

        user.education[req.body.index].degree = req.body.degree
        user.education[req.body.index].insti = req.body.insti
        user.education[req.body.index].year = req.body.year
        user.save()
        .catch((err) => {
            return res.status(500).json({err: err, success: false})
        })

        return res.status(200).json({msg: "Educational Qualification Updated!!", success: true})
    })
}

exports.removeExperience = (req, res) => {
    
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