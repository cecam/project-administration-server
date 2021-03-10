const mongoose = require('mongoose')
const Project = require('./Project')

const TaskSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    status: {
        type: Boolean,
        default: false
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Task', TaskSchema)