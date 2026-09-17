const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, 'Please provide title'],
        maxlength: [100, 'Cannot be more than 100 characters'],
        trim: true
    },
    description:{
        type: String
    },
    completed:{
        type: Boolean,
        default: false
    },
    priority:{
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    dueDate:{
        type: Date
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user']
    }
}, {timestamps: true})

module.exports = mongoose.model('Task', TaskSchema)