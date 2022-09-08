const { Router } = require('express')
const GroupService = require('../services/groups')
const getCredentials = require('../middlewares/getCredentials')

const groupsRoute = Router()

const grpServ = new GroupService()

groupsRoute.get('/', getCredentials, async (req, res) => {
  const result = await grpServ.listGroups(req.body.user)
  return res.status(result.success ? 200 : 400).json(result)
})

groupsRoute.delete('/delete/:id', getCredentials, async (req, res) => {
  const id = req.params.id
  const result = await grpServ.delete(req.body.user, id)
  return res.status(result.success ? 200 : 400).json(result)
})

groupsRoute.post('/deluser', getCredentials, async (req, res) => {
  const { id, valor } = req.body
  const result = await grpServ.deleteUser(req.body.user, id, valor)
  return res.status(result.success ? 200 : 400).json(result)
})

groupsRoute.post('/adduser', getCredentials, async (req, res) => {
  const { id, valor } = req.body
  const result = await grpServ.addUser(req.body.user, id, valor)
  return res.status(result.success ? 200 : 400).json(result)
})

module.exports = groupsRoute
