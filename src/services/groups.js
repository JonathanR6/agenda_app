const Activity = require('../models/activity')
const { User, roleUser } = require('../models/user')

class Groups {
  #users
  constructor () {
    this.#users = new User()
  }

  async listGroups (user) {
    try {
      const email = user.email
      const role = await User.findOne({ email })
      if (role.role === roleUser[0]) {
        const activity = await Activity.find()
        return {
          data: activity,
          success: true
        }
      }
    } catch (error) {
      return {
        success: false,
        message: 'Error ocurred'
      }
    }
  }

  async delete (user, id) {
    try {
      const email = user.email
      const role = await User.findOne({ email })
      if (role.role === roleUser[0]) {
        console.log(id)
        const activity = await Activity.findByIdAndDelete(id)
        return {
          data: activity,
          success: true
        }
      }
    } catch (error) {

    }
  }

  async deleteUser (user, id, valor) {
    try {
      const email = user.email
      const role = await User.findOne({ email })
      if (role.role === roleUser[0]) {
        console.log(id)
        const activity = await Activity.findById(id)
        activity.usersGroup.remove(valor)
        await Activity.updateOne(
          { _id: id },
          { $set: { usersGroup: activity.usersGroup } }
        )
        return {
          data: activity,
          success: true
        }
      }
    } catch (error) {

    }
  }

  async addUser (user, id, valor) {
    try {
      const email = user.email
      const role = await User.findOne({ email })
      if (role.role === roleUser[0]) {
        const activity = await Activity.findById(id)
        activity.usersGroup.push(valor)
        await Activity.updateOne(
          { _id: id },
          { $set: { usersGroup: activity.usersGroup } }
        )
        return {
          data: activity,
          success: true
        }
      }
    } catch (error) {
      return {
        error: error.message,
        success: false
      }
    }
  }
}

module.exports = Groups
