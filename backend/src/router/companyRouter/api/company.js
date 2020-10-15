var express = require('express');

const { isSignedIn, isVerified } = require('../../../middleware');
const { companyDetails, companyFollow, companyUnfollow } = require('../../../services/companyServices/company');

var router = express.Router()

/*  GET Route :- Basic Details Of Logged Company
    Res Body :- {CompanyDetails} */
router.get('/me', isSignedIn, isVerified, (req, res) => res.json(req.root))

/*  GET Route :- All The Main Details Of A Company
    Res Body :- {CompanyDetails} */
router.get('/:companyId', isSignedIn, isVerified, companyDetails)

/*  POST Route :- Follow A Company
    Res Body :- {msg: ..., success: true} , if Successfully Followed
             :- {err: ..., success: false} , if Any Error Occurs */
router.post('/:companyId', isSignedIn, isVerified, companyFollow)

/*  DELETE Route :- Unfollow A Company
    Res Body :- {msg: ..., success: true} , if Successfully Followed
             :- {err: ..., success: false} , if Any Error Occurs */
router.delete('/:companyId', isSignedIn, isVerified, companyUnfollow)

module.exports = router;