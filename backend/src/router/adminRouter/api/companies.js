// Base URL :- http://localhost:8000/admin/companies
var express = require('express')
const { getCompanies, 
        deleteCompany, 
        adminVerifyCompany, 
        getCompany } = require('../../../services/adminServices/companies')
var router = express.Router()

/*  GET Route :- Get List Of All The Companies
    Req Body :- {email}
    Res Body :- {msg: "...", success: true} , if Sucessfully Verfied
                {err: "...", success: false} , if Any Error Occurs */
router.get('/', getCompanies)

/*  GET Route :- Get All The Details Of A Company
    Res Body :- {company} , if Sucessfully Verfied
                {err: "...", success: false} , if Any Error Occurs */
router.get('/:companyId', getCompany)

/*  DELETE Route :- Delete A Company
    Res Body :- {msg: "...", success: true} , if Sucessfully Verfied
                {err: "...", success: false} , if Any Error Occurs */
router.delete('/:companyId', deleteCompany)

/*  POST Route :- Verify The Authenticity Of A Company
    Res Body :- {msg: "...", success: true} , if Sucessfully Verfied
                {err: "...", success: false} , if Any Error Occurs */
router.post('/:companyId/verify', adminVerifyCompany)

module.exports = router