const { mongoose } = require('../config/db')

const activitySchema = new mongoose.Schema({
  title: String,
  description: String,
  dateStart: Date,
  dateEnd: Date,
  color: String,
  icon: String,
  idUser: String,
  usersGroup: Array
})

const Activity = mongoose.model('Activity', activitySchema)

module.exports = Activity
