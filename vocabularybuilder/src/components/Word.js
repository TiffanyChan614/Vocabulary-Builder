import { useState } from 'react'
import WordDetails from './WordDetails'
import WordHeader from './WordHeader'

const Word = ({ wordData, page }) => {
  console.log('word', wordData)
  const [showDetails, setShowDetails] = useState(false)

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
    const { definition, synonyms, antonyms, examples, images } = wordData
    return (
      <div className='word flex flex-col p-3 rounded-xl border-2 border-indigo-100 gap-3'>
        <WordHeader
          wordData={wordData}
          page={page}
          speak={speak}
          setShowDetails={setShowDetails}
        />
        <div className='word--definition'>
          {transformSentence(definition) || 'No definition found'}
        </div>
        {showDetails && (
          <div className='word--details flex flex-col gap-3'>
            {synonyms && synonyms?.length > 0 && (
              <WordDetails
                fieldName='Synonyms'
                fieldData={synonyms}
              />
            )}
            {antonyms && antonyms?.length > 0 && (
              <WordDetails
                fieldName='Antonyms'
                fieldData={antonyms}
              />
            )}
            {examples && examples.length > 0 && (
              <WordDetails
                fieldName='Examples'
                fieldData={examples}
                transformSentence={transformSentence}
                speak={speak}
              />
            )}
            {images && images.length > 0 && (
              <WordDetails
                fieldName='Images'
                fieldData={images}
              />
            )}
          </div>
        )}
      </div>
    )
  }
}

export default Word
