// Base URL :- http://localhost:8000/posts

var express = require('express');
const { getPosts } = require('../../../services/postServices/posts');

var router = express.Router();

/*  GET Route :- Getting The Post Of The User With UserID
    Res Body :- {msg: "...", success: true, token, type} , if Sucessful Registered
                {err: "...", success: false} , if Any Error Occurs */
router.get('/:userId', getPosts)

module.exports = router;