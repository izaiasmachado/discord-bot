const serverList = require('../models/guild')

module.exports = async (bot, member) => {
    const serverId = member.guild.id
    const server = await serverList.findOne({ serverId })

    const { giveRoles } = server.guildMember.join

    if (giveRoles.bool) {
        for (let i = 0; i < giveRoles.roles.length; i++) {
            const role = member.guild.roles.find(role => role.id == giveRoles.roles[i])
    
            if (giveRoles.roles[i] && role) {
                member.addRole(role)
            }
        }
    }

    const { publicMessage } = server.guildMember.join
    const channel = member.guild.channels.find(ch => ch.id == publicMessage.channel)

    if (publicMessage.bool && channel) {
        return channel.send(`:point_right: ${member} just joined the server!`)
    }

    return false
}