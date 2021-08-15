const { RichEmbed } = require('discord.js')

module.exports = async (bot, message, msg) => {
    const { id: clientid, avatar } = bot.user
    const avatartURL = `https://cdn.discordapp.com/avatars/${clientid}/${avatar}.png?size=256`
    const embed = new RichEmbed().setAuthor("Perry", avatartURL)

    const server = message.server
    const prefix = server.prefix
    const [, info] = msg
    const placeHolderPrefix = (prefix == 'p!' ? '!' : 'p!')

    if (!info) {
        embed.addField(`Error`, `You didn't type a prefix.`)
             .addField(`Example`, 'Type `' + prefix + 'prefix ' + placeHolderPrefix + '`')
        return message.channel.send(embed)
    }

    const hasRightSize = (info.length <= 2)
    const hasSpaces = (info.indexOf(' ') !== -1)
    
    if (!hasRightSize || hasSpaces) {
        embed.addField(`Error`, 'Keep it to two characters and no spaces.')
             .addField(`Example`, 'Type `' + prefix + 'prefix ' + placeHolderPrefix + '`')
        return message.channel.send(embed)
    }

    const oldPrefix = server.prefix
    const newPrefix = info
    
    server.prefix = newPrefix
    await server.save()

    embed.addField(`Prefix changed`, 'From `' + oldPrefix + '` to `' + newPrefix + '`')
    message.channel.send(embed)
}