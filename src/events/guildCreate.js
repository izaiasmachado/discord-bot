const server = require('../models/Guild')

module.exports = async (bot, guild) => {
    const serverId = guild.id
    const serverName = guild.name
    const serverExists = await server.findOne({ serverId })
    
    if (!serverExists) {
        await server.create({ serverId })
    }

    console.log(`> Joined ${serverName}!`)
}