const express = require('express')

const routes = express.Router()
const commandController = require('../controllers/commandController')

routes.get('/', (req, res) => {
    res.json("Working fine!")
})

routes.post('/command/list', commandController.index)
routes.post('/command/add', commandController.store)
routes.post('/command/delete', commandController.delete)

module.exports = routes