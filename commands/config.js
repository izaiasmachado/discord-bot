const serverList = require('../models/Guild')
const messageModule = require('../modules/messageModule')

module.exports = async (bot, message, msg) => {
    const serverId = message.guild.id
    const server = await serverList.findOne({ serverId })

    const str = msg[1]
    const res = str.split(' ')

    const channel = message.guild.channels.find(ch => ch.name == 'perry-dashboard')
    let content = ''

    if (message.author.id != message.guild.owner.id)
        return message.reply(`you don't have permission to use this command. Type !help for some information.`)

    if (!res[0])
        return channel.send('**Config Guide**\n```\n1) joinPublicMessage - send message when user joins.\n2) joinPrivateMessage - send DM when user joins.\n3) joinRole - give roles to the new ones.\n4) leavePublicMessage - send message when user leaves guild.\n```')
    
    switch (res[0]) {
        case 'joinPublicMessage':
            if (res[1]) {
                if (res[1].includes('<#')) {
                    server.guildMember.join.publicMessage.channel = res[1]
                } else if ((res[1] == 'false') || (res[1] == 'true')) {
                    server.guildMember.join.publicMessage.bool = res[1]
                } else {
                    let temp = ''
                    for (let i = 1; i < res.length; i++) {
                        temp += res[i]
                        if (i != (res.length - 1))
                            temp += ' '
                    }
                    server.guildMember.join.publicMessage.content = temp
                }

                server.save()
            }


            content = `**Command**: ${res[0]}\n`
            content += '**State**: '
            content += (server.guildMember.join.publicMessage.bool) ? 'active' : 'inactive'
            content += '\n'
            content += '**Channel**: '
            content += `${server.guildMember.join.publicMessage.channel}`
            content += '\n'
            content += '**Current message**:\n' + '```' + server.guildMember.join.publicMessage.content + '```'
            break

        case 'joinPrivateMessage':
            if (res[1]) {
                if (res[1].includes('<#')) {
                    server.guildMember.join.privateMessage.channel = res[1]
                } else if ((res[1] == 'false') || (res[1] == 'true')) {
                    server.guildMember.join.privateMessage.bool = res[1]
                } else {
                    let temp = ''
                    for (let i = 1; i < res.length; i++) {
                        temp += res[i]
                        if (i != (res.length - 1))
                            temp += ' '
                    }
                    server.guildMember.join.privateMessage.content = temp
                }

                server.save()
            }


            content = `**Command**: ${res[0]}\n`
            content += '**State**: '
            content += (server.guildMember.join.privateMessage.bool) ? 'active' : 'inactive'
            content += '\n'
            content += '**Current message**:\n' + '```' + server.guildMember.join.privateMessage.content + '```'
            break

        case 'joinRole':
            if (res[1]) {
                if ((res[1] == 'false') || (res[1] == 'true')) {
                    server.guildMember.join.giveRole.bool = res[1]
                } else {
                    for (let i = 1; i < res.length; i++) {
                        server.guildMember.join.giveRole.role = res[i]
                    }
                }

                server.save()
            }

            content = `**Command**: ${res[0]}\n`
            content += '**State**: '
            content += (server.guildMember.join.giveRole.bool) ? 'active' : 'inactive'
            content += '\n'
            content += '**Current roles**: '
            content += server.guildMember.join.giveRole.role
            break

        case 'leavePublicMessage':
            if (res[1]) {
                if (res[1].includes('<#')) {
                    server.guildMember.leave.publicMessage.channel = res[1]
                } else if ((res[1] == 'false') || (res[1] == 'true')) {
                    server.guildMember.leave.publicMessage.bool = res[1]
                } else {
                    let temp = ''
                    for (let i = 1; i < res.length; i++) {
                        temp += res[i]
                        if (i != (res.length - 1))
                            temp += ' '
                    }
                    server.guildMember.leave.publicMessage.content = temp
                }

                server.save()
            }


            content = `**Command**: ${res[0]}\n`
            content += '**State**: '
            content += (server.guildMember.leave.publicMessage.bool) ? 'active' : 'inactive'
            content += '\n'
            content += '**Channel**: '
            content += `${server.guildMember.leave.publicMessage.channel}`
            content += '\n'
            content += '**Current message**:\n' + '```' + server.guildMember.leave.publicMessage.content + '```'
            break
    }

    channel.send(content)

    return true

}