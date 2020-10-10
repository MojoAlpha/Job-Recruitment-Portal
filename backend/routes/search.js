var express = require('express')
var bodyParser = require('body-parser')
var { isSignedIn, isVerified } = require('../middleware')
var {skillSearch, mainSearch} = require('../controllers/search')

var searchRouter = express.Router();
searchRouter.use(bodyParser.json())

searchRouter.get('/skill', isSignedIn, isVerified, skillSearch)

searchRouter.get('/all', mainSearch)

module.exports = searchRouter;