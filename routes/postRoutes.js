const express = require('express');
const router = express.Router();
const {getAllPosts,AddPost,DeletePost}= require('../controllers/postControllers');

const {validateToken}=require('../middleware/auth')

router.get('/', getAllPosts);

router.post('/addpost', validateToken,AddPost);

router.post('/deletepost', validateToken,DeletePost);

module.exports = router;