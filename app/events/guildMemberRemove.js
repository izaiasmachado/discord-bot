const { memberLog } = require('../config.json').server

module.exports = (bot, member) => {
    const channel = member.guild.channels.find(ch => ch.name === memberLog)

    if (!channel) {
        return false
    }

    channel.send(`:point_right: ${member} left the server :slight_frown:`)
}