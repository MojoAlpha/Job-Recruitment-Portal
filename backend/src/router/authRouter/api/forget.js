var express = require('express');
const { param, body } = require('express-validator');
const { errHandler, emailNotExists } = require('../../../services/errValidator');
const { userForget, companyForget, userPassReset, companyPassReset } = require('../../../services/authServices/forget');

var router = express.Router();

/*  POST Route :- Forget Password Email Verfication
    Req Body :- {email}
    Res Body :- {msg: "...", success: true} , if Sucessfully Verfied
                {err: "...", success: false} , if Any Error Occurs */
router.post('/', [
    body('email').notEmpty().withMessage('Email Should Not Be Empty!!')
], errHandler, emailNotExists, userForget, companyForget)

/*  PUT Route :- Resetting The Password
    Req Body :- {newPassword}
    Res Body :- {msg: "...", success: true} , if Sucessfully Reset
                {err: "...", success: false} , if Any Error Occurs */
router.put('/:type/:token', [
    param('type').isIn(["U", "C"]).withMessage("Invalid Request!!"),
    body('newPassword').isLength({min: 8}).withMessage('Password should be 8-20 Characters!')
                       .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]{8,20}$/)
                       .withMessage('Password must contain alphabets, numbers & symbols')
], errHandler, userPassReset, companyPassReset)

module.exports = router;