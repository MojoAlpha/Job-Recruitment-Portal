var express = require('express');
const { body }  = require('express-validator');
const { UserSignup, CompanySignup } = require('../../../services/authServices/signup');
const { authErrors, emailExists, emailNotExists } = require('../../../services/authServices/errHandler');
const { UserLogin, CompanyLogin } = require('../../../services/authServices/login');

var router = express.Router();

/*  POST Route :- SignUp Route For User & Company --> U - User; C - Company
    Req Body :- {email, name, password, type}
    Res Body :- {msg: "...", success: true} , if Sucessful Registered
                {err: "...", success: false} , if Any Error Occurs */
router.post('/signup', [
    [
        body('type').notEmpty().withMessage('Invalid Signup Request. Specify The Type!!'),
        body('type').isIn(["U", "C"]).withMessage('Invalid Type Of Account!!'),
        body('name').notEmpty().withMessage("Name Shouldn't Be Kept Empty!!"),
        body('email').isEmail().withMessage('Invalid Email!!'),
        body('password').isLength({min: 8, max: 20}).withMessage('Password should be 8-20 Characters!!')
                        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]{8,20}$/)
                        .withMessage('Password must contain alphabets, numbers & symbols!!')
                        // Checks On Validity Of Body Fields
    ]
], authErrors, emailExists, UserSignup, CompanySignup)

/*  POST Route :- Login Route For User & Company --> U - User; C - Company
    Req Body :- {email,  password}
    Res Body :- {msg: "...", success: true, token, type} , if Sucessful Registered
                {err: "...", success: false} , if Any Error Occurs */
router.post('/login', [
    body('email').notEmpty().withMessage('Email Cannot Be Empty!!'),
    body('password').notEmpty().withMessage('Password Cannot Be Empty!!')
], authErrors, emailNotExists, UserLogin, CompanyLogin)

module.exports = router;