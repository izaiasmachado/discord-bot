const serverList = require('../models/Guild')

module.exports = async (bot, member) => {
    const guild = member
    const serverId = guild.id
    
    await serverList.deleteOne({ serverId })

    return console.log(`left ${guild.name}`)
}