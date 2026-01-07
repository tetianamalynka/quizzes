const { Schema, model, Types } = require('mongoose')

const schema = new Schema ({
    testId: { type: Types.ObjectId, ref: 'Test', required: true, index: true },

    question: { type: String, required: true },
    type: { type: String, enum: ['radio', 'checkbox'], required: true },
    points: { type: Number, required: true }
})

module.exports = model ('Question', schema)