const express = require('express')
const path = require('path')

const app = express()
const server = require('http').createServer(app) // Defines http protocol
const io = require('socket.io')(server) // Defines wss protocol

const routes = require('./routes')
const port = 80

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'public'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.use(routes)

server.listen(port, () => console.log(`Running on http://localhost:${port}`))