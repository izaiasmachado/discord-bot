const fs = require('fs')
const { key } = require('../config.json').server
const Command = require('../models/commands')

module.exports = async (bot, message) => {
    if (message.content[0] !== key) {
        return false
    }

    const msg = format(message.content)
    const cmd = msg[0]
    const args = msg[1]

    // Look for commands in commands folder.
    fs.readdir('./commands', (err, files) => {
        files.forEach(file => {
            const eventHandler = require(`../commands/${file}`)
            const eventName = file.split('.')[0] // To get rid of the .js extension while reading files.
            if (eventName == cmd) {
                return eventHandler(bot, message, msg)
            }
        })
    })

    const commandExists = await Command.findOne({ name: cmd })

    if (commandExists) {
        return message.reply(commandExists.action)
    }

    else {
        return false
    }
}

function format(msg) {
    let cmd = ''
    let args = ''
    let cond = false

    for (let i = 1; i < msg.length; i++) {
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