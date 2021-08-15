const server = require('../models/Guild')

module.exports = async (bot, guild) => {
    const name = guild.name
    const serverId = guild.id

    await server.deleteOne({ serverId })
    console.log(`> Left ${name}`)
}