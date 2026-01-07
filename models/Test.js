const { Schema, model, Types} = require('mongoose')

const schema = new Schema ({
    userId: { type: Types.ObjectId, ref: 'User', required: true, index: true},

    title: { type: String, required: true },
    description: { type: String, required: true},

    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now},
    closedAt: { type: Date, default: null}
})

module.exports = model ('Test', schema)