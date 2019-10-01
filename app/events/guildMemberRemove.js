const serverList = require('../models/guild')

module.exports = async (bot, member) => {
    const serverId = member.guild.id
    const server = await serverList.findOne({ serverId })
    
    const memberLog = server.guildMember.join.channel
    const channel = member.guild.channels.find(ch => ch.id == memberLog)

    if (memberLog && channel) {
        return channel.send(`:point_right: ${member} left the server.`)
    }

    return false
}