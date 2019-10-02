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
        bool: {
            type: Boolean,
            default: false
        },
        join: {
            publicMessage: {
                bool: {
                    type: Boolean,
                    default: false
                },
                channel: String
            },
            privateMessage: {
                bool: {
                    type: Boolean,
                    default: false
                },
                content: String
            },
            giveRoles: {
                bool: {
                    type: Boolean,
                    default: false
                },
                roles: []
            }
        },
        leave: {
            publicMessage: {
                bool: {
                    type: Boolean,
                    default: false
                },
                channel: String
            }
        }
    },
    custom: {
        bool: {
            type: Boolean,
            default: false
        },
        commands: [{
            bool: {
                type: Boolean,
                default: true
            },
            name: String,
            description: String,
            action: String
        }]
    }
}, {
    timestamps: true
})

module.exports = model('Guild', GuildSchema)