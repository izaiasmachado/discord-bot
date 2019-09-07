const Discord = require('discord.js')
const fs = require('fs')

const { token } = require('./config.json').bot
const { owner } = require('./config.json').bot

const bot = new Discord.Client({ owner })

// This function takes care of event handling. Ex: when bot is ready or a user joined guild.
fs.readdir('./events/', (err, files) => {
    files.forEach(file => {
        const eventHandler = require(`./events/${file}`)
        const eventName = file.split('.')[0] // To get rid of the .js extension while reading files.
        bot.on(eventName, arg => eventHandler(bot, arg))
    })
})

bot.login(token)