// Base URL :- http://localhost:8000/vacancy

var express = require('express')
var { body } = require('express-validator')

var { isCompanyVerified} = require('../../../middleware')
var { errHandler } = require('../../../services/errValidator')
const { postVacancy, 
        getVacancy, 
        updateVacancy, 
        deleteVacancy } = require('../../../services/vacancyServices/basic')
const { postVacancyNotify } = require('../../../services/NotfiyServices/vacancyNotify')

var router = express.Router()

/*  POST Route :- To Create Vacancy, Only Company is Authorized
    Req Body :- { title, desig, desc, requiredSkill[ IdStrings ] }
    Res Body :- {msg: "...", success: true} , if Sucessfully Created
                {err: "...", success: false} , if Any Error Occurs */
router.post('/', [
    body('title', 'desig', 'desc').notEmpty().withMessage("Vacany Details Should Be Provided!")
] , isCompanyVerified, errHandler, postVacancy, postVacancyNotify)

/*  GET Route :- Vacancy details For User OR Company
    Res Body :- {Vacancy Details} */
router.get('/:vacancyId', getVacancy)

/*  PUT Route :- Updating Existing Vacancy, Only By Owner
    Req Body :- { title, desig, desc, requiredSkill[{ Strings }] } 
    Res Body :- {msg: "...", success: true} , if Sucessfully Updated
                {err: "...", success: false} , if Any Error Occurs */
router.put('/:vacancyId', isCompanyVerified, updateVacancy)

/*  DELETE Route :- Deleting Existing Vacancy, Only By Owner
    Res Body :-  {msg: "...", success: true} , if Sucessfully Deleted */
router.delete('/:vacancyId', isCompanyVerified, deleteVacancy)

module.exports = router