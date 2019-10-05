const serverList = require('../models/Guild')

module.exports = async (bot, member) => {
    const guild = member
    const serverId = guild.id

    const server = await serverList.create({
        serverId,
        key: '!'
    })

    if (server) {
        console.log(`joined ${guild.name}!`)
    }

    let name = 'perry-dashboard';
    const dashboardExists = guild.channels.find(ch => ch.name == name)

    if (!dashboardExists) {
        guild.createChannel(name, 'text', [
            {
                id: guild.defaultRole.id,
                deny: ['VIEW_CHANNEL'],
            }
        ])
            .then(() => {
                const dashboard = guild.channels.find(ch => ch.name == name)

                messageModule({
                    user: guild.owner,
                    guild: guild.id,
                    content: `Hi, thanks for inviting me to **{server}**! I hope to be usefull, just make sure to look at ${dashboard} and get to know me better :stuck_out_tongue_winking_eye:`,
                    private: true
                })
            })
            .catch (console.error)
    }

    return false
}