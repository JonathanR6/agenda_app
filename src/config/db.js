const mongoose = require('mongoose')
const { dbUser, dbPassword, dbHost, dbName, dbLocal } = require('./index')

const connection = async () => {
  try {
    const conn = await mongoose.connect(dbLocal || `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/${dbName}`)
    console.log('Database connected to : ' + conn.connection.name)
  } catch (error) {
    console.log(error)
  }
}

module.exports = connection
