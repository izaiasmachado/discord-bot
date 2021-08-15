const { Schema, model } = require('mongoose')

const GuildSchema = new Schema({
    serverId: {
        type: String,
        required: true
    },
    prefix: {
        type: String,
        required: true,
        default: 'p!'
    }
}, {
    timestamps: true
})

module.exports = model('Guild', GuildSchema)
