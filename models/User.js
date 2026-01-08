const { Schema, model } = require('mongoose')

const schema = new Schema ({
    login: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    role: { type: String, enum: ['user', 'admin', 'superAdmin'], default: 'user' },

    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now},
    closedAt: { type: Date, default: null}
})

module.exports = model ('User', schema)