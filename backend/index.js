const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const password = process.argv[2]

const url = `mongodb+srv://tiffanychan1999614:${password}@cluster0.thdh6b0.mongodb.net/vocabularyBuilder?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

app.use(cors())

let journal = []

app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>')
})

app.get('/api/journal', (request, response) => {
    response.json(journal)
})

app.get('/api/journal/:id', (request, response) => {
    const id = Number(request.params.id)
    const word = journal.find((word) => word.id === id)
    response.json(word)
})

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

app.use(requestLogger)

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const PORT = 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
