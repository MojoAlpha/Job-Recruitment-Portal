// Base URL :- http://localhost:8000/user/exp

var express = require('express');
var { body } = require('express-validator')

const { errHandler } = require('../../../services/errValidator');
const { addExperience, updateExperience, removeExperience } = require('../../../services/userServices/experience');

var router = express.Router();

/*  POST Route :- Adding Working Experience
    Req Body :- {desig: "...", company: "...", startDate: "...", endDate: "..."} 
    Res Body :- {msg: "...", success: true} , if Sucessfully Added
                {err: "...", success: false} , if Any Error Occurs */
router.post('/', [
    body('desig', 'company', 'startDate', 'endDate').notEmpty().withMessage('Fields Should Be Specified!!'),
], errHandler, addExperience)

/*  PUT Route :- Updating Educational Qualifications
    Req Body :- {desig: "...", company: "...", startDate: "...", "index": 0,1...} 
    Res Body :- {msg: "...", success: true} , if Sucessfully Updated
                {err: "...", success: false} , if Any Error Occurs */
router.put('/', [
    body('desig', 'company', 'startDate', 'index').notEmpty().withMessage('Fields Should Be Specified!!'),
], errHandler, updateExperience)


/*  DELETE Route :- Removing Educational Qualifications
    Req Body :- {desig: "...", company: "...", startDate: "...", endDate: "..."}
    Res Body :- {msg: "...", success: true} , if Sucessfully Removed
                {err: "...", success: false} , if Any Error Occurs */
router.delete('/', [
    body('desig', 'company', 'startDate', 'endDate').notEmpty().withMessage('Fields Should Be Specified!!'),
], errHandler, removeExperience)

module.exports = router;