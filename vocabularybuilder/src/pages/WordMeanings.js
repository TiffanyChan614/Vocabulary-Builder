import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Word from '../components/Word'
import { getWordData } from '../services/wordAPI'

const WordMeanings = () => {
  const { word } = useParams()
  const [wordData, setWordData] = useState([])

  useEffect(() => {
    async function fetchData() {
      const returnedWordData = await getWordData(word)
      setWordData(returnedWordData)
    }
    fetchData()
  }, [word])

  let wordDataElement
  if (wordData?.results) {
    wordDataElement = wordData?.results?.map((result, i) => (
      <Word
        key={wordData.word + i}
        wordData={{
          word: wordData.word,
          pronunciation: wordData.pronunciation?.all,
          result: result,
        }}
      />
    ))
  } else {
    wordDataElement = (
      <Word
        key={wordData?.word || 'no word'}
        wordData={{
          word: wordData?.word || 'no word',
          pronunciation: null,
          result: null,
        }}
      />
    )
  }

  return <div className='search--word-meanings'>{wordDataElement}</div>
}

export default WordMeanings
