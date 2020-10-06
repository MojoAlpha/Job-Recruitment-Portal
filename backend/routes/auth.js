var express = require('express');
var bodyParser = require('body-parser')
const { body } = require('express-validator')
var { userSignup, userVerfication, userForgetVerify, userForgetReset } = require('../controllers/auth');

var authRouter = express.Router();
authRouter.use(bodyParser.json());

// USER AUTH ROUTES

/*  POST Route :- User SignUp
    Req Body :- {email, name, password}
    Res Body :- {msg: "...", success: true, email} , if Sucessful Registered
                {err: "...", success: false} , if Any Error Occurs */
authRouter.post('/user/signup', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min: 8}).withMessage('Password should be greater than equal to 8')
                    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/).withMessage('Password must contain alphabets, numbers & symbols')
], userSignup)      // Checks on Password & Email of the user

/*  PUT Route :- Verify User After SignUp
    Req Body :- {email}
    Res Body :- {msg: "...", success: true} , if Sucessfully Verfied
                {err: "...", success: false} , if Any Error Occurs */
authRouter.put('/user/verify/:token', userVerfication)

/*  PUT Route :- Forget Password Email Verificaiton
    Req Body :- {email}
    Res Body :- {msg: "...", success: true} , if Sucessfully Sent
                {err: "...", success: false} , if Any Error Occurs */
authRouter.put('/user/forget', userForgetVerify)

/*  PUT Route :- Resetting The Password
    Req Body :- {newPassword}
    Res Body :- {msg: "...", success: true, token: authToken} , if Sucessfully Reset
                {err: "...", success: false} , if Any Error Occurs */
authRouter.put('/user/forget/:token', [
    body('newPassword').isLength({min: 8}).withMessage('Password should be greater than equal to 8')
                       .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/).withMessage('Password must contain alphabets, numbers & symbols')
], userForgetReset)

module.exports = authRouter;