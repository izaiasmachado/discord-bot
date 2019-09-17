const { Schema, model } = require('mongoose')

const GlobalSchema = new Schema({
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
    }
}, {
    timestamps: true
})

module.exports = model('GlobalCommands', GlobalSchema)