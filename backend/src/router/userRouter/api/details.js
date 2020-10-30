// Base URL :- http://localhost:8000/user/me

var express = require('express');
var { body } = require('express-validator')

const { detailUpdate, 
        passwdUpdate, 
        dpUpdate } = require('../../../services/userServices/detail');
const { errHandler } = require('../../../services/errValidator');
const { userDpStore } = require('../../../config/multerStore')

var router = express.Router();

/*  PUT Route :- Updating OR Changing User Details
    Req Body :- {name, bio, addr, phone}  OPTIONAL 
    Res Body :- {msg: "...", success: true} , if Sucessfully Updated
                {err: "...", success: false} , if Any Error Occurs */
router.put('/details', detailUpdate)

/*  PUT Route :- Changing User Password
    Req Body :- {currPassword, newPassword} 
    Res Body :- {msg: "...", success: true} , if Sucessfully Updated
                {err: "...", success: false} , if Any Error Occurs Or invalid format of newPassword */
router.put('/password', [
    body('currPassword').notEmpty().withMessage('Current Password Should Be Preovided!'),
    body('newPassword').isLength({min: 8, max: 20}).withMessage('Size Of Password Should Be Between 8-20 Letters')
                        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&_-]/).withMessage('Password must contain alphabets & numbers')
], errHandler, passwdUpdate)

/*  PUT Route :- Updating Profile Picture Of User
    Req Body :- {dp: file} in form-data format
    Res Body :- {msg: "...", success: true} , if Sucessfully Updated
                {err: "...", success: false} , if Any Error Occurs  */
router.put('/dp', userDpStore.single('dp'), dpUpdate)

module.exports = router;