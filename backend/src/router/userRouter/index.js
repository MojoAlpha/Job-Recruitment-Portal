// Base URL :- http://localhost:8000/user

var express = require('express');
var bodyParser = require('body-parser')

var users = require('./api/user')
var userDetails = require('./api/details')
var links = require('./api/links');
var education = require('./api/education')
var experience = require('./api/experience')
var skill = require('./api/skill');
var connect = require('./api/connection')

const { isSignedIn, isVerified } = require('../../middleware');

var userRouter = express.Router();
userRouter.use(bodyParser.json())

userRouter.use('/', users)
userRouter.use('/connect', isSignedIn, isVerified, connect)
userRouter.use('/me', isSignedIn, isVerified, userDetails)
userRouter.use('/me/link', isSignedIn, isVerified, links)
userRouter.use('/me/edu', isSignedIn, isVerified, education)
userRouter.use('/me/exp', isSignedIn, isVerified, experience)
userRouter.use('/me/skill', isSignedIn, isVerified, skill)

module.exports = userRouter;