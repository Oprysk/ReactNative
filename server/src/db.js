const mongoose = require('mongoose')

const state = {
  db: null,
}

exports.connect = async (url) => {
  if (state.db) {
    return true
  }
  try {
    return (state.db = await mongoose.connect(
      url,
      { useNewUrlParser: true },
    ))
  } catch (err) {
    return err
  }
}
