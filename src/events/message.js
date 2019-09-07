const { key } = require('../config.json').server

module.exports = (bot, message) => {
    if (message.content[0] !== '!') {
        return false
    }
    
}