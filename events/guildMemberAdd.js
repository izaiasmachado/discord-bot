const serverList = require('../models/Guild')
const messageModule = require('../modules/messageModule')

module.exports = async (bot, member) => {
    const serverId = member.guild.id
    const server = await serverList.findOne({ serverId })

    const { giveRole, publicMessage, privateMessage } = server.guildMember.join

    if (giveRole.bool) {
        let temp = ''

        for (let j = 3; j < 21; j++)
            temp += giveRole.role[j]

        const role = member.guild.roles.find(role => role.id == temp)

        if (giveRole.role && role) {
            member.addRole(role)
        }
    }

    const { channel } = publicMessage

    if (publicMessage.bool && channel) {
        messageModule({
            user: member.user,
            guild: member.guild,
            content: publicMessage.content,
            public: { channel }
        })
    }

    if (privateMessage.bool && member) {
        messageModule({
            user: member.user,
            guild: member.guild,
            content: privateMessage.content,
            private: true
        })
    }

    return true
}