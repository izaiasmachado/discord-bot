const express = require('express')

const routes = express.Router()

routes.get('/', (req, res) => {
    res.render('index.html')
})

module.exports = routes