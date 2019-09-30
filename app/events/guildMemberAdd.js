const serverList = require('../models/guild')

module.exports = async (bot, member) => {
    const serverId = member.guild.id
    const server = await serverList.findOne({ serverId })
    const memberLog = server.memberLog
    const roleId = server.logInRole

    const channel = member.guild.channels.find(ch => ch.id == memberLog)
    const role = member.guild.roles.find(role => role.id == roleId);
    
    if (roleId && role)
        member.addRole(role);


    if (memberLog && channel) {
        return channel.send(`:point_right: ${member} just joined the server!`)
    }

    return false
}