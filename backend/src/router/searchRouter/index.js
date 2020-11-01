// Base URL :- http://localhost:8000/s

var express = require('express');
var bodyParser = require('body-parser')

var searchString = require('../../services/searchServices/search')

var searchRouter = express.Router();
searchRouter.use(bodyParser.json())

/*  GET Route :- Main Search Route Returning The Search Results Of User, Company, Skill
    Res Body :- {users: [{}], companies: [{}], skills: [{}], success: true}
                {err: "...", success: false} , if Any Error Occurs */
searchRouter.get('/', async (req, res) => {
    var userResult = await searchString.searchUser(req.query.search)
    var companyResult = await searchString.searchCompany(req.query.search)
    var skillResult = await searchString.searchSkill(req.query.search)
    var vacancyResult = await searchString.searchVacancy(req.query.search)

    res.status(200).json({
        users: userResult,
        companies: companyResult,
        skills: skillResult,
        vacancies: vacancyResult,
        success: true
    })
})

/*  GET Route :- Returning The Results Of Searching In Skills Collection
    Res Body :- {skills: [{}], success: true}
                {err: "...", success: false} , if Any Error Occurs */
searchRouter.get('/skill', async (req, res) => {
    var skillResult = await searchString.searchSkill(req.query.search.toString())

    res.status(200).json({
        skills: skillResult,
        success: true
    })
})

searchRouter.get('/skill/:skillId', async (req, res) => {
    var skillVacancy = await searchString.skillVacancy(req.params.skillId)

    res.status(200).json({
        vacancies: skillVacancy,
        success: true
    })
})

module.exports = searchRouter;