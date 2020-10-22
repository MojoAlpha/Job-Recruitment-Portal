// Base URL :- http://localhost:8000/user

var express = require('express')

const { isSignedIn, isVerified } = require('../../../middleware')
const { extraUserDetails, userDetails, userConnect, userDisconnect, getNotifications } = require('../../../services/userServices/user')

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
router.get('/:userId/notifications', isSignedIn, isVerified, getNotifications)

/*  POST Route :- Connect A User
    Res Body :- {msg: ..., success: true} , if Successfully Followed
             :- {err: ..., success: false} , if Any Error Occurs */
router.post('/:userId', isSignedIn, isVerified, userConnect)

/*  DELETE Route :- Disconnect A User
    Res Body :- {msg: ..., success: true} , if Successfully Followed
             :- {err: ..., success: false} , if Any Error Occurs */
router.delete('/:userId', isSignedIn, isVerified, userDisconnect)

module.exports = router