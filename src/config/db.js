const mongoose = require('mongoose')
const { dbUser, dbPassword, dbHost, dbName } = require('./index')

const connection = async () => {
  try {
    const conn = await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/${dbName}`)
    console.log('Database connected to : ' + conn.connection.name)
  } catch (error) {
    console.log(error)
  }
}

module.exports = connection
