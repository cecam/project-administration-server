const express = require('express')
const { check } = require('express-validator')
const router = express.Router()
const userController = require('../controllers/userController')

//Create User
router.post('/', 
    [
       check('name', 'The name is required').not().isEmpty(),
       check('email', 'Write a valid email').isEmail(),
       check('password', 'The password have to be at least 6 characters long').isLength({min: 6}) 
    ],userController.createUser)

module.exports = router