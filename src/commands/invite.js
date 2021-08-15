const { RichEmbed } = require('discord.js')

module.exports = (bot, message, msg) => {
    const { id: clientid, avatar } = bot.user
    
    const inviteLink = `https://discord.com/oauth2/authorize?client_id=${clientid}&permissions=8&scope=bot`
    const avatartURL = `https://cdn.discordapp.com/avatars/${clientid}/${avatar}.png?size=256`

    const embed = new RichEmbed()
        .setAuthor("Perry", avatartURL)
        .setTitle("Invite me to other servers!")
        .setDescription(`Hi I'm Perry, I'm a free and increnible music bot, and in the free times I freelance as a spy. Feel free to invite me to others server and tell your friends about me! (Just don't tell about the spy part, it's our secret).\n\n[Click here to invite me!](${inviteLink})\n\nI'm currently in **${bot.guilds.size} guilds**, listening to some jams. (And listening to Doofenshmirtz's conversations, on a undercover bot). Don't worry I won't hear your gossips, that's why I'm always deafen.`)
    
    message.channel.send(embed)
}