// Base URL :- http://localhost:8000/user/me/skill

var express = require('express');
var { body } = require('express-validator')

const { errHandler } = require('../../../services/errValidator');
const { addSkill, removeSkill } = require('../../../services/userServices/skill');

var router = express.Router();

/*  POST Route :- Adding Important Skills, such as Java, React etc.
    Req Body :- {skillId} 
    Res Body :- {msg: "...", success: true} , if Sucessfully Added
                {err: "...", success: false} , if Any Error Occurs */
router.post('/', [
    body('skillId').notEmpty().withMessage('Skill Should Be Specified!!')
], errHandler, addSkill)

/*  DELETE Route :- Removing Skills
    Req Body :- {skillId}
    Res Body :- {msg: "...", success: true} , if Sucessfully Removed
                {err: "...", success: false} , if Any Error Occurs */
router.delete('/', [
    body('skillId').notEmpty().withMessage('Skill Should Be Specified!!')
], errHandler, removeSkill)

module.exports = router;