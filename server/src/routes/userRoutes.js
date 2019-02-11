const router = require('express').Router()
const { getAllUsers, createNewUser, deleteAllUsers } = require('../controllers/userController')

router
  .get('/users', getAllUsers)
  .post('/users', createNewUser)
  .delete('/users', deleteAllUsers)

module.exports = router
