var express = require('express')
var {isSignedIn, isVerified, isCompanyVerified} = require('../../../middleware')
const { getVacApplicants, vacancyApply,  } = require('../../../services/vacancyServices/vacancy')


var router = express.Router()

router.get('/applicant/:vacancyId', isSignedIn, isVerified, isCompanyVerified, getVacApplicants)

router.post('/apply/:vacancyId', isSignedIn, isVerified, vacancyApply)

router.post('/close/:vacancyId', isSignedIn, isVerified, isCompanyVerified, )

module.exports = router