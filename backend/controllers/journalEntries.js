const journalEntriesRouter = require('express').Router()
const JournalEntry = require('../models/journalEntry')
const User = require('../models/user')

const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}

journalEntriesRouter.get('/', async (request, response) => {
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json( {error: 'token invalid'} )
    }

    const journalEntries = await JournalEntry.find({}).populate('user', {username: 1, name: 1})
    response.json(journalEntries)
})

journalEntriesRouter.post('/', async (request, response) => {
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json( {error: 'token invalid'} )
    }

    const body = request.body
    if (!body.word || !body.definition) {
        return response.status(400).send({ error: 'word and definition are required' })
    }

    const user = await User.findById(decodedToken.id)

    const journalEntry = new JournalEntry({
        word: body.word,
        definition: body.definition,
        partOfSpeech: body.partOfSpeech || '',
        synonyms: body.synonyms || [],
        antonyms: body.antonyms || [],
        examples: body.examples || [],
        images: body.images || [],
        points: body.points || 0,
        lastReviewed: body.lastReviewed || null,
        lastUpdated: body.lastUpdated || Date.now(),
        dateCreated: body.dateCreated || Date.now(),
        user: user._id
    })

    const savedJournalEntry = await journalEntry.save()
    user.journalEntries = user.journalEntries.concat(savedJournalEntry._id)
    await user.save()

    response.json(savedJournalEntry)
})

journalEntriesRouter.get('/:id', async (request, response) => {
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json( {error: 'token invalid'} )
    }

    const journalEntry = await JournalEntry.findById(request.params.id)
    if (journalEntry) {
        response.json(journalEntry)
    } else {
        response.status(404).end()
    }
})

journalEntriesRouter.delete('/:id', async (request, response) => {
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json( {error: 'token invalid'} )
    }

    await JournalEntry.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

journalEntriesRouter.put('/:id', (request, response, next) => {
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json( {error: 'token invalid'} )
    }

    const body = request.body
    if (!body.word || !body.definition) {
        return response.status(400).send({ error: 'word and definition are required' })
    }

    const journalEntry = {
        word: body.word,
        definition: body.definition,
        partOfSpeech: body.partOfSpeech,
        synonyms: body.synonyms,
        antonyms: body.antonyms,
        examples: body.examples,
        images: body.images,
        points: body.points,
        lastReviewed: body.lastReviewed,
        lastUpdated: body.lastUpdated,
        dateCreated: body.dateCreated,
    }

    JournalEntry.findByIdAndUpdate(request.params.id, journalEntry, { new: true })
        .then (updatedJournalEntry => {
            response.json(updatedJournalEntry)
        })
        .catch(error => next(error))
})

module.exports = journalEntriesRouter
