const { key } = require('../config.json').server

module.exports = (bot, message) => {
    if (message.content[0] !== '!') {
        return false
    }

}

function format(msg) {
    let cmd = ''
    let args = ''
    let cond = false

    for(let i = 1; i < msg.length; i++) {
        if (msg[i] === ' ') {
            cond = true
        } else {
            if (cond) {
                args += msg[i]
            } else {
                cmd += msg[i]
            }
        }
    }

    const response = [cmd, args]
    return response
}