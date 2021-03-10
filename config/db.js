const mongoose = require('mongoose')
require('dotenv').config({ path: 'variables.env' })

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log('DB connected');
    } catch (err) {
        console.log(err);
        process.exit(1) //stop the app
    }
}

module.exports = connectDB