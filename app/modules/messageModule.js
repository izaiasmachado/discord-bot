module.exports = (info) => {
    const { member, guild, content, public, private } = info

    const list = [{
        invoque: 'user',
        changeFor: member
    }, {
        invoque: 'server',
        changeFor: guild
    }, {
        invoque: 'idname',
        changeFor: member.username + '#' + member.discriminator
    }]

    const msg = format(content, list)

    if (public) {
        const { channel } = public

        if (public.reply) {
            channel.send(`${member}, ${msg}`)
        } else {
            channel.send(msg)
        }
    }

    if (private) {
        member.send(msg)
    }
}

function format(content, list) {
    for (let j = 0; j < list.length; j++) {
        content = content.replace(`{${list[j].invoque}}`, list[j].changeFor)
    }

    return content
}