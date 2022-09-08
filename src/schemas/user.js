const joi = require('joi')

const createUserSchema = joi.object({
  name: joi.string().min(1).max(100).required(),
  email: joi.string().email().required(),
  role: joi.string().valid('instructor', 'student', 'admin').required(),
  password: joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%$&?])[\w!@#$%&?]{8,}$/).required(), // Agregar expresion para password: contenga mayuscula, minuscula y un caracter especial
  passwordConfirmation: joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%$&?])[\w!@#$%&?]{8,}$/).required()
})

module.exports = createUserSchema
