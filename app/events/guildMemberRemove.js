const serverList = require('../models/Guild')

module.exports = async (bot, member) => {
    const serverId = member.guild.id
    const server = await serverList.findOne({ serverId })

    if (!server.guildMember.bool) {
        return false
    }
    
    const { publicMessage } = server.guildMember.leave
    const channel = member.guild.channels.find(ch => ch.id == publicMessage.channel)

    if (publicMessage.bool && channel) {
        return channel.send(`:point_right: ${member} left the server.`)
    }

    return false
}