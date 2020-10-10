var Vacancy = require('../models/vacancy')
var Company = require('../models/company')
const company = require('../models/company')
const vacancy = require('../models/vacancy')

exports.createVacancy = (req, res) => {
    if(req.body.title === undefined || req.body.title === "" || req.body.desig === undefined || req.body.desig === "")
        return res.status(400).json({err: "Please Fill All The Details!!", success: false})
    
    var newVacancy = new Vacancy({
        owner: req.root._id,
        title: req.body.title,
        desig: req.body.desig,
        desc: req.body.desc,
        requiredSkill: req.body.requiredSkill
    })

    newVacancy.save((err, vacancy) => {
        if(err)
            return res.status(500).json({err: err, success: false})
        
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json({msg: "Vacancy Created!!", success: true})
    })
}

exports.getVacancy = (req, res) => {

    Vacancy.findById(req.params.vacancyId, (err, vacancy) => {
        if(err || !vacancy)
            return res.status(404).json({err: "Vacancy Not Found!!", success: false})
        
        Company.findById(vacancy.owner, (err, company) => {
            res.status(200).json({
                title: vacancy.title,
                desig: vacancy.desig,
                desc: vacancy.desc,
                isOpen: vacancy.isOpen,
                requiredSkill: vacancy.requiredSkill,
                Oname: company.name,
                Oemail: company.email,
                Ologo: company.logo
            })
        })
    })
}

exports.updateVacancy = (req, res) => {
    Vacancy.findById(req.params.vacancyId, (err, vacancy) => {
        if(err || !vacancy)
            return res.status(404).json({err: "Vacancy Not Found!!", success: false})
    
        if(vacancy.owner.toString() !== req.root._id.toString())
        return res.status(401).json({err: "Not Authorised. Cannot Update!!", success: false})

        if(req.body.title !== undefined)
            vacancy.title = req.body.title
        if(req.body.desig !== undefined)
            vacancy.desig = req.body.desig
        if(req.body.desc !== undefined)
            vacancy.desc = req.body.desc
        if(req.body.isOpen !== undefined)
            vacancy.desc = req.body.isOpen
        if(req.body.requiredSkill !== undefined)
            vacancy.requiredSkill = req.body.requiredSkill

        vacancy.save((err, vacancy) => {
            if(err)
                return res.status(500).json({err: err, success: false})
            
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.json({msg: "Vacancy Updated!!", success: true})
        })
    })
}

exports.deleteVacancy = (req, res) => {
    Vacancy.findById(req.params.vacancyId, (err, vacancy) => {
        if(err || !vacancy)
            return res.status(404).json({err: "Vacancy Not Found!!", success: false})

        if(vacancy.owner.toString() !== req.root._id.toString())
            return res.status(401).json({err: "Not Authorised. Cannot Delete!!", success: false})
        
        Vacancy.findByIdAndDelete(vacancy._id, (err, vacancy) => {
            if(err)
                return res.status(500).json({err: err, success: false})
            
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.json({msg: "Vacancy Deleted!!", success: true})
        })
    })
}

exports.getVacanyApplicants = (req, res) => {
    Vacancy.findById(req.params.vacancyId, (err, vacancy) => {
        if(err || !vacancy)
            return res.status(404).json({err: "Vacancy Not Found!!", success: false})
        
        if(req.root._id.toString() !== vacancy.owner.toString())
            return res.status(401).json({err: "Not Authorised To Access Applicants!!", success: false})
        
        res.status(200).json({applicants: vacancy.applicants, success: true})
    })
}

exports.vacancyApply = (req, res) => {
    if(req.root.type !== "U")
        return res.status(400).json({err: "You Cannot Proceed With Application!!", success: false})
    
    Vacancy.findById(req.params.vacancyId, (err, vacancy) => {
        if(err || !vacancy)
            return res.status(404).json({err: "Vacancy Not Found!!", success: false})

        vacancy.applicants.push({
            name: req.root.name,
            dp: req.root.dp,
            _id: req.root._id
        })

        vacancy.save((err, vacancy) => {
            if(err)
                return res.status(500).json({err: err, success: false})
            
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.json({msg: "Applied!!", success: true})
        })
    })
}