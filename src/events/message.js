const fs = require('fs')
const path = require('path')
const server = require('../models/Guild')
const commandsPath = path.resolve(__dirname, '..', 'commands')

module.exports = async (bot, message) => {
    const guild = message.guild
    if (!guild) return
    
    const serverId = guild.id
    const content = message.content
    
    message.server = await server.findOne({ serverId })
    const prefix = message.server.prefix
    const hasPrefix = content.startsWith(prefix)
    if (!hasPrefix) return

    const removedPrefix = content.replace(prefix, '')
    const trimmedMessage = removedPrefix.trim()
    const msg = trimmedMessage.split(' ')
    const [command, info] = msg

    fs.readdir(commandsPath, (err, files) => {
        files.forEach(file => {
            const eventHandler = require(`../commands/${file}`)
            const eventName = file.split('.')[0]
            if (eventName == command) {
                return eventHandler(bot, message, msg)
            }
        })
    })
}