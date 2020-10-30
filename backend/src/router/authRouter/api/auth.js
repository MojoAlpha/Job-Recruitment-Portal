// Base URL :- http://localhost:8000/auth

var express = require('express');
const { body } = require('express-validator');
const { UserSignup,
        CompanySignup } = require('../../../services/authServices/signup');
const { UserLogin,
        CompanyLogin } = require('../../../services/authServices/login');
const { errHandler,
        emailExists,
        emailNotExists } = require('../../../services/errValidator');

var router = express.Router();

/*  POST Route :- SignUp Route For User & Company --> U - User; C - Company
    Req Body :- {email, name, password, type}
    Res Body :- {msg: "...", success: true} , if Sucessful Registered
                {err: "...", success: false} , if Any Error Occurs */
router.post('/signup', [
    [
        body('type', 'name', 'email', 'password').notEmpty().withMessage('Invalid Signup Request. Specify The Type!!'),
        body('type').isIn(["U", "C"]).withMessage('Invalid Type Of Account!!'),
        body('email').isEmail().withMessage('Invalid Email!!'),
        body('password').isLength({
            min: 8,
            max: 20
        }).withMessage('Password should be 8-20 Characters!!')
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]{8,20}$/)
        .withMessage('Password must contain alphabets, numbers & symbols!!')
        // Checks On Validity Of Body Fields
    ]
], errHandler, emailExists, UserSignup, CompanySignup)

/*  POST Route :- Login Route For User
    Req Body :- {email,  password}
    Res Body :- {msg: "...", success: true, token, type} , if Sucessful Registered
                {err: "...", success: false} , if Any Error Occurs */
router.post('/login', [
    body('email', 'password').notEmpty().withMessage('Email Cannot Be Empty!!'),
], errHandler, emailNotExists, UserLogin, CompanyLogin)

module.exports = router;