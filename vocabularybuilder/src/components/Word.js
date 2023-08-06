import { useState } from 'react'
import WordForm from './WordForm'

const Word = ({ wordData }) => {
  console.log('word', wordData)
  const [showDetails, setShowDetails] = useState(false)
  const [showForm, setShowForm] = useState(false)

  console.log('showForm')

  function speak(e, text, voiceName, rate) {
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

  if (wordData.word === 'no word') {
    return <div className='word'>No word found in dictionary</div>
  } else {
    return (
      <>
        <div
          className='word'
          onClick={() => setShowDetails((prevShow) => !prevShow)}>
          <div className='word--header'>
            <h3>{wordData.word}</h3>
            {wordData.pronunciation && <h4>{`[${wordData.pronunciation}]`}</h4>}
            <h4>{wordData.result?.partOfSpeech}</h4>
            <button
              className='word--audio'
              onClick={(e) => speak(e, wordData.word, 'samantha')}>
              Play
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowForm(true)
              }}>
              Add to journal
            </button>
          </div>
          <div className='word--definition'>
            {wordData.result?.definition[0].toUpperCase() +
              wordData.result?.definition.slice(1) || 'No definition found'}
          </div>
          {showDetails && (
            <div className='word--details'>
              {wordData.result?.synonyms?.length > 0 && (
                <>
                  <div className='word--details-name'>Synonyms:</div>
                  <div className='word--details-content'>
                    {wordData.result?.synonyms?.map((synonym, i) => (
                      <div key={synonym + i}>{synonym}</div>
                    ))}
                  </div>
                </>
              )}
              {wordData.result?.antonyms?.length > 0 && (
                <>
                  <div className='word--details-name'>Antonyms:</div>
                  <div className='word--details-content'>
                    {wordData.result?.antonyms?.map((antonym, i) => (
                      <div key={antonym + i}>{antonym}</div>
                    ))}
                  </div>
                </>
              )}
              {wordData.result?.examples?.length > 0 && (
                <>
                  <div className='word--details-name'>Examples:</div>
                  <div className='word--details-content'>
                    {wordData.result?.examples?.map((example, i) => (
                      <div key={example + i}>
                        <p>
                          {example[0].toUpperCase() + example.slice(1) + '.'}
                        </p>
                        <button
                          onClick={(e) => speak(e, example, 'samantha', 0.8)}>
                          Play
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setShowForm(true)
                }}>
                Add to journal
              </button>
            </div>
          )}
        </div>
        {showForm && <WordForm wordData={wordData} />}
      </>
    )
  }
}

export default Word
