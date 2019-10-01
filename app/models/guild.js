const { Schema, model } = require('mongoose')

const GuildSchema = new Schema({
    serverId: {
        type: String,
        required: true
    },
    key: {
        type: String,
        required: true
    },
    guildMember: {
        join: {
            channel: {
                type: String
            },
            roles: []
        },
        leave: {
            channel: {
                type: String
            }
        }
    },
    commands: [{
        name: {
            type: String,
        },
        description: {
            type: String
        },
        action: {
            type: String
        }
    }]
}, {
    timestamps: true
})

module.exports = model('GuildSchema', GuildSchema)

