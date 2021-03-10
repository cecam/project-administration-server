const express = require('express')
const { route } = require('./users')
const router = express.Router()
const { check } = require('express-validator')
const taskController = require('../controllers/taskController')
const auth = require('../middleware/auth')

router.post('/',
    auth,
    [
        check('name', 'The name is required').not().isEmpty(),
        check('project', 'The project is required').not().isEmpty()
    ],
    taskController.createTask
)

router.get('/',
    auth,
    taskController.getTasks
)

router.put('/:id',
    auth,
    taskController.updateTask
)

router.delete('/:id',
    auth,
    taskController.deleteTask
)

module.exports = router