const { Router } = require('express')
const ActivityService = require('../services/activities')

function activity (app) {
  const router = Router()
  app.use('/api/activities', router)

  const actServ = new ActivityService()

  router.post('/add', async ({ body }, res) => {
    const result = await actServ.new(body)
    return res.status(result.success ? 200 : 400).json(result)
  })

  router.get('/', async (req, res) => {
    const result = await actServ.list()
    console.log(result.success)
    return res.status(result.success ? 200 : 400).json(result)
  })

  router.put('/edit/:id', async (req, res) => {
    const { id } = req.params
    const result = await actServ.edit(id, req.body)
    return res.status(result.success ? 200 : 400).json(result)
  })

  router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params
    const result = await actServ.delete(id)
    return res.status(result.success ? 200 : 400).json(result)
  })
}

module.exports = activity
