import { useState } from 'react'
const Word = ({ wordData }) => {
  console.log(wordData)
  const [showDetails, setShowDetails] = useState(false)

  if (wordData.word === '') {
    return null
  }
  return (
    <div
      className='word'
      onClick={() => setShowDetails((prevShow) => !prevShow)}>
      <h3>{wordData.word}</h3>
      {wordData.pronunciation && <h4>{`[${wordData.pronunciation}]`}</h4>}
      <h4>{wordData.result?.partOfSpeech}</h4>
      <div>
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
                    {example[0].toUpperCase() + example.slice(1) + '.'}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default Word
