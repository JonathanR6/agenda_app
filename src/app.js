const express = require('express')
const { port } = require('./config')
const { connection } = require('./config/db')

const app = express()

// Middlewares
app.use(express.json())

// Database
connection()

// Rutas
app.use(require('./routes'))

// App listening
app.listen(port, () => {
  console.log(`server on: http://localhost:${port}`)
})
