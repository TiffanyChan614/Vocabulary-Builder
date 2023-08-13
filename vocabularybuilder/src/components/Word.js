import { useState } from 'react'
import WordForm from './WordForm'
import WordDetails from './WordDetails'
import { AiFillSound, AiOutlinePlus } from 'react-icons/ai'
import { FiMoreHorizontal } from 'react-icons/fi'

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
        <div className='word flex flex-col p-3 rounded-xl border-2 border-indigo-100 gap-3'>
          <div className='word--header flex justify-between'>
            <div className='flex gap-5 items-center'>
              <div className='flex gap-1 items-center'>
                <h3 className='text-xl font-bold text-indigo-800'>{word}</h3>
                {pronunciation && (
                  <h4 className='text-lg'>{`[${pronunciation}]`}</h4>
                )}
                <button
                  className='word--audio'
                  onClick={(e) => speak(e, word, 'samantha')}>
                  <AiFillSound size={20} />
                </button>
              </div>

              {partOfSpeech && (
                <h4 className='font-semibold text-md'>
                  {partOfSpeech[0].toUpperCase() + partOfSpeech.slice(1)}
                </h4>
              )}
            </div>

            <div className='flex items-center gap-3'>
              {(synonyms?.length > 0 ||
                antonyms?.length > 0 ||
                examples?.length > 0 ||
                images?.length > 0) && (
                <button onClick={() => setShowDetails((prevShow) => !prevShow)}>
                  <FiMoreHorizontal size={20} />
                </button>
              )}

              {page === 'search' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowForm(true)
                  }}>
                  <AiOutlinePlus size={20} />
                </button>
              )}
            </div>
          </div>
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
