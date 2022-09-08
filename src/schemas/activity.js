const joi = require('joi')

const createActivitySchema = joi.object({
  title: joi.string().min(1).max(50).required(),
  description: joi.string().min(1).max(255),
  dateStart: joi.date(),
  dateEnd: joi.date(),
  color: joi.string().valid('red', 'blue', 'yellow', 'green', 'orange', 'brown', 'purple', 'gray'),
  icon: joi.string().min(1).max(50),
  usersGroup: joi.string().email()
})

module.exports = createActivitySchema
