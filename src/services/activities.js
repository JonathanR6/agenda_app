const Activity = require('../models/activity')

class Activities {
  async new (data) {
    try {
      const email = data.user.email

      const activity = await Activity.create({
        ...data,
        usersGroup: [email, ...data.usersGroup],
        adminUsers: [email]
      })

      return {
        data: activity,
        success: true,
        message: 'Activity created successfully'
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async list (user) {
    try {
      const activity = await Activity.find({ usersGroup: { $in: user.email } })

      return {
        data: activity,
        success: true
      }
    } catch (error) {
      return {
        success: false,
        message: 'Error ocurred'
      }
    }
  }

  async getId (id) {
    try {
      const activity = await Activity.findById(id)

      return {
        success: true,
        data: activity
      }
    } catch (error) {
      return {
        success: false,
        message: 'Error ocurred'
      }
    }
  }

  async edit (id, data) {
    try {
      const activity = await Activity.findOneAndUpdate({ adminUsers: { $in: data.user.email } }, data, { new: true })

      return {
        success: true,
        message: 'update activity successfully',
        data: activity
      }
    } catch (error) {
      return {

        success: false,
        message: error.message
      }
    }
  }

  async delete (id, user) {
    try {
      const activity = await Activity.findOneAndDelete({ adminUsers: { $in: user.email } })

      if (activity === null) throw new Error('you dont have permissions')

      return {
        success: true,
        message: 'delete activity successfully',
        data: activity
      }
    } catch (error) {
      return {
        success: false,
        message: 'Error ocurred'
      }
    }
  }
}

module.exports = Activities
