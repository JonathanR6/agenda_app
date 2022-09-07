const { mongoose } = require('../config/db')

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
  // registerDate: Date.now()
})

const User = mongoose.model('User', userSchema)

module.exports = User
