const { Schema, model } = require('mongoose')

const GuildSchema = new Schema({
    serverId: {
        type: String,
        required: true
    },
    commands: [{
        type: Schema.Types.Mixed,
        ref: 'Guild'
    }]
}, {
    timestamps: true
})

module.exports = model('Guild', GuildSchema)