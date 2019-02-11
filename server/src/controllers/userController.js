const mongoose = require('mongoose')
const { UserScheme } = require('../models/usersModel')

const User = mongoose.model('users', UserScheme)

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({})
    res.send(users)
  } catch (e) {
    res.sendStatus(500)
  }
}

const createNewUser = async (req, res) => {
  try {
    const newUser = new User(req.body)
    await newUser.save()
    res.sendStatus(200)
  } catch (e) {
    res.sendStatus(500)
  }
}

const deleteAllUsers = async (req, res) => {
  try {
    await User.remove({})
    res.send(200)
  } catch (e) {
    res.sendStatus(500)
  }
}

module.exports = {
  getAllUsers,
  createNewUser,
  deleteAllUsers,
}
