const express = require('express')
const cors = require('cors')

const routes = require('./routes')

module.exports = () => {
    const port = (process.env.PORT || 8080)
    const app = express()

    app.use(cors())
    app.use(express.json())
    app.use(routes)

    app.listen(port)
    console.log(`Web server running on http://localhost:${port}`)
}