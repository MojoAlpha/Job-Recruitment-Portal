var express = require('express');
const { param } = require('express-validator');
const { authErrors } = require('../../../services/authServices/errHandler');
const { userVerification, companyVerification } = require('../../../services/authServices/verification');

var router = express.Router();

/*  PUT Route :- Verification After SignUp
    Res Body :- {msg: "...", success: true, token, type} , if Sucessfully Verfied
                {err: "...", success: false} , if Any Error Occurs */
router.put('/:type/:token',[
    param('type').isIn(["U", "C"]).withMessage("Invalid Request!!")
] , authErrors, userVerification, companyVerification)

module.exports = router;