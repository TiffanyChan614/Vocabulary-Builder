const mongoose = require('mongoose')

const journalEntrySchema = new mongoose.Schema({
    word: { type: String, required: true},
    definition: { type: String, required: true },
    partOfSpeech: String,
    synonyms: [String],
    antonyms: [String],
    examples: [String],
    images: [String],
    points: { type: Number, default: 0 },
    lastReviewed: Date,
    lastUpdated: { type: Date, default: Date.now},
    dateCreated: { type: Date, default: Date.now},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

journalEntrySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id,
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('JournalEntry', journalEntrySchema)
