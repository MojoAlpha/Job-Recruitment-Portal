var User = require('../../models/user')
var Vacancy = require('../../models/vacancy')

exports.appliedVacancy = (req, res) => {

    Vacancy.find({ "$or": [{ "applicants": { "$elemMatch": {"$eq": req.root._id} }}, { "accepted": { "$elemMatch": {"$eq": req.root._id} } }] }, { name: 1, isOpen: 1})
    .then((vacList) => {
        
        return res.status(200).json({appliedVac: vacList, success: true})
    }, (err) => {
        return res.status(500).json({err: err, success: false})
    })
}