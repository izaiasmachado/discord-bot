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
        const { channel } = public

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
    for (let j = 0; j < list.length; j++) {
        content = content.replace(`{${list[j].invoque}}`, list[j].changeFor)
    }

    return content
}