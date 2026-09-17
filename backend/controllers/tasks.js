const Joi = require('joi')
const { BadRequestError, NotFoundError } = require('../errors')
const Task = require('../models/Task')
const { StatusCodes } = require('http-status-codes')

const createTaskSchema = Joi.object({
    title: Joi.string().trim().max(100).required().messages({
        'string.empty': 'Please provide title',
        'string.max': 'Title cannot be more than 100 characters',
        'any.required': 'Please provide title'
    }),
    description: Joi.string().allow('', null).optional(),
    completed: Joi.boolean().optional(),
    priority: Joi.string().valid('low', 'medium', 'high').default('medium').optional(),
    dueDate: Joi.date().iso().allow('', null).optional()
})

const updateTaskSchema = Joi.object({
    title: Joi.string().trim().max(100).optional().messages({
        'string.empty': 'Please provide title',
        'string.max': 'Title cannot be more than 100 characters'
    }),
    description: Joi.string().allow('', null).optional(),
    completed: Joi.boolean().optional(),
    priority: Joi.string().valid('low', 'medium', 'high').optional(),
    dueDate: Joi.date().iso().allow('', null).optional()
}).min(1)

const getTasks = async (req, res) => {
    const tasks = await Task.find({ createdBy: req.user.userId })
    res.status(StatusCodes.OK).json({ tasks })
}

const createTask = async (req, res) => {
    const { error, value } = createTaskSchema.validate(req.body, { abortEarly: false, stripUnknown: true })
    if (error) {
        const messages = error.details.map(detail => detail.message).join(', ')
        throw new BadRequestError(messages)
    }
    if (value.dueDate === '') value.dueDate = null
    value.createdBy = req.user.userId
    const task = await Task.create(value)
    res.status(StatusCodes.CREATED).json({ task })
}

const getTask = async (req, res) => {
    const { id: TaskID } = req.params
    const task = await Task.findOne({ _id: TaskID, createdBy: req.user.userId })
    if (!task) {
        throw new NotFoundError(`No task with id ${TaskID}`)
    }
    res.status(StatusCodes.OK).json({ task })
}

const updateTask = async (req, res) => {
    const { id: TaskID } = req.params
    const { error, value } = updateTaskSchema.validate(req.body, { abortEarly: false, stripUnknown: true })
    if (error) {
        const messages = error.details.map(detail => detail.message).join(', ')
        throw new BadRequestError(messages)
    }
    if (value.dueDate === '') value.dueDate = null
    const task = await Task.findOneAndUpdate(
        { _id: TaskID, createdBy: req.user.userId },
        value,
        {
            returnDocument: 'after',
            runValidators: true
        }
    )
    if (!task) {
        throw new NotFoundError(`No task with id ${TaskID}`)
    }
    res.status(StatusCodes.OK).json({ task })
}

const deleteTask = async (req, res) => {
    const { id: TaskID } = req.params
    const task = await Task.findOneAndDelete({ _id: TaskID, createdBy: req.user.userId })
    if (!task) {
        throw new NotFoundError(`No task with id ${TaskID}`)
    }
    res.status(StatusCodes.OK).json({ task })
}

module.exports = { getTasks, createTask, getTask, updateTask, deleteTask }