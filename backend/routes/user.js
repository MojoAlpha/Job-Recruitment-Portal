var express = require('express');
var bodyParser = require('body-parser')
var { userDpStore } = require('../config/multerStore')
const {body} = require('express-validator')
const { isSignedIn, isVerified } = require('../controllers/auth');
const {userDetails, chngProfilePicture, chngPassword, updateDetails, addLink, deleteLink} = require('../controllers/user');

var userRouter = express.Router();
userRouter.use(bodyParser.json());

/*  GET Route :- User details For User Profile Section
    Res Body :- {UserDetails} */
userRouter.get('/details/me', isSignedIn, isVerified, userDetails)

/*  PUT Route :- Updating Profile Picture Of User
    Req Body :- {dp: file} in form-data format
    Res Body :- {msg: "...", success: true} , if Sucessfully Updated
                {err: "...", success: false} , if Any Error Occurs  */
userRouter.put('/details/dp/edit', isSignedIn, isVerified, userDpStore.single('dp'), chngProfilePicture);

/*  PUT Route :- Changing User Password
    Req Body :- {currPassword, newPassword} 
    Res Body :- {msg: "...", success: true} , if Sucessfully Updated
                {err: "...", success: false} , if Any Error Occurs Or invalid format of newPassword */
userRouter.put('/details/password/edit', isSignedIn, isVerified, [
    body('newPassword').isLength({min: 8}).withMessage('Password should be greater than equal to 8')
                        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/).withMessage('Password must contain alphabets, numbers & symbols')
                ], chngPassword)

/*  PUT Route :- Updating OR Changing User Details
    Req Body :- {name, bio, addr, phone}  OPTIONAL 
    Res Body :- {msg: "...", success: true} , if Sucessfully Updated
                {err: "...", success: false} , if Any Error Occurs */
userRouter.put('/details/me/edit', isSignedIn, isVerified, updateDetails)

/*  POST Route :- Adding Important Links, such as gitHub etc.
    Req Body :- {link: {title: "...", link: "..."}} 
    Res Body :- {msg: "...", success: true} , if Sucessfully Updated
                {err: "...", success: false} , if Any Error Occurs */
userRouter.post('/details/link', isSignedIn, isVerified, addLink)

/*  DELETE Route :- Deleting Unwanted Links
    Req Body :- {link: {title: "...", link: "..."}} 
    Res Body :- {msg: "...", success: true} , if Sucessfully Updated
                {err: "...", success: false} , if Any Error Occurs */
userRouter.delete('/details/link', isSignedIn, isVerified, deleteLink)

module.exports = userRouter;