// Base URL :- http://localhost:8000/company

var express = require('express');

const { companyDetails, 
        companyFollow, 
        companyUnfollow } = require('../../../services/companyServices/company');

var router = express.Router()

/*  GET Route :- Basic Details Of Logged Company
    Res Body :- {CompanyDetails} */
router.get('/me',   (req, res) => res.json(req.root))

/*  GET Route :- All The Main Details Of A Company
    Res Body :- {CompanyDetails} */
router.get('/:companyId', companyDetails)

/*  POST Route :- Follow A Company
    Res Body :- {msg: ..., success: true} , if Successfully Followed
             :- {err: ..., success: false} , if Any Error Occurs */
router.post('/follow/:companyId', companyFollow)

/*  DELETE Route :- Unfollow A Company
    Res Body :- {msg: ..., success: true} , if Successfully UnFollowed
             :- {err: ..., success: false} , if Any Error Occurs */
router.delete('/follow/:companyId', companyUnfollow)

module.exports = router;