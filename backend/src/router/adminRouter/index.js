var Skill = require('../../models/skill')
var express = require('express');
var bodyParser = require('body-parser')
var { body } = require('express-validator')
var fs = require('fs');
const { adminLogin } = require('../../services/adminServices/auth');
const { errHandler } = require('../../services/errValidator');
const { getUsers } = require('../../services/adminServices/users');
const { isVerified, isAdmin, isSignedIn } = require('../../middleware');

var adminRouter = express.Router();
adminRouter.use(bodyParser.json())

var users = require('./api/users')
var companies = require('./api/companies')

adminRouter.get('/skill', (req, res) => {
    Skill.find()
    .then((data) => {
        fs.writeFile('./list.json', JSON.stringify(data, null, 2), (err) => {
            console.log(err)
        })
    }, (err) => console.log(err))
})

adminRouter.post('/login', [
    body('username', 'password').notEmpty().withMessage('Fields Should Not Be Empty!')
], errHandler, adminLogin)

adminRouter.use('/users', isSignedIn, isVerified, isAdmin, users)

adminRouter.use('/companies', isSignedIn, isVerified, isAdmin, companies)

module.exports = adminRouter;
