var express = require('express');
var bodyParser = require('body-parser');
var { createSkill, deleteSkill, listSkill } = require('../controllers/skill');
const skill = require('../models/skill');

var skillRouter = express.Router();
skillRouter.use(bodyParser.json());

skillRouter.get('/all', listSkill)

skillRouter.post('/add', createSkill)

skillRouter.delete('/delete', deleteSkill)

module.exports = skillRouter;