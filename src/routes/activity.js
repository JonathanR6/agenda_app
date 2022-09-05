const { Router } = require('express')
const ActivityService = require('../services/activities')

const activityRoute = Router()

const actServ = new ActivityService()

activityRoute.post('/add', async ({ body }, res) => {
  const result = await actServ.new(body)
  return res.status(result.success ? 200 : 400).json(result)
})

activityRoute.get('/', async (req, res) => {
  const result = await actServ.list()
  console.log(result.success)
  return res.status(result.success ? 200 : 400).json(result)
})

activityRoute.put('/edit/:id', async (req, res) => {
  const { id } = req.params
  const result = await actServ.edit(id, req.body)
  return res.status(result.success ? 200 : 400).json(result)
})

activityRoute.delete('/delete/:id', async (req, res) => {
  const { id } = req.params
  const result = await actServ.delete(id)
  return res.status(result.success ? 200 : 400).json(result)
})

module.exports = activityRoute
