const Project = require('../models/Project')
const { validationResult } = require('express-validator')

exports.createProject = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    try {
        const project = new Project(req.body)
        project.creator = req.user.id
        project.save()
        res.status(200).json(project)
    } catch(error) {
        console.log(error);
        res.status(500).json({msg: 'Oops, there was an error'})
    }
}

exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ creator: req.user.id }).sort({createdAt: -1})
        res.status(201).json({projects: projects})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Oops, there was an error'})
    }
}

exports.updateProject = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const { name } = req.body
    const newProject = {}
    if(name) {
        newProject.name = name
    }

    try {
        
        let project = await Project.findById(req.params.id)

        if(!project) {
            res.status(404).json({ msg: 'Project not found'})
        }

        if(project.creator.toString() !== req.user.id){
            return res.status(401).json({ msg: 'Unauthorized user'})
        }

        project = await Project.findByIdAndUpdate( req.params.id, newProject)

        res.status(201).json({project})

    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Oops, there was an error'})
    }
}

exports.deleteProject = async (req, res) => {
    try {
        let project = await Project.findById(req.params.id)

        if(!project) {
            res.status(404).json({ msg: 'Project not found'})
        }

        if(project.creator.toString() !== req.user.id){
            return res.status(401).json({ msg: 'Unauthorized user'})
        }

        project = await Project.findByIdAndDelete( req.params.id )

        res.status(201).json({msg: 'Project deleted'})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Oops, there was an error'})
    }
}