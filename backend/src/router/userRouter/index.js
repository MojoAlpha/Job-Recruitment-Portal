var express = require('express');
var bodyParser = require('body-parser')

var users = require('./api/user')
var userDetails = require('./api/details')
var links = require('./api/links');
var education = require('./api/education')
var skill = require('./api/skill');

var userRouter = express.Router();
userRouter.use(bodyParser.json())

userRouter.use('/', users)
userRouter.use('/me', userDetails)
userRouter.use('/me/link', links)
userRouter.use('/me/edu', education)
userRouter.use('/me/skill', skill)

module.exports = userRouter;