const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')

//creating server
const app = express()

//connecting to DB
connectDB()

//adding cors
app.use(cors())

//enabling express.json
app.use(express.json({extended: true}))

//app port
const PORT = process.env.PORT || 4000

//import routes
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/projects', require('./routes/projects'))
app.use('/api/tasks', require('./routes/tasks'))

//start server
app.listen(PORT, () => {
    console.log(`using PORT: ${PORT}`);
})
