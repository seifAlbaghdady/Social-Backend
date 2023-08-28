const express = require('express');
const router = express.Router();

const{getAllUsers,SignUp,Login}=require('../controllers/userControllers')


router.get('/', getAllUsers);

router.post('/signup', SignUp);

router.post('/login', Login);

module.exports = router;