const { Router } = require('express')
const AuthService = require('../services/auth')

const authRoute = Router()

const authServ = new AuthService()

authRoute.post('/login', async (req, res) => {
  const result = await authServ.login(req.body)

  return res.status(result.success ? 200 : 400).json(result)
})

authRoute.post('/signup', async (req, res) => {
  const result = await authServ.signup(req.body)
  return res.status(result.success ? 200 : 400).json(result)
})

module.exports = authRoute
