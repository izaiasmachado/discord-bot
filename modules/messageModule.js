module.exports = (info) => {
    const { user, guild, content, public, private } = info

    const list = [{
        invoque: 'user',
        changeFor: user
    }, {
        invoque: 'server',
        changeFor: guild
    }, {
        invoque: 'idname',
        changeFor: user.username + '#' + user.discriminator
    }, {
        invoque: 'block',
        changeFor: '```'
    }]

    const msg = format(content, list)

    if (public) {
        let temp = ''

        if (public.channel[0] == '<') {
            for (let i = 2; i < 20; i++)
                temp += public.channel[i]
        } else {
            temp = public.channel
        }

        const channel = guild.channels.find(ch => ch.id == temp)

        if (public.reply) {
            channel.send(`${user}, ${msg}`)
        } else {
            channel.send(msg)
        }
    }

    if (private && !user.bot) {
        user.send(msg)
    }
}

function format(content, list) {
    for (let i = 0; i < content.length; i++) {
        for (let j = 0; j < list.length; j++) {
        content = content.replace(`{${list[j].invoque}}`, list[j].changeFor)
        }
    }

    return content
}