const serverList = require('../models/Guild')
const messageModule = require('../modules/messageModule')

module.exports = async (bot, member) => {
    const serverId = member.guild.id
    const server = await serverList.findOne({ serverId })

    if (!server.guildMember.bool) {
        return false
    }

    const { publicMessage } = server.guildMember.leave
    const channel = member.guild.channels.find(ch => ch.id == publicMessage.channel)

    if (publicMessage.bool && channel) {
        messageModule({
            user: member.user,
            guild: member.guild,
            content: publicMessage.content,
            public: { channel }
        })
    }

    return true
}