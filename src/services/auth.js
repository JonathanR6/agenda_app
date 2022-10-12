// const Users = require('../services/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config')

class Auth {
  #users
  constructor () {
    this.#users = () => {}
  }

  async login (data) {
    try {
      const { email, password } = data
      if (!email || !password) throw new Error('Incorrect credentials')

      const { success, data: user } = await this.#users.getOneByEmail(email)

      if (!success || !(await this.#compare(password, user.password))) throw new Error('Incorrect credentials')

      return this.#generateAuthData(user)
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async signup (data) {
    const { email, password } = data
    if (!password || !email) { return { message: 'Error interno, reintentar', success: false } }

    data.password = await this.#encrypt(password, 10)

    const {
      data: user,
      success,
      message
    } = await this.#users.create(data)

    if (!success) {
      return {
        message,
        success
      }
    }

    return { ...this.#generateAuthData(user), message }
  }

  async #encrypt (string) {
    try {
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(string, salt)
      return hash
    } catch (error) {
      return false
    }
  }

  async #compare (string, hash) {
    try {
      return await bcrypt.compare(string, hash)
    } catch (error) {
      return false
    }
  }

  #createToken (data) {
    return jwt.sign(data, jwtSecret, {
      expiresIn: '7d'
    })
  }

  getToken (token) {
    return jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) throw new Error('Credenciales no validas')

      return {
        success: true,
        data: decoded
      }
    })
  }

  #generateAuthData (userData) {
    const user = { email: userData.email, name: userData.name, id: userData._id }
    return {
      success: true,
      data: {
        ...user,
        token: this.#createToken(user)
      }
    }
  }
}

module.exports = Auth
