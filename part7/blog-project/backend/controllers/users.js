const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs')
  response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
  const id = request.params.id

  const foundUser = await User
    .findById(id).find({})
    .populate('blogs')

  response.json(foundUser)
})

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body

  if (password === undefined)
    return response.status(400).json({ "error": "Password cannot be empty" })

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  try {
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter