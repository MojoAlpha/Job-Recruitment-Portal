var express = require('express');
var bodyParser = require('body-parser')

var posts = require('./api/post');
const { isSignedIn, isVerified } = require('../../middleware');

var postsRouter = express.Router();
postsRouter.use(bodyParser.json())

postsRouter.use('/', isSignedIn, isVerified, posts);

module.exports = postsRouter;