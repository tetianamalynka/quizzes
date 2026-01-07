const { Schema, model, Types } = require('mongoose')

const schema = new Schema ({
    questionId: { type: Types.ObjectId, ref: 'Question', required: true, index: true },
    
    answer: { type: String, required: true },
    correct: { type: Boolean, default: false }
})


module.exports = model ('Answer', schema)