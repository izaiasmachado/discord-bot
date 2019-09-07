const fs = require('fs')
const { key } = require('../config.json').server

module.exports = (bot, message) => {
    if (message.content[0] !== key) {
        return false
    }

    const msg = format(message.content)
    const cmd = msg[0]

    fs.readdir('./commands', (err, files) => {
        files.forEach(file => {
            const eventHandler = require(`../commands/${file}`)
            const eventName = file.split('.')[0] // To get rid of the .js extension while reading files.
            if (eventName == cmd) {
                eventHandler(bot, message, msg)
            }
        })
    })
}

function format(msg) {
    let cmd = ''
    let args = ''
    let cond = false

    for(let i = 1; i < msg.length; i++) {
        if (msg[i] === ' ') {
            cond = true
        } else {
            if (cond) {
                args += msg[i]
            } else {
                cmd += msg[i]
            }
        }
    }

    const response = [cmd, args]
    return response
}