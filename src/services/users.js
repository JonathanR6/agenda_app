const { User } = require('../models/index')

class Users {
  async getOneByEmail (email) {
    try {
      const user = await User.findOne({
        email
      })

      return {
        success: !!user,
        data: user
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async create (data) {
    try {
      const user = await User.create(data)
      return {
        data: user,
        success: true
      }
    } catch (error) {
      return error
    }
  }
}

module.exports = Users
