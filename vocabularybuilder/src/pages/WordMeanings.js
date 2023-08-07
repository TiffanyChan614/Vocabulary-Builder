import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Word from '../components/Word'
import { getWordData } from '../services/wordAPI'

const WordMeanings = () => {
  const { word } = useParams()
  const [wordData, setWordData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      const returnedWordData = await getWordData(word)
      setWordData(returnedWordData)
      setIsLoading(false)
    }
    fetchData()
  }, [word])

  let wordDataElement
  if (isLoading || !wordData) {
    wordDataElement = <div>Loading...</div>
  } else if (wordData?.results && wordData.results.length > 0) {
    wordDataElement = wordData?.results?.map((result, i) => (
      <Word
        key={wordData.word + i}
        wordData={{
          word: wordData?.word || 'no word',
          pronunciation: wordData.pronunciation?.all,
          partOfSpeech: result?.partOfSpeech || null,
          definition: result?.definition || null,
          synonyms: result?.synonyms || null,
          antonyms: result?.antonyms || null,
          examples: result?.examples || null,
          images: [],
        }}
        page='search'
      />
    ))
  } else {
    wordDataElement = (
      <Word
        key={wordData?.word || 'no word'}
        wordData={{
          word: wordData?.word || 'no word',
          pronunciation: null,
          partOfSpeech: null,
          definition: null,
          synonyms: null,
          antonyms: null,
          examples: null,
          images: [],
        }}
      />
    )
  }

  return (
    <div className='search--word-meanings'>
      <Link to='..'>Back</Link>
      {wordDataElement}
    </div>
  )
}

export default WordMeanings
