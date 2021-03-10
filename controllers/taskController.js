const Task = require('../models/Task')
const Project = require('../models/Project')
const { validationResult } = require('express-validator')

exports.createTask = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    try {
        const { project } = req.body
        const projectExist = await Project.findById(project)
        if(!projectExist) {
            res.status(404).json({ msg: 'Project not found'})
        }

        if(projectExist.creator.toString() !== req.user.id){
            return res.status(401).json({ msg: 'Unauthorized user'})
        }

        const task = new Task(req.body)
        await task.save()
        res.status(201).json({task})

    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Oops, there was an error'})
    }
}

exports.getTasks = async (req, res) => {
    try {
        const { project } = req.query
        const projectExist = await Project.findById(project)
        if(!projectExist) {
            res.status(404).json({ msg: 'Project not found'})
        }

        if(projectExist.creator.toString() !== req.user.id){
            return res.status(401).json({ msg: 'Unauthorized user'})
        }

        const tasks = await Task.find({ project: project })
        res.status(201).json({tasks})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Oops, there was an error'})
    }
}

exports.updateTask = async (req, res) => {
    try {
        const { project, name, status } = req.body
        let task = await Task.findById(req.params.id)
        if(!task) {
            res.status(404).json({ msg: 'Task not found'})
        }

        const projectExist = await Project.findById(project)
        if(projectExist.creator.toString() !== req.user.id){
            return res.status(401).json({ msg: 'Unauthorized user'})
        }

        const newTask = {}
        newTask.name = name
        newTask.status = status

        task = await Task.findByIdAndUpdate( req.params.id, newTask)
        res.status(201).json({task})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Oops, there was an error'})
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const { project } = req.query
        let task = await Task.findById(req.params.id)
        if(!task) {
            res.status(404).json({ msg: 'Task not found'})
        }

        const projectExist = await Project.findById(project)
        if(projectExist.creator.toString() !== req.user.id){
            return res.status(401).json({ msg: 'Unauthorized user'})
        }

        task = await Task.findByIdAndDelete( req.params.id)
        res.status(201).json({msg: 'Task deleted'})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Oops, there was an error'})
    }
}