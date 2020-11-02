var User = require('../../models/user')
var Vacancy = require('../../models/vacancy')
var mongoose = require('mongoose')

exports.getCompanyVacancy = (req, res) => {

    Vacancy.find({
            owner: req.params.companyId
        }, {
            desig: 1,
            isOpen: 1
        })
        .sort({
            createdAt: -1
        })
        .then((vacancyList) => {
            return res.status(200).json({
                vacancies: vacancyList,
                success: true
            })
        }, (err) => {
            return res.status(500).json({
                err: err,
                success: false
            })
        })
}

// get applicants of a vacancy (Only For Owner Company)
exports.getVacApplicants = (req, res) => {
    Vacancy.findById(req.params.vacancyId, (err, vacancy) => {

        if (!vacancy)
            return res.status(404).json({
                err: "Vacancy Not Found!!",
                success: false
            })

        if (req.root._id.toString() !== vacancy.owner.toString())
            return res.status(401).json({
                err: "Not Authorised To Access Applicants!!",
                success: false
            })

        var applicant_id = vacancy.applicants.map((id) => {
            return mongoose.mongo.ObjectID(id)
        })
        User.find({
            _id: {
                $in: applicant_id
            }
        }, {
            _id: 1,
            name: 1,
            dp: 1,
            email: 1
        }, (err, applicants) => {

            return res.status(200).json({
                applicants: applicants,
                success: true
            })
        })
    })
}

exports.getSelectedApplicants = (req, res) => {
    Vacancy.findById(req.params.vacancyId, (err, vacancy) => {

        if (!vacancy)
            return res.status(404).json({
                err: "Vacancy Not Found!!",
                success: false
            })

        if (req.root._id.toString() !== vacancy.owner.toString())
            return res.status(401).json({
                err: "Not Authorised To Access Applicants!!",
                success: false
            })

        var selected_id = vacancy.accepted.map((id) => {
            return mongoose.mongo.ObjectID(id)
        })
        User.find({
            _id: {
                $in: selected_id
            }
        }, {
            name: 1,
            dp: 1,
            email: 1
        }, (err, selected) => {
            return res.status(200).json({
                selected: selected,
                success: true
            })
        })
    })
}

// selecting a vacancy applicant for the job
exports.vacancySelect = (req, res, next) => {

    if (req.body.userId === undefined)
        return res.status(400).json({
            err: "Please Provide User ID",
            success: false
        })

    Vacancy.findById(req.params.vacancyId, (err, vacancy) => {
        if (err || !vacancy)
            return res.status(500).json({
                err: err,
                success: false
            })

        let applicInd = vacancy.applicants.indexOf(req.body.userId)
        if (applicInd < 0)
            return res.status(404).json({
                err: "User Has Not Applied!!",
                success: false
            })

        vacancy.accepted.push(req.body.userId)
        vacancy.applicants.splice(applicInd, 1);
        vacancy.save()
            .catch((err) => {
                return res.status(500).json({
                    err: err,
                    success: false
                })
            })

        req.root.vacancyId = vacancy._id
        next() // passing the control to notification services
    })
}

// applying in an open vacancy (Only For Users)
exports.vacancyApply = (req, res) => {
    if (req.root.type !== "U")
        return res.status(400).json({
            err: "You Cannot Proceed With Application!!",
            success: false
        })

    Vacancy.findById(req.params.vacancyId, (err, vacancy) => {
        if (!vacancy)
            return res.status(404).json({
                err: "Vacancy Not Found!!",
                success: false
            })

        if (vacancy.isOpen === false)
            return res.status(403).json({
                err: "Vacancy Has Been Closed!!",
                success: false
            })

        vacancy.applicants.push(req.root._id)

        vacancy.save()
            .catch((err) => {
                return res.status(500).json({
                    err: err,
                    success: false
                })
            })

        return res.status(200).json({
            msg: "Applied!!",
            success: true
        })
    })
}

// closing an open vacancy
exports.vacancyClose = (req, res, next) => {

    Vacancy.findById(req.params.vacancyId, (err, vacancy) => {
        if (!vacancy)
            return res.status(404).json({
                err: "Vacancy Not Found!!",
                success: false
            })

        // giving permission only to the owner of the vacancy
        if (vacancy.owner.toString() !== req.root._id.toString())
            return res.status(401).json({
                err: "You Are Not Authorised To Close This Vacancy!!",
                success: false
            })

        vacancy.isOpen = false
        vacancy.save()
            .catch((err) => {
                return res.status(500).json({
                    err: err,
                    success: false
                })
            })
        req.root.vacancyId = req.params.vacancyId

        next() // passing control to notification services
    })
}