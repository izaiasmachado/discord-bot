const serverList = require('../models/Guild')

module.exports = async (bot, member) => {
    const guild = member
    const serverId = guild.id

    const server = await serverList.create({
        serverId,
        key: '!'
    })

    if (server) {
        return console.log(`joined ${guild.name}!`)
    }

    return false
}