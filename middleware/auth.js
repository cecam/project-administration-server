const jwt = require('jsonwebtoken')

module.exports = function(req, res, next) {
    //reading header token
    const token = req.header('x-auth-token')

    //cheking if token exist
    if(!token) {
        return res.status(401).json({msg: 'Theres no token to work with'})
    }

    //validating token
    try{
        const encrypted = jwt.verify(token, process.env.SECRET)
        req.user = encrypted.user
        next()
    } catch(error) {
        return res.status(401).json({msg: 'Invalid token'})
    }
}