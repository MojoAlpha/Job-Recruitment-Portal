// Base URL :- http://localhost:8000/user/me/link

var express = require('express');
var { body } = require('express-validator')

const { errHandler } = require('../../../services/errValidator');
const { addLink, removeLink, updateLink } = require('../../../services/userServices/link');

var router = express.Router();

/*  POST Route :- Adding Important Links, such as gitHub etc.
    Req Body :- {title: "...", url: "..."} 
    Res Body :- {msg: "...", success: true} , if Sucessfully Added
                {err: "...", success: false} , if Any Error Occurs */
router.post('/', [
    body('title', 'url').notEmpty().withMessage('Title Should Be Specified!!'),
], errHandler, addLink)

/*  PUT Route :- Updating Important Links, such as gitHub etc.
    Req Body :- {title: "...", url: "...", index: 0,1..} 
    Res Body :- {msg: "...", success: true} , if Sucessfully Updated
                {err: "...", success: false} , if Any Error Occurs */
router.put('/', [
    body('title', 'url', 'index').notEmpty().withMessage('Fields Should Not Be Empty')
], errHandler, updateLink)

/*  DELETE Route :- Removing Unwanted Links
    Req Body :- {"index": 0,1...}
    Res Body :- {msg: "...", success: true} , if Sucessfully Removed
                {err: "...", success: false} , if Any Error Occurs */
router.delete('/', [
    body('title', 'url').notEmpty().withMessage('Title Should Be Specified!!'),
], errHandler, removeLink)

module.exports = router;