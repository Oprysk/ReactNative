const { MongoClient } = require('mongodb')

const state = {
  db: null,
}

exports.connect = async (url) => {
  if (state.db) {
    return true
  }
  try {
    state.db = await MongoClient.connect(url)
  } catch (err) {
    return err
  }
}

exports.get = () => state.db
