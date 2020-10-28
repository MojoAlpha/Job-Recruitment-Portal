// Base URL :- http://localhost:8000/vacancy

var express = require('express')
var { isCompanyVerified} = require('../../../middleware')

const { selectedNotify, closeNotify } = require('../../../services/NotfiyServices/vacancyNotify')
const { getVacApplicants, vacancyApply, vacancyClose, vacancySelect, getCompanyVacancy,  } = require('../../../services/vacancyServices/vacancy')


var router = express.Router()

router.get('/company/:companyId', getCompanyVacancy)

/*  GET Route :- To Get The List Of Applicants In A Vacancy, Only Company is Authorized
    Res Body :- {applicantsList, success: true} , if Sucessfully Created
                {err: "...", success: false} , if Any Error Occurs */
router.get('/applicant/:vacancyId', isCompanyVerified, getVacApplicants)

/*  POST Route :- To Select An Applicant, Only Company is Authorized
    Req Body :- { userId }
    Res Body :- {msg: "...", success: true} , if Sucessfully Created
                {err: "...", success: false} , if Any Error Occurs */
router.post('/select/:vacancyId', isCompanyVerified, vacancySelect, selectedNotify)

/*  POST Route :- To Apply In A Vacancy
    Res Body :- {msg: "...", success: true} , if Sucessfully Created
                {err: "...", success: false} , if Any Error Occurs */
router.post('/apply/:vacancyId', vacancyApply)

/*  POST Route :- To Close Vacancy, Only Company is Authorized
    Res Body :- {msg: "...", success: true} , if Sucessfully Created
                {err: "...", success: false} , if Any Error Occurs */
router.post('/close/:vacancyId', isCompanyVerified, vacancyClose, closeNotify)

module.exports = router