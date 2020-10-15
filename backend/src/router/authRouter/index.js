var express = require('express');
var bodyParser = require('body-parser')

var auth = require('./api/auth')
var verify = require('./api/verify')
var forget = require('./api/forget')

var authRouter = express.Router();
authRouter.use(bodyParser.json())

authRouter.use('/', auth);
authRouter.use('/verify', verify)
authRouter.use('/forget', forget)

module.exports = authRouter;