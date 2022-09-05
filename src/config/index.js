require('dotenv').config()

const config = {
  port: process.env.PORT,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  jwtSecret: process.env.JWT_SECRET,
  dbLocal: process.env.DB_LOCAL
}

module.exports = config
