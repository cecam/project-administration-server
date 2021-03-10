const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.createUser = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const { email, password} = req.body

    try {
        let user = await User.findOne({ email })
        if(user) {
            return res.status(400).json({ msg: 'The user already exist' })
        }
        
        //create new user
        user = new User(req.body)

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)

        //store user
        await user.save()

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
    } catch ( error ) {
        console.log(error);
        res.status(400).send('It seems like something went wrong')
    }
}