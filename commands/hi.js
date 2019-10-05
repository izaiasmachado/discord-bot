const messageModule = require('../modules/messageModule')

module.exports = (bot, message, msg) => {
    messageModule({
        user: message.author,
        guild: message.guild,
        content: 'hello!',
        public: {
            channel: message.channel,
            reply: true
        }
    })
}