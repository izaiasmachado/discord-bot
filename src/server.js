const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const Discord = require('discord.js')

const { DISCORD_OWNER_ID, MONGO_URI, DISCORD_TOKEN } = process.env  
const bot = new Discord.Client({ owner: DISCORD_OWNER_ID })
const eventsPath = path.resolve(__dirname, 'events')

const connectWithRetry = () => {
    return mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }, (err) =>  {
      if (err) {
        console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
        setTimeout(connectWithRetry, 5000);
      }
    })
}
  
fs.readdir(eventsPath, (err, files) => {
    files.forEach(file => {
        const eventHandler = require(`./events/${file}`)
        const eventName = file.split('.')[0]
        bot.on(eventName, arg => eventHandler(bot, arg))
    })
})

connectWithRetry()
bot.login(DISCORD_TOKEN)