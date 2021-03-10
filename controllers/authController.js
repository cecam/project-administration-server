const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.authenticateUser = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {email, password} = req.body

    try{
        let user = await User.findOne({ email })
        if(!user) {
            return res.status(400).json({msg: 'User not found'})
        }

        const rightPassword = await bcrypt.compare(password, user.password)
        if(!rightPassword){
            return res.status(400).json({msg: 'Wrong password'})
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600
        }, (error, token) => {
            if(error) throw error
            res.status(201).json({ token })
        })
    } catch(error) {
        console.log(error);
        res.status(500).json({msg: 'Oops, there was an error'})
    }
}

exports.authenticatedUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.status(201).json({user})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Oops, there was an error'})
    }
}