// Base URL :- http://localhost:8000/user/chat

var express = require('express')
const { userChats, allChats } = require('../../../services/userServices/chat')

var router = express.Router()

router.get('/me', allChats)

router.get('/:userId', userChats)

module.exports = router