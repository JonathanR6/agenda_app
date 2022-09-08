const validation = require('../helpers/validation')

const validationHandler = (schema) => {
  return (req, res, next) => {
    const result = validation(req.body, schema)

    if (result.error) {
      return res.status(400).json({
        success: false,
        message: result.error?.details?.map(detail => detail.message) || 'Incorrect input body'
      })
    }

    return next()
  }
}

module.exports = validationHandler
