var express = require('express');
var bodyParser = require('body-parser');
var { createSkill, deleteSkill, listSkill } = require('../controllers/skill');
var { isSignedIn, isVerified } = require('../middleware')

var skillRouter = express.Router();
skillRouter.use(bodyParser.json());

/*  GET Route :- Get All The Skills, Admin Route
    Req Body :- {skip} OPTIONAL
    Res Body :- {UserDetails} */
skillRouter.get('/all', isSignedIn, isVerified, listSkill)

/*  POST Route :- Creating New Skills, Admin Route
    Req Body :- {name} 
    Res Body :- {msg: "...", success: true} , if Sucessfully Created
                {err: "...", success: false} , if Any Error Occurs */
skillRouter.post('/create', isSignedIn, isVerified, createSkill)

/*  DELETE Route :- Deleting a Skill, Admin Route
    Req Body :- {skillId}
    Res Body :- {msg: "...", success: true}, if Successfully Deleted
                {msg: "...", success: false}, if Any Error Occurs */
skillRouter.delete('/delete', isSignedIn, isVerified, deleteSkill)

module.exports = skillRouter;