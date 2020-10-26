var Company = require('../../models/company')
var fs = require('fs')

// Updating The Details Of Company
exports.detailUpdate = (req, res) => {
    
    Company.findById(req.root._id, (err, company) => {
        if(err)
            return res.status(500).json({err: err, success: false})
        
        if(req.body.desc !== undefined)
            company.desc = req.body.desc
        if(req.body.hq !== undefined)
            company.hq = req.body.hq
        if(req.body.size !== undefined)
            company.size = req.body.size
        if(req.body.webLink !== undefined)
            company.webLink = req.body.webLink
        
        company.save()
        .catch((err) => {
            return res.status(500).json({err: err, success: false})
        })

        return res.status(200).json({ msg: "Company Details Updated!!", success: true })
    })
}

// Updating The Logo Of Company
exports.logoUpdate = (req, res) => {
    
    Company.findById(req.root._id, (err, company) => {
        if(err)
            return res.status(500).json({err: err, success: false})
        
        if(company.logo !== 'logo/default.png')
            fs.unlinkSync(`./public/${company.logo}`)
        
        var logoPath = req.file.path
        company.logo = logoPath.slice(logoPath.indexOf('/') + 1)

        company.save()
        .catch((err) => {
            return res.status(500).json({err: err, success: false})
        })

        return res.status(200).json({ msg: "Company Logo Updated!!", success: true })
    })
}