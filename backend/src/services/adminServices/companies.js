const company = require('../../models/company')
var Company = require('../../models/company')

exports.getCompanies = (req, res) => {

    Company.find({}, {name: 1, email: 1, webLink: 1, logo: 1}, (err, companies) => {

        if(err)
            return res.status(500).json({err: err, success: false})
        
        return res.status(200).json({companies: companies, success: true})
    })
}

exports.getCompany = (req, res) => {

    Company.findById(req.params.companyId, (err, company) => {
        res.send(company)
    })
}

exports.deleteCompany = (req, res) => {

    Company.findByIdAndDelete(req.params.companyId, (err, company) => {

        if(err)
            return res.status(404).json({err: "Company Not Found!", success: false})
        
        return res.status(200).json({msg: "Compnay Deleted!", success: true})
    })
}

exports.adminVerifyCompany = (req, res) => {

    Company.findById(req.params.companyId, (err, company) => {

        if(err || !company)
            return res.status(404).json({err: "Company Not Found!", success: false})
        
        company.adminVerified = true
        company.save()
        .catch((err) => {
            return res.status(500).json({err: err, success: false})
        })

        return res.status(200).json({msg: "Company Admin Verified!", success: true})
    })
}