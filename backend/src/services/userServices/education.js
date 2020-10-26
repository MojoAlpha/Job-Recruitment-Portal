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

exports.updateEducationalQual = (req, res) => {

    User.findById(req.root._id, (err, user) => {
        if(err)
            return res.status(500).json({err: err, success: false})

        user.education.splice(req.body.index, 1, {
            degree: req.body.degree,
            insti: req.body.insti,
            year: req.body.year
        })
        user.save()
        .catch((err) => {
            return res.status(500).json({err: err, success: false})
        })

        return res.status(200).json({msg: "Educational Qualification Updated!!", success: true})
    })
}

exports.removeEducationalQual = (req, res) => {
    
    User.findById(req.root._id, (err, user) => {
        if(err)
            return res.status(500).json({err: err, success: false})

        user.education.splice(req.body.index, 1)
        user.save()
        .catch((err) => {
            return res.status(500).json({err: err, success: false})
        })

        return res.status(200).json({msg: "Educational Qualification Removed!!", success: true})
    })
}