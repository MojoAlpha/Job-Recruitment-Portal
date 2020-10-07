var express = require('express');
var bodyParser = require('body-parser')
const { body } = require('express-validator')
var { Signup, Login, Verfication, ForgetVerify, ForgetReset, resendVerify } = require('../controllers/auth');

var authRouter = express.Router();
authRouter.use(bodyParser.json());

// USER AUTH ROUTES
// type :- "U" - Normal User
//         "C" - Company User

/*  POST Route :- User SignUp
    Req Body :- {email, name, password, type}
    Res Body :- {msg: "...", success: true, email} , if Sucessful Registered
                {err: "...", success: false} , if Any Error Occurs */
authRouter.post('/signup', [
    body('type').notEmpty().withMessage('Invalid Signup Request. Specify The Type!!'),
    body('name').notEmpty().withMessage("Name Shouldn't Be Kept Empty!!"),
    body('email').isEmail().withMessage('Invalid Email!!'),
    body('password').isLength({min: 8, max: 20}).withMessage('Password should be greater than equal to 8!!')
                    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]{8,}$/)
                    .withMessage('Password must contain alphabets, numbers & symbols!!')
], Signup)      // Checks on Password & Email of the user

/*  PUT Route :- Verify User After SignUp
    Res Body :- {msg: "...", success: true} , if Sucessfully Verfied
                {err: "...", success: false} , if Any Error Occurs */
authRouter.put('/verify/:type/:token', Verfication)

authRouter.post('/login', Login)

/*  PUT Route :- Forget Password Email Verificaiton
    Req Body :- {email}
    Res Body :- {msg: "...", success: true} , if Sucessfully Sent
                {err: "...", success: false} , if Any Error Occurs */
authRouter.put('/forget', ForgetVerify)

/*  PUT Route :- Resetting The Password
    Req Body :- {newPassword}
    Res Body :- {msg: "...", success: true, token: authToken} , if Sucessfully Reset
                {err: "...", success: false} , if Any Error Occurs */
authRouter.put('/forget/:type/:token', [
    body('newPassword').isLength({min: 8}).withMessage('Password should be greater than equal to 8')
                       .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]{8,}$/)
                       .withMessage('Password must contain alphabets, numbers & symbols')
], ForgetReset)

authRouter.get('/verify/resend', resendVerify)

module.exports = authRouter;