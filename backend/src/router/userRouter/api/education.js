var express = require('express');
var { body } = require('express-validator')

const { addEducationalQual, removeEducationalQual } = require('../../../services/userServices/education');
const { userErrors } = require('../../../services/userServices/errHandler');

var router = express.Router();

/*  POST Route :- Adding Educational Qualifications
    Req Body :- {degree: "...", insti: "...", year: "..."} 
    Res Body :- {msg: "...", success: true} , if Sucessfully Added
                {err: "...", success: false} , if Any Error Occurs */
router.post('/', [
    body('degree').notEmpty().withMessage('Degree Should Be Specified!!'),
    body('insti').notEmpty().withMessage('Institution Should Be Specified!!'),
    body('year').notEmpty().withMessage('Year Should Be Specified!!')
], userErrors, addEducationalQual)

/*  DELETE Route :- Removing Educational Qualifications
    Req Body :- {degree: "...", insti: "...", year: "..."}
    Res Body :- {msg: "...", success: true} , if Sucessfully Removed
                {err: "...", success: false} , if Any Error Occurs */
router.delete('/', [
    body('degree').notEmpty().withMessage('Degree Should Be Specified!!'),
    body('insti').notEmpty().withMessage('Institution Should Be Specified!!'),
    body('year').notEmpty().withMessage('Year Should Be Specified!!')
], userErrors, removeEducationalQual)

module.exports = router;