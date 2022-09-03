const { Activity } = require('../models/index')

class Activities {
  async new (data) {
    try {
      const activity = await Activity.create(data)
      return {
        data: activity,
        success: true,
        message: 'Activity created successfully'
      }
    } catch (error) {
      return {
        error,
        success: false,
        message: 'Error ocurred'
      }
    }
  }

  async list () {
    try {
      const activity = await Activity.find()
      console.log(activity)
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
      const options = { new: true }
      const activity = await Activity.findByIdAndUpdate(id, data, options)
      return {
        success: true,
        message: 'update activity successfully',
        data: activity
      }
    } catch (error) {
      return {
        success: false,
        message: 'Error ocurred'
      }
    }
  }

  async delete (id) {
    try {
      const activity = await Activity.findByIdAndDelete(id)
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
