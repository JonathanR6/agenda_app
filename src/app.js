const express = require('express')
const { port } = require('./config')
const connection = require('./config/db')

const app = express()

// Database
connection()

// Middlewares
app.use(express.json())

app.use(express.urlencoded({
  extended: true
}))

// Rutas
app.use(require('./routes'))

// App listening
app.listen(port, () => {
  console.log(`server on: http://localhost:${port}`)
})
