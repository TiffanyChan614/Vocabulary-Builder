import { useState } from 'react'
import WordForm from './WordForm'

const Word = ({ wordData, page, handleDelete, setWords }) => {
  console.log('word', wordData)
  const [showDetails, setShowDetails] = useState(false)
  const [showForm, setShowForm] = useState(false)

  console.log('showForm')

  const speak = (e, text, voiceName, rate) => {
    e.stopPropagation()
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = rate || 1
      const voices = speechSynthesis.getVoices()
      const selectedVoice = voices.find((voice) => voice.name === voiceName)
      if (selectedVoice) {
        utterance.voice = selectedVoice
      }
      speechSynthesis.speak(utterance)
    } else {
      console.err('Speech synthesis not supported')
    }
  }

  const transformSentence = (sentence) => {
    let returnedSentence = sentence
    if (returnedSentence && returnedSentence.length > 0) {
      if (returnedSentence[returnedSentence.length - 1] !== '.') {
        returnedSentence += '.'
      }
      return returnedSentence[0].toUpperCase() + returnedSentence.slice(1)
    }
  }

  if (wordData.word === 'no word') {
    return <div className='word'>No word found</div>
  } else {
    const {
      word,
      pronunciation,
      partOfSpeech,
      definition,
      synonyms,
      antonyms,
      examples,
      images,
    } = wordData
    return (
      <>
        <div className='word'>
          <div className='word--header'>
            <h3>{word}</h3>
            {pronunciation && <h4>{`[${pronunciation}]`}</h4>}
            {partOfSpeech && <h4>{partOfSpeech}</h4>}
            <button
              className='word--audio'
              onClick={(e) => speak(e, word, 'samantha')}>
              Play
            </button>
            {page === 'search' && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setShowForm(true)
                }}>
                Add to journal
              </button>
            )}
            {(synonyms?.length > 0 ||
              antonyms?.length > 0 ||
              examples?.length > 0 ||
              images?.length > 0) && (
              <button onClick={() => setShowDetails((prevShow) => !prevShow)}>
                {showDetails ? 'Hide' : 'Show more'}
              </button>
            )}
          </div>
          <div className='word--definition'>
            {transformSentence(definition) || 'No definition found'}
          </div>
          {showDetails && (
            <div className='word--details'>
              {synonyms?.length > 0 && (
                <div className='word--details-field'>
                  <div className='word--details-name'>Synonyms:</div>
                  <div className='word--details-content'>
                    {synonyms?.map((synonym, i) => (
                      <div key={synonym + i}>{synonym}</div>
                    ))}
                  </div>
                </div>
              )}
              {antonyms?.length > 0 && (
                <div className='word--details-field'>
                  <div className='word--details-name'>Antonyms:</div>
                  <div className='word--details-content'>
                    {antonyms?.map((antonym, i) => (
                      <div key={antonym + i}>{antonym}</div>
                    ))}
                  </div>
                </div>
              )}
              {examples?.length > 0 && (
                <div className='word--details-field'>
                  <div className='word--details-name'>Examples:</div>
                  <div className='word--details-content'>
                    <ol className='word-details--example-list'>
                      {examples?.map((example, i) => {
                        const formattedExample = transformSentence(example)
                        const lines = formattedExample.split('/')
                        return (
                          <li key={example + i}>
                            {lines.map((line, i) => (
                              <p key={i}>{line}</p>
                            ))}
                            <button
                              onClick={(e) =>
                                speak(e, example, 'samantha', 0.8)
                              }>
                              Play
                            </button>
                          </li>
                        )
                      })}
                    </ol>
                  </div>
                </div>
              )}
              {images.length > 0 && (
                <div className='word--details-field'>
                  <div className='word--details-name'>Images:</div>
                  <div className='word--details-content'>
                    {images.map((image, i) => (
                      <img
                        key={image + i}
                        src={image.src}
                        alt={image.alt}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          {page === 'journal' && wordData.id !== 'undefined' && (
            <button
              type='button'
              onClick={() => handleDelete(wordData.id)}>
              Delete
            </button>
          )}
          {page === 'journal' && wordData.id !== 'undefined' && (
            <button
              type='button'
              onClick={() => setShowForm(true)}>
              Edit
            </button>
          )}
        </div>
        {showForm && (
          <WordForm
            wordData={wordData}
            setShowForm={setShowForm}
            page={page}
            setWords={setWords}
          />
        )}
      </>
    )
  }
}

export default Word
