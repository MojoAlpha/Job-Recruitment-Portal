var express = require('express')
const { getUsers, deleteUser } = require('../../../services/adminServices/users')
var router = express.Router()

router.get('/', getUsers)

router.delete('/:userId', deleteUser)

module.exports = router