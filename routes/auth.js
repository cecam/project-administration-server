const express = require('express')
const { check } = require('express-validator')
const router = express.Router()
const authController = require('../controllers/authController')
const auth = require('../middleware/auth')

//Login User
router.post('/', 
    [
       check('email', 'Write a valid email').isEmail(),
       check('password', 'The password have to be at least 6 characters long').isLength({min: 6}) 
    ],authController.authenticateUser
)
router.get('/',
    auth,
    authController.authenticatedUser
)

module.exports = router