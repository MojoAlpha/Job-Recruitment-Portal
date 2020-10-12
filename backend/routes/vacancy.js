var express = require('express')
var bodyParser = require('body-parser');
const { isVerified, isCompanyVerified, isSignedIn } = require('../middleware');
const { createVacancy, getVacancy, updateVacancy, deleteVacancy, getVacanyApplicants, vacancyApply } = require('../controllers/vacancy')

var vacancyRouter = express.Router();
vacancyRouter.use(bodyParser.json());

/*  POST Route :- To Create Vacancy, Only Company is Authorized
    Req Body :- { title, desig, desc, requiredSkill[ IdStrings ] }
    Res Body :- {msg: "...", success: true} , if Sucessfully Created
                {err: "...", success: false} , if Any Error Occurs */
vacancyRouter.post('/create', isSignedIn, isVerified, isCompanyVerified, createVacancy)

/*  GET Route :- Vacancy details For User OR Company
    Res Body :- {Vacancy Details} */
vacancyRouter.get('/:vacancyId', isSignedIn, isVerified, getVacancy)

/*  PUT Route :- Updating Existing Vacancy, Only By Owner
    Req Body :- { title, desig, desc, requiredSkill[{ Strings }], isOpen } 
    Res Body :- {msg: "...", success: true} , if Sucessfully Updated
                {err: "...", success: false} , if Any Error Occurs */
vacancyRouter.put('/:vacancyId', isSignedIn, isVerified, isCompanyVerified, updateVacancy)

/*  DELETE Route :- Deleting Existing Vacancy, Only By Owner
    Res Body :-  {msg: "...", success: true} , if Sucessfully Deleted */
vacancyRouter.delete('/:vacancyId', isSignedIn, isVerified, isCompanyVerified, deleteVacancy)

/*  GET Route :- List Of Applicants, Only For Owner
    Res Body :- { Applicants List } */
vacancyRouter.get('/:vacancyId/all', isSignedIn, isVerified, isCompanyVerified, getVacanyApplicants)

/*  POST Route :- For a User To Apply in a Vacancy
    Res Body :- {msg: "...", success: true} , if Sucessfully Applied
                {err: "...", success: false} , if Any Error Occurs */
vacancyRouter.post('/apply/:vacancyId', isSignedIn, isVerified, vacancyApply)

module.exports = vacancyRouter;