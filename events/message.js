const fs = require('fs')

const serverList = require('../models/Guild')

module.exports = async (bot, message) => {
    if (!message.member) {
        return false
    }

    const serverId = message.member.guild.id
    const server = await serverList.findOne({ serverId })
    
    if (message.content[0] !== server.key) {
        return false
    }

    const msg = format(message.content)
    const cmd = msg[0]
    
    // Looks for commands in commands folder.
    fs.readdir('./commands', (err, files) => {
        files.forEach(file => {
            const eventHandler = require(`../commands/${file}`)
            const eventName = file.split('.')[0] // To get rid of the .js extension while reading files.
            if (eventName == cmd) {
                return eventHandler(bot, message, msg)
            }
        })
    })

    if (!server.custom.bool) {
        return false
    }

    const { commands } = server.custom

    let name = cmd
    let size = commands.length
    for (let i = 0; i < size; i++) {
        if ((commands[i].name == name) && (commands[i].bool)) {
            return message.channel.send(commands[i].action)
        }
    }
    
    return false
}

function format(msg) {
    let cmd = ''
    let args = ''

    let temp = msg.split(" ")
    cmd = temp[0]

    for (let i = 1; i < temp.length; i++) {
        args += temp[i]
        if (i != (temp.length - 1))
            args += ' '
    }

    cmd = cmd.slice(1)

    const response = [cmd, args]
    return response
}
