const express = require("express");
require('dotenv').config();

const userRouter = express.Router();
const userController = require('../controllers/user.controller');

// User routes

// User signup
userRouter.post('/signup', userController.signup); 

// User login
userRouter.post('/login', userController.login); 

module.exports = {
    userRouter
};
