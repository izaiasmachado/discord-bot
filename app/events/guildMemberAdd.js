const serverList = require('../models/Guild')

module.exports = async (bot, member) => {
    const serverId = member.guild.id
    const server = await serverList.findOne({ serverId })

    if (!server.guildMember.bool) {
        return false
    }
    
    const { giveRoles, publicMessage, privateMessage } = server.guildMember.join

    if (giveRoles.bool) {
        for (let i = 0; i < giveRoles.roles.length; i++) {
            const role = member.guild.roles.find(role => role.id == giveRoles.roles[i])
    
            if (giveRoles.roles[i] && role) {
                member.addRole(role)
            }
        }
    }

    const channel = member.guild.channels.find(ch => ch.id == publicMessage.channel)

    if (publicMessage.bool && channel) {
        channel.send(`:point_right: ${member} just joined the server!`)
    }

    if (privateMessage.bool && member) {
        member.send(privateMessage.content)
    }

    return true
}