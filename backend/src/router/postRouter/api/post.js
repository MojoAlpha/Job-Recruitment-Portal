var express = require('express');
const { postStore } = require('../../../config/multerStore')
const { createPost, getPosts } = require('../../../services/postServices/posts');

var router = express.Router();

/*  POST Route :- SignUp Route For User & Company --> U - User; C - Company
    Req Body :- {email, name, password, type}
    Res Body :- {msg: "...", success: true} , if Sucessful Registered
                {err: "...", success: false} , if Any Error Occurs */
router.post('/', postStore.single('postImg'), createPost)

router.get('/:userId', getPosts)
/*  POST Route :- Login Route For User & Company --> U - User; C - Company
    Req Body :- {email,  password}
    Res Body :- {msg: "...", success: true, token, type} , if Sucessful Registered
                {err: "...", success: false} , if Any Error Occurs */

module.exports = router;