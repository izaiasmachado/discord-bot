const fs = require('fs')

const serverList = require('../models/guild')

module.exports = async (bot, message) => {
    const serverId = message.member.guild.id
    const server = await serverList.findOne({ serverId })
    
    if (message.content[0] !== server.key) {
        return false
    }

    const msg = format(message.content)
    const cmd = msg[0]
    
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
    
    return false
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
