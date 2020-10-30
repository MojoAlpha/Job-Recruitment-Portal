// Base URL :- http://localhost:8000/user/me/f/

var express = require('express');
const { appliedVacancy, 
        getUserFeed, 
        suggestedVacancy } = require('../../../services/userServices/feed');
var router = express.Router();

/*  GET Route :- Getting The User Feed Posts, Depending On The Posting Date & User Connections
    Res Body :- {feedPosts: [{}], success: true} , if Sucessful Registered
                {err: "...", success: false} , if Any Error Occurs */
router.get('/', getUserFeed)

/*  GET Route :- Get The List Of Previously Applied Vacancies
    Res Body :- {vacList: [{}], success: true} , if Sucessful Registered
                {err: "...", success: false} , if Any Error Occurs */
router.get('/applied', appliedVacancy)

/*  GET Route :- Suggested Job Vacancies
    Res Body :- {suggestedVacancy: [{}], success: true} , if Sucessful Registered
                {err: "...", success: false} , if Any Error Occurs */
router.get('/suggested', suggestedVacancy)

module.exports = router;