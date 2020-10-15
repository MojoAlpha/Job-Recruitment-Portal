var express = require('express')
var { body } = require('express-validator')

var {isSignedIn, isVerified, isCompanyVerified} = require('../../../middleware')
var {vacancyErrors} = require('../../../services/vacancyServices/errHandler')
const { postVacancy, getVacancy, updateVacancy, deleteVacancy } = require('../../../services/vacancyServices/basic')

var router = express.Router()

/*  POST Route :- To Create Vacancy, Only Company is Authorized
    Req Body :- { title, desig, desc, requiredSkill[ IdStrings ] }
    Res Body :- {msg: "...", success: true} , if Sucessfully Created
                {err: "...", success: false} , if Any Error Occurs */
router.post('/', [
    body('title').notEmpty().withMessage("Title Should Be Provided!"),
    body('desig').notEmpty().withMessage("Designation Should Be Provided!"),
    body('desc').notEmpty().withMessage("Description Should Be Provided!"),
    body('requiredSkill').notEmpty().withMessage("Skill Set Should Be Provided!"),
] , isSignedIn, isVerified, isCompanyVerified, vacancyErrors, postVacancy)

/*  GET Route :- Vacancy details For User OR Company
    Res Body :- {Vacancy Details} */
router.get('/:vacancyId', isSignedIn, isVerified, getVacancy)

/*  PUT Route :- Updating Existing Vacancy, Only By Owner
    Req Body :- { title, desig, desc, requiredSkill[{ Strings }], isOpen } 
    Res Body :- {msg: "...", success: true} , if Sucessfully Updated
                {err: "...", success: false} , if Any Error Occurs */
router.put('/:vacancyId', isSignedIn, isVerified, isCompanyVerified, updateVacancy)

/*  DELETE Route :- Deleting Existing Vacancy, Only By Owner
    Res Body :-  {msg: "...", success: true} , if Sucessfully Deleted */
router.delete('/:vacancyId', isSignedIn, isVerified, isCompanyVerified, deleteVacancy)

module.exports = router