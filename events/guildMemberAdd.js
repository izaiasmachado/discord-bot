const serverList = require('../models/Guild')
const messageModule = require('../modules/messageModule')

module.exports = async (bot, member) => {
    const serverId = member.guild.id
    const server = await serverList.findOne({ serverId })

    const { giveRoles, publicMessage, privateMessage } = server.guildMember.join

    if (giveRoles.bool) {
        for (let i = 0; i < giveRoles.roles.length; i++) {
            let temp = ''

            for (let j = 2; j < 20; j++)
                temp += giveRoles.roles[i][j]

            const role = member.guild.roles.find(role => role.id == temp)

            if (giveRoles.roles[i] && role) {
                member.addRole(role)
            }
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