var express = require('express');
var bodyParser = require('body-parser')
var jwt = require('jsonwebtoken')
var User = require('../models/user')
const {body, validationResult} = require('express-validator')
var keys = require('../config/keys');

var indexRouter = express.Router();
indexRouter.use(bodyParser.json())

indexRouter.post('/auth/login', [
  body('email').isEmail().withMessage('Invalid Email')
], (req, res) => {

  const error = validationResult(req)
  if(!error.isEmpty()) {
      return res.status(422).json({err: error, success: false})
  }

  User.findOne({email: req.body.email}, (err, user) => {
      if(err || !user) {
          return res.status(404).json({err: "Email isn't Registered!", success: false})
      }

      if(!user.authenticate(req.body.password)) {
          return res.status(403).json({err: "Email & Password Don't Match!!", success: false})
      }

      // jwt Token valid till 28 days after login
      const token = jwt.sign({_id: user._id, type: "U"}, keys.authKey, {expiresIn: 604800})
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.json({msg: 'Login Success!!', token: token, success: true})
  })
})

module.exports = indexRouter;
