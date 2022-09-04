const { Router } = require('express')

const routes = Router()

routes.get('/', (req, res) => {
  res.send('Hello World')
})

routes.use('/api/auth', require('./auth'))

module.exports = routes
