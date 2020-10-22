// Base URL :- http://localhost:8000/company/me

var express = require('express');

const { isSignedIn, isVerified } = require('../../../middleware');
const { detailUpdate, logoUpdate } = require('../../../services/companyServices/detail');
const {companyLogoStore} = require('../../../config/multerStore')

var router = express.Router()

/*  PUT Route :- Updating OR Changing Company Details
    Req Body :- {desc, hq, size, webLink}  OPTIONAL 
    Res Body :- {msg: "...", success: true} , if Sucessfully Updated
                {err: "...", success: false} , if Any Error Occurs */
router.put('/details', isSignedIn, isVerified, detailUpdate)

/*  PUT Route :- Updating Logo Of Company
    Req Body :- {logo: file} in form-data format
    Res Body :- {msg: "...", success: true} , if Sucessfully Updated
                {err: "...", success: false} , if Any Error Occurs  */
router.put('/logo', isSignedIn, isVerified, companyLogoStore.single('logo'), logoUpdate)

module.exports = router;