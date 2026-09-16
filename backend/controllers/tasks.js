const NotFoundError = require('../errors/not-found')
const Task = require('../models/Task')
const {StatusCodes} = require('http-status-codes')

const getTasks = async (req, res) => {
    const tasks = await Task.find({})
    res.status(StatusCodes.OK).json({tasks})
}

const createTask = async (req, res) => {
    const task = await Task.create(req.body)
    res.status(StatusCodes.CREATED).json({task})
}

const getTask = async (req, res) => {
    const {id: TaskID} = req.params //TaskID is just an alias, u can also simply use id (its done for better understanding)
    const task = await Task.findOne({_id: TaskID})
    if(!task){
        throw new NotFoundError(`No task with id ${TaskID}`)
    }
    res.status(StatusCodes.OK).json({task})
}

const updateTask = async (req, res) => {
    const {id:TaskID} = req.params
    const task = await Task.findOneAndUpdate({_id:TaskID}, req.body, { //using req.body directly since we are updating all the fields and is the same format as we need to send in
        returnDocument: 'after', //{new:true} was updated to this in latest version
        runValidators: true
    })
    if(!task){
        throw new NotFoundError(`No task with id ${TaskID}`)
    }
    res.status(StatusCodes.OK).json({task})
}

const deleteTask = async (req, res) => {
    const {id: TaskID} = req.params //TaskID is just an alias, u can also simply use id (its done for better understanding)
    const task = await Task.findOneAndDelete({_id: TaskID})
    if(!task){
        throw new NotFoundError(`No task with id ${TaskID}`)
    }
    res.status(StatusCodes.OK).json({task}) //not required to do this
    //can also do res.status(200).send()
    //or res.status(200).json({task: null, status: "success"}) and etc etc...sky is the limit
}

module.exports = {getTasks, createTask, getTask, updateTask, deleteTask}