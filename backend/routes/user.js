var express = require('express');
var bodyParser = require('body-parser')
var { userDpStore } = require('../config/multerStore')
const {body} = require('express-validator')
const { isSignedIn, isVerified } = require('../middleware');
const {userDetails, chngProfilePicture, chngPassword, updateDetails, addLink, removeLink, addSkill, removeSKill, addEducation, removeEducation} = require('../controllers/user');

var userRouter = express.Router();
userRouter.use(bodyParser.json());

/*  GET Route :- User details For User Profile Section
    Res Body :- {UserDetails} */
userRouter.get('/me', isSignedIn, isVerified, userDetails)

/*  PUT Route :- Updating Profile Picture Of User
    Req Body :- {dp: file} in form-data format
    Res Body :- {msg: "...", success: true} , if Sucessfully Updated
                {err: "...", success: false} , if Any Error Occurs  */
userRouter.put('/me/dp/edit', isSignedIn, isVerified, userDpStore.single('dp'), chngProfilePicture);

/*  PUT Route :- Changing User Password
    Req Body :- {currPassword, newPassword} 
    Res Body :- {msg: "...", success: true} , if Sucessfully Updated
                {err: "...", success: false} , if Any Error Occurs Or invalid format of newPassword */
userRouter.put('/me/password/edit', isSignedIn, isVerified, [
    body('newPassword').isLength({min: 8}).withMessage('Password should be greater than equal to 8')
                        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/).withMessage('Password must contain alphabets & numbers')
                ], chngPassword)

/*  PUT Route :- Updating OR Changing User Details
    Req Body :- {name, bio, addr, phone}  OPTIONAL 
    Res Body :- {msg: "...", success: true} , if Sucessfully Updated
                {err: "...", success: false} , if Any Error Occurs */
userRouter.put('/me/edit', isSignedIn, isVerified, updateDetails)

/*  POST Route :- Adding Important Links, such as gitHub etc.
    Req Body :- {link: {title: "...", link: "..."}} 
    Res Body :- {msg: "...", success: true} , if Sucessfully Added
                {err: "...", success: false} , if Any Error Occurs */
userRouter.post('/me/link', isSignedIn, isVerified, addLink)

/*  PUT Route :- Removing Unwanted Links
    Req Body :- {link: {title: "...", link: "..."}} 
    Res Body :- {msg: "...", success: true} , if Sucessfully Removed
                {err: "...", success: false} , if Any Error Occurs */
userRouter.put('/me/link', isSignedIn, isVerified, removeLink)

/*  POST Route :- Adding Important Skills, such as Java, React etc.
    Req Body :- {skillNm: "..."} 
    Res Body :- {msg: "...", success: true} , if Sucessfully Added
                {err: "...", success: false} , if Any Error Occurs */
userRouter.post('/me/skill', isSignedIn, isVerified, addSkill)

/*  PUT Route :- Removing Links
    Req Body :- {skillNm: "..."} 
    Res Body :- {msg: "...", success: true} , if Sucessfully Removed
                {err: "...", success: false} , if Any Error Occurs */
userRouter.put('/me/skill', isSignedIn, isVerified, removeSKill)

/*  POST Route :- Adding Educational Qualifications
    Req Body :- {edu: {degree: "...", insti: "...", year: "..."}} 
    Res Body :- {msg: "...", success: true} , if Sucessfully Added
                {err: "...", success: false} , if Any Error Occurs */
userRouter.post('/me/edu', isSignedIn, isVerified, addEducation);

/*  PUT Route :- Removing Educational Qualifications
    Req Body :- {edu: {degree: "...", insti: "...", year: "..."}}
    Res Body :- {msg: "...", success: true} , if Sucessfully Removed
                {err: "...", success: false} , if Any Error Occurs */
userRouter.put('/me/edu', isSignedIn, isVerified, removeEducation);

module.exports = userRouter;