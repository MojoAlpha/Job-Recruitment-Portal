// Base URL :- http://localhost:8000/s

var express = require('express');
var bodyParser = require('body-parser')

var searchString = require('../../services/searchServices/search')

var searchRouter = express.Router();
searchRouter.use(bodyParser.json())

searchRouter.get('/', async(req, res) => {
    var userResult = await searchString.searchUser(req.query.search)
    var companyResult = await searchString.searchCompany(req.query.search)

    res.status(200).json({users: userResult, companies: companyResult, success: true})
})

searchRouter.get('/skill', async(req, res) => {
    console.log(req.query.search.toString())
    var skillResult = await searchString.searchSkill(req.query.search.toString())
    res.status(200).json({skills: skillResult, success: true})
})

module.exports = searchRouter;