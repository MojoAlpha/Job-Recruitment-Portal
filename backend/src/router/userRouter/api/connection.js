var express = require('express')
const { connectionReq } = require('../../../services/NotfiyServices/userNotify')
const { sendConnectReq, acceptConnectReq, declineConnectReq } = require('../../../services/userServices/connection')

var router = express.Router()

/*  POST Route :- Send A Connection Request
    Res Body :- {msg: ..., success: true} , if Successfully Followed
             :- {err: ..., success: false} , if Any Error Occurs */
router.post('/:userId', sendConnectReq, connectionReq)

/*  POST Route :- Accept A Connection Request
    Res Body :- {msg: ..., success: true} , if Successfully Followed
             :- {err: ..., success: false} , if Any Error Occurs */
router.post('/accept/:userId', acceptConnectReq)

/*  DELETE Route :- Decline A Connection Request
    Res Body :- {msg: ..., success: true} , if Successfully Followed
             :- {err: ..., success: false} , if Any Error Occurs */
router.delete('/decline/:userId', declineConnectReq)

module.exports = router