var express = require('express')
var bodyParser = require('body-parser')
var {skillSearch, mainSearch} = require('../controllers/search')

var searchRouter = express.Router();
searchRouter.use(bodyParser.json())

/*  GET Route :- Get List Corresponding To Your Query
    Req :- Query Params -- search
    Res Body :- {skills, success: true} */
searchRouter.get('/skill', skillSearch)

/*  GET Route :- Get Users & Companies List Corresponding To Your Query
    Req :- Query Params -- search
    Res Body :- {users, companies, success: true} */
searchRouter.get('/all', mainSearch)

module.exports = searchRouter;