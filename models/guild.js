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
            publicMessage: {
                bool: {
                    type: Boolean,
                    default: false
                },
                channel: String,
                content: {
                    type: String,
                    default: ':point_right: {user} just joined the server!'
                }
            },
            privateMessage: {
                bool: {
                    type: Boolean,
                    default: false
                },
                content: {
                    type: String,
                    default: 'Welcome to **{server}**!'
                }
            },
            giveRole: {
                bool: {
                    type: Boolean,
                    default: false
                },
                role: String
            }
        },
        leave: {
            publicMessage: {
                bool: {
                    type: Boolean,
                    default: false
                },
                channel: String,
                content: {
                    type: String,
                    default: ':point_right: **{idname}** left the server.'
                }
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