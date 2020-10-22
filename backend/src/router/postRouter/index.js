// Base URL :- http://localhost:8000/posts

var express = require('express');
var bodyParser = require('body-parser')

var basic = require('./api/basic');
var posts = require('./api/posts')
const { isSignedIn, isVerified } = require('../../middleware');

var postsRouter = express.Router();
postsRouter.use(bodyParser.json())

postsRouter.use('/', isSignedIn, isVerified, basic);
postsRouter.use('/', isSignedIn, isVerified, posts);

module.exports = postsRouter;