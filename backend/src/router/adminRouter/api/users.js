// Base URL :- http://localhost:8000/admin/users

var express = require('express')
const { getUsers, 
        deleteUser, 
        getUser } = require('../../../services/adminServices/users')
var router = express.Router()

/*  GET Route :- Get List Of All The Users
    Res Body :- {users: [{}], success: true} , if Sucessfully Verfied
                {err: "...", success: false} , if Any Error Occurs */
router.get('/', getUsers)

/*  GET Route :- Get All Details Of A User
    Res Body :- {{Object}, success: true} , if Sucessfully Verfied
                {err: "...", success: false} , if Any Error Occurs */
router.get('/:userId', getUser)

/*  DELETE Route :- Delete A User
    Res Body :- {msg: "...", success: true} , if Sucessfully Deleted
                {err: "...", success: false} , if Any Error Occurs */
router.delete('/:userId', deleteUser)

module.exports = router;