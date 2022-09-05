const Users = require('./users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config')

class Auth {
  #users
  constructor () {
    this.#users = new Users()
  }

  async login (data) {
    const { email, password } = data
    if (!email || !password) {
      return {
        success: false,
        message: 'Incorrect credentials'
      }
    }

    const { success, data: user, message } = await this.#users.getOneByEmail(email)
    if (success && (await this.#compare(password, user.password))) {
      delete user.password
      // eslint-disable-next-line no-console
      // console.log(user)
      return {
        success: true,
        data: user,
        ...this.#generateAuthData,
        message
      }
    }

    return {
      success: false,
      message: 'Incorrect credentials'
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
    // eslint-disable-next-line no-console
    console.log(user)
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

  #compare (string, hash) {
    try {
      return bcrypt.compare(string, hash)
    } catch (error) {
      return false
    }
  }

  #createToken (data) {
    return jwt.sign(data, jwtSecret, {
      expiresIn: '7d'
    })
  }

  #generateAuthData (userData) {
    const user = { email: userData.email, name: userData.name }
    return {
      data: user,
      success: true,
      token: this.#createToken(user)
    }
  }
}

module.exports = Auth
