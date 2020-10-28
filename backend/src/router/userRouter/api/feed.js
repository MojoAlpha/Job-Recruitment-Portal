// Base URL :- http://localhost:8000/user/me/f/

var express = require('express');
const { appliedVacancy } = require('../../../services/userServices/feed');
var router = express.Router();

router.get('/applied', appliedVacancy)

module.exports = router;