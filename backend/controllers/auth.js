const Joi = require('joi')
const { BadRequestError, UnauthenticatedError } = require('../errors')
const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')

const registerSchema = Joi.object({
    name: Joi.string().trim().min(3).max(50).required().messages({
        'string.empty': 'Name is required',
        'string.min': 'Name must be at least 3 characters',
        'string.max': 'Name cannot exceed 50 characters',
        'any.required': 'Name is required'
    }),
    email: Joi.string().trim().lowercase().email().required().messages({
        'string.empty': 'Email is required',
        'string.email': 'Please provide a valid email',
        'any.required': 'Email is required'
    }),
    password: Joi.string().min(6).max(128).required().messages({
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 6 characters',
        'string.max': 'Password cannot exceed 128 characters',
        'any.required': 'Password is required'
    }),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.only': 'Passwords do not match',
        'string.empty': 'Please confirm your password',
        'any.required': 'Please confirm your password'
    })
})

const loginSchema = Joi.object({
    email: Joi.string().trim().lowercase().email().required().messages({
        'string.empty': 'Email is required',
        'string.email': 'Please provide a valid email',
        'any.required': 'Email is required'
    }),
    password: Joi.string().required().messages({
        'string.empty': 'Password is required',
        'any.required': 'Password is required'
    })
})

const register = async (req, res) => {
    const { error, value } = registerSchema.validate(req.body, { abortEarly: false })
    if (error) {
        const messages = error.details.map(detail => detail.message).join(', ')
        throw new BadRequestError(messages)
    }

    const { name, email, password } = value

    const existingUser = await User.findOne({ email })
    if (existingUser) {
        throw new BadRequestError('Email already registered')
    }

    const user = await User.create({ name, email, password })
    const token = user.createToken()
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

const login = async (req, res) => {
    const { error, value } = loginSchema.validate(req.body, { abortEarly: false })
    if (error) {
        const messages = error.details.map(detail => detail.message).join(', ')
        throw new BadRequestError(messages)
    }

    const { email, password } = value

    const user = await User.findOne({ email })
    if (!user) {
        throw new UnauthenticatedError('Invalid credentials')
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid credentials')
    }

    const token = user.createToken()
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}

module.exports = { register, login }