const { mongoose } = require('../config/db')

const roleUser = ['instructor', 'student', 'admin']
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    enum: roleUser,
    type: String,
    default: 'student'
  }
  // registerDate: Date.now()
})

const User = mongoose.model('User', userSchema)

module.exports = {
  User, roleUser
}
