const express = require('express')
const { route } = require('./users')
const router = express.Router()
const { check } = require('express-validator')
const projectController = require('../controllers/projectController')
const auth = require('../middleware/auth')

router.post('/', 
    auth,
    [
        check('name', 'The project name is required').not().isEmpty()
    ],
    projectController.createProject
)

router.get('/',
    auth,
    projectController.getProjects
)

router.put('/:id',
    auth,
    [
        check('name', 'The project name is required').not().isEmpty()
    ],
    projectController.updateProject
)

router.delete('/:id',
    auth,
    projectController.deleteProject
)

module.exports = router