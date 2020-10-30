// Base URL :- http://localhost:8000/verify

var express = require('express');
const { param } = require('express-validator');
const { errHandler } = require('../../../services/errValidator');
const { userVerification,
        companyVerification } = require('../../../services/authServices/verification');

var router = express.Router();

/*  PUT Route :- Verification After SignUp
    Res Body :- {msg: "...", success: true, token, type} , if Sucessfully Verfied
                {err: "...", success: false} , if Any Error Occurs */
router.put('/:type/:token', [
    param('type').isIn(["U", "C"]).withMessage("Invalid Request!!")
], errHandler, userVerification, companyVerification)

module.exports = router;