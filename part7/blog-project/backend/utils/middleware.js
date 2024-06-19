const logger = require('./logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: error.message })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')

  if (authorization && authorization.startsWith('Bearer '))
    request.token = authorization.replace('Bearer ', '')
  else
    return response.status(401).json({ error: 'authorisation token is wrong' })

  next()
}

const userExtractor = async (request, response, next) => {
  const token = request.token

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id)
    return response.status(401).json({ error: 'token invalid' })

  if (token)
    request.user = await User.findById(decodedToken.id)
  else
    return response.status(400).json({ error: 'user is wrong' })

  next()
}

module.exports = {
  unknownEndpoint,
  errorHandler,
  requestLogger,
  tokenExtractor,
  userExtractor
}