const Auth = require('../services/auth')

const getCredentials = (req, res, next) => {
  try {
    const { token } = req.headers

    if (!token) throw new Error('Faltan credenciales')

    const auth = new Auth()
    const validToken = auth.getToken(token)

    req.body.user = validToken.data

    next()
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    })
  }
}

module.exports = getCredentials
