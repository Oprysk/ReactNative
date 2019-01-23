const { MongoClient } = require('mongodb')

const state = {
  db: null,
}

exports.connect = async (url) => {
  if (state.db) {
    return true
  }
  try {
    return (state.db = await MongoClient.connect(url))
  } catch (err) {
    return err
  }
}

exports.get = () => state.db
