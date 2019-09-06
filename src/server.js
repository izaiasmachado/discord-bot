const Discord = require('discord.js-commando')

const token = require('./credentials/discord.json').server.apiKey
const owner = require('./credentials/discord.json').server.ownerId
const key = '!'

const bot = new Discord.Client({ owner })

bot.registry.registerDefaults()

bot.on('ready', () => {
    console.log(`Working fine!`)
    console.log(`Logged in as ${bot.user.tag}`)
})

bot.login(token)