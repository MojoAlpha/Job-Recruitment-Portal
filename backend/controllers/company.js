const company = require('../models/company')
var Company = require('../models/company')
var fs = require('fs')

exports.companyDetails = (req, res) => {
    Company.findById(req.root._id, (err, company) => {
        if(err || !company)
            return res.status(400).json({err: "Bad Request!!", success: false})
        
        res.status(200).json({
            name: company.name,
            email: company.email,
            desc: company.desc,
            logo: company.logo,
            hq: company.hq,
            size: company.size,
            webLink: company.webLink
        })
    })
}

exports.chngCompanyLogo = (req, res) => {
    Company.findById(req.root._id, (err, company) => {
        if(err || !company)
            return res.status(404).json({err: "Company Not Found!!", success: false})
        
        if(company.logo !== 'logo/default.png')
            fs.unlinkSync(`./public/${company.logo}`)
        
        var logoPath = req.file.path
        company.logo = logoPath.slice(logoPath.indexOf('/') + 1)
        company.save((err, company) => {
            if(err)
                return res.status(500).json({err : err, success: false})
            
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.json({msg: "Company Logo Updated!!", success: true})
        })
    })
}