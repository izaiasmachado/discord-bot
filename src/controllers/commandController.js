const Command = require('../models/commands')

module.exports = {
    async index(req, res) {
        const cmds = await Command.find()

        return res.json(cmds)
    },

    async store(req, res) {
        const { name } = req.body
        const { description } = req.body
        const { action } = req.body

        const cmdExists = await Command.findOne({ name })

        if (cmdExists) {
            return res.sendStatus(403)
        }

        const cmd = await Command.create({
            name,
            description,
            action
        })

        return res.json(cmd)
    },

    async delete(req, res) {
        const { name } = req.body

        const cmdExists = await Command.findOne({ name })

        if (!cmdExists) {
            return res.sendStatus(403)
        }

        await Command.deleteOne(cmdExists)

        return res.sendStatus(200)
    }
}