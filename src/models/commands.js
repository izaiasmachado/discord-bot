const { Schema, model } = require('mongoose')

const CommandsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    action: {
        type: String,
        required: true
    },
}, {
        timestamps: true
    }
)

module.exports = model('Commands', CommandsSchema)