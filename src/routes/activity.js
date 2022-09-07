const { Router } = require('express')
const ActivityService = require('../services/activities')
const getCredentials = require('../middlewares/getCredentials')

const activityRoute = Router()

const actServ = new ActivityService()

activityRoute.post('/add', getCredentials, async ({ body }, res) => {
  const result = await actServ.new(body)
  return res.status(result.success ? 200 : 400).json(result)
})

activityRoute.get('/', getCredentials, async (req, res) => {
  const result = await actServ.list(req.body.user)
  return res.status(result.success ? 200 : 400).json(result)
})

activityRoute.put('/edit/:id', getCredentials, async (req, res) => {
  const { id } = req.params
  const result = await actServ.edit(id, req.body)
  return res.status(result.success ? 200 : 400).json(result)
})

activityRoute.delete('/delete/:id', getCredentials, async (req, res) => {
  const { id } = req.params
  const { user } = req.body
  const result = await actServ.delete(id, user)
  return res.status(result.success ? 200 : 400).json(result)
})

module.exports = activityRoute
