var express = require('express')
const { getCompanies, deleteCompany } = require('../../../services/adminServices/companies')
var router = express.Router()

router.get('/', getCompanies)

router.delete('/:companyId', deleteCompany)

module.exports = router