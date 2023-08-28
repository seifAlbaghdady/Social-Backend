const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const dotenv = require('dotenv').config();

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    if ((req.headers.authorization || req.headers.Authorization) && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.sendStatus(401);
        }
    }
    if (!token) {
        res.sendStatus(401);
    }
});

module.exports = validateToken;