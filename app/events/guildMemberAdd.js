const serverList = require('../models/guild')

module.exports = async (bot, member) => {
    const serverId = member.guild.id
    const server = await serverList.findOne({ serverId })

    const roles = server.guildMember.join.roles
    
    for (let i = 0; i < roles.length; i++) {
        const role = member.guild.roles.find(role => role.id == roles[i])
        
        if (roles[i] && role)
        await member.addRole(role)
    }
    
    const memberLog = server.guildMember.join.channel
    const channel = member.guild.channels.find(ch => ch.id == memberLog)

    if (memberLog && channel) {
        return channel.send(`:point_right: ${member} just joined the server!`)
    }

    return false
}