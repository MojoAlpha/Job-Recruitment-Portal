var Skill = require('../../models/skill')
var express = require('express');
var bodyParser = require('body-parser')
var fs = require('fs')

var adminRouter = express.Router();
adminRouter.use(bodyParser.json())

adminRouter.get('/skill', (req, res) => {
    Skill.find()
    .then((data) => {
        fs.writeFile('./list.json', JSON.stringify(data, null, 2), (err) => {
            console.log(err)
        })
    }, (err) => console.log(err))
})

module.exports = adminRouter;
