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

        user.exp.splice(req.body.index, 1, {
            desig: req.body.desig,
            company: req.body.company,
            startDate: req.body.startDate,
            endDate: req.body.endDate
        })
        user.save()
        .catch((err) => {
            return res.status(500).json({err: err, success: false})
        })

        return res.status(200).json({msg: "Working Experience Updated!!", success: true})
    })
}

exports.removeExperience = (req, res) => {
    
    User.findById(req.root._id, (err, user) => {
        if(err)
            return res.status(500).json({err: err, success: false})

        user.exp.splice(req.body.index, 1)
        user.save()
        .catch((err) => {
            return res.status(500).json({err: err, success: false})
        })

        return res.status(200).json({msg: "Working Experience Removed!!", success: true})
    })
}