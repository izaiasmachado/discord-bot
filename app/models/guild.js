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
    memberLog: {
        type: String,
        required: false
    },
    commands: [{
        /*
        {
            name: "",
            description: "",
            action: ""
        }
        */
        type: Schema.Types.Mixed,
        ref: 'Guild'
    }]
}, {
    timestamps: true
})

module.exports = model('GuildSchema', GuildSchema)

