var express = require('express');
var { body } = require('express-validator')

const { isSignedIn, isVerified } = require('../../../middleware');
const { userErrors } = require('../../../services/userServices/errHandler');
const { addLink, removeLink } = require('../../../services/userServices/link');

var router = express.Router();

/*  POST Route :- Adding Important Links, such as gitHub etc.
    Req Body :- {title: "...", url: "..."} 
    Res Body :- {msg: "...", success: true} , if Sucessfully Added
                {err: "...", success: false} , if Any Error Occurs */
router.post('/', isSignedIn, isVerified, [
    body('title').notEmpty().withMessage('Title Should Be Specified!!'),
    body('url').notEmpty().withMessage('Link URL Should Be Specified!!')
], userErrors, addLink)

/*  DELETE Route :- Removing Unwanted Links
    Req Body :- {title: "...", url: "..."}
    Res Body :- {msg: "...", success: true} , if Sucessfully Removed
                {err: "...", success: false} , if Any Error Occurs */
router.delete('/', isSignedIn, isVerified, [
    body('title').notEmpty().withMessage('Title Should Be Specified!!'),
    body('url').notEmpty().withMessage('Link URL Should Be Specified!!')
], userErrors, removeLink)

module.exports = router;