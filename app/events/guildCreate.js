const serverList = require('../models/guild')

module.exports = async (bot, member) => {
    console.log(member.name)
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