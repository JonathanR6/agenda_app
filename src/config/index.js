require('dotenv').config()

const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  jwtSecret: process.env.JWT_SECRET,
  dbLocal: process.env.DB_LOCAL
}

config.dev = config.env === 'development'
config.prod = config.env === 'production'
module.exports = config
