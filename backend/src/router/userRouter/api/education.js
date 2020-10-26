// Base URL :- http://localhost:8000/user/me/edu

var express = require('express');
var { body } = require('express-validator')

const { addEducationalQual, removeEducationalQual, updateEducationalQual } = require('../../../services/userServices/education');
const { errHandler } = require('../../../services/errValidator');

var router = express.Router();

/*  POST Route :- Adding Educational Qualifications
    Req Body :- {degree: "...", insti: "...", year: "..."} 
    Res Body :- {msg: "...", success: true} , if Sucessfully Added
                {err: "...", success: false} , if Any Error Occurs */
router.post('/', [
    body('degree', 'insti', 'year').notEmpty().withMessage('Degree Should Be Specified!!'),
], errHandler, addEducationalQual)

/*  PUT Route :- Updating Educational Qualifications
    Req Body :- {degree: "...", insti: "...", year: "...", "index": 0,1...} 
    Res Body :- {msg: "...", success: true} , if Sucessfully Updated
                {err: "...", success: false} , if Any Error Occurs */
router.put('/', [
    body('degree', 'insti', 'year', 'index').notEmpty().withMessage('Degree Should Be Specified!!'),
], errHandler, updateEducationalQual)


/*  DELETE Route :- Removing Educational Qualifications
    Req Body :- {"index": 0,1...}
    Res Body :- {msg: "...", success: true} , if Sucessfully Removed
                {err: "...", success: false} , if Any Error Occurs */
router.delete('/', [
    body('degree', 'insti', 'year').notEmpty().withMessage('Degree Should Be Specified!!'),
], errHandler, removeEducationalQual)

module.exports = router;