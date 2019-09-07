const Discord = require('discord.js')
const fs = require('fs')
const mongoose = require('mongoose')

const { token } = require('../credentials/discord.json')
const { owner } = require('./config.json').bot

const bot = new Discord.Client({ owner })

const { cluster } = require('../credentials/mongodb')

mongoose.connect(cluster, {
    useNewUrlParser: true
})

// This function takes care of event handling. Ex: when bot is ready or a user joined guild.
fs.readdir('./events/', (err, files) => {
    files.forEach(file => {
        const eventHandler = require(`./events/${file}`)
        const eventName = file.split('.')[0] // To get rid of the .js extension while reading files.
        bot.on(eventName, arg => eventHandler(bot, arg))
    })
})

bot.login(token)