const { Schema } = require('mongoose')

const UserScheme = new Schema({
  firstName: {
    type: String,
    required: 'Enter a first name',
  },
  lastName: {
    type: String,
    required: 'Enter a last name',
  },
  email: {
    type: String,
    required: 'Enter email ',
  },
  phone: {
    type: Number,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = {
  UserScheme,
}
