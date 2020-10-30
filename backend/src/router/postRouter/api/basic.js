// Base URL :- http://localhost:8000/posts

var express = require('express');
const { postStore } = require('../../../config/multerStore')
const { createPost, 
        updatePost, 
        deletePost } = require('../../../services/postServices/basic');

var router = express.Router();

/*  POST Route :- Creating A Post
    Req Body :- { desc, links[], postImg:{file object} }, OPTIONAL
    Res Body :- {msg: "...", success: true} , if Sucessful Created
                {err: "...", success: false} , if Any Error Occurs */
router.post('/', postStore.single('postImg'), createPost)

/*  PUT Route :- Updating A Post
    Req Body :- { desc, links[], postImg:{file object} }, OPTIONAL
    Res Body :- {msg: "...", success: true} , if Sucessful Updated
                {err: "...", success: false} , if Any Error Occurs */
router.put('/:postId', postStore.single('postImg'), updatePost)

/*  DELETE Route :- Deleting A Post
    Res Body :- {msg: "...", success: true} , if Sucessful Deleted
                {err: "...", success: false} , if Any Error Occurs */
router.delete('/:postId', deletePost)

module.exports = router;