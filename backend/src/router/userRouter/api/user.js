// Base URL :- http://localhost:8000/user

var express = require('express')

const { isSignedIn, isVerified } = require('../../../middleware')
const { extraUserDetails, userDetails, getNotifications } = require('../../../services/userServices/user')

var router = express.Router()

/*  GET Route :- Basic Details Of Logged User
    Res Body :- {UserDetails} */
router.get('/me', isSignedIn, isVerified, (req, res) => res.status(200).json(req.root))

/*  GET Route :- All The Main Details Of A User
    Res Body :- {UserDetails} */
router.get('/:userId', isSignedIn, isVerified, userDetails)

/*  GET Route :- Connection List & Followed List Of A User
    Res Body :- {connections, followed} */
router.get('/:userId/all', isSignedIn, isVerified, extraUserDetails)

/*  GET Route :- Get The Notifications Of The User
    Res Body :- {notificaitions} */
router.get('/me/notifications', isSignedIn, isVerified, getNotifications)

module.exports = router