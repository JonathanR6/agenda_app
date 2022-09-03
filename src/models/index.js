const { mongoose } = require('../config/db')

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
  // registerDate: Date.now()
})
const activitySchema = new mongoose.Schema({
  title: String,
  description: String,
  dateStart: Date,
  dateEnd: Date,
  color: String,
  icon: String,
  idUser: String

})

const Activity = mongoose.model('Activity', activitySchema)
const User = mongoose.model('User', userSchema)

module.exports = {
  Activity,
  User
}
