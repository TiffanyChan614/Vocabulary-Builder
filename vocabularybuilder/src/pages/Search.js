import { useState, useEffect } from 'react'
import Word from '../components/Word'
import { getWordData, getMatchedWords } from '../services/wordAPI'

const Search = () => {
  const [searchValue, setSearchValue] = useState('')
  const [matchedWords, setMatchedWords] = useState([])
  const [wordData, setWordData] = useState([])
  const [chosenWord, setChosenWord] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      if (searchValue === '') {
        return
      }
      const returnedWords = await getMatchedWords(searchValue)
      setMatchedWords(returnedWords.results.data)
      setIsLoading(false)
    }
    const newTimeoutId = setTimeout(() => {
      fetchData()
    }, 500)
    setWordData([])
    return () => {
      clearTimeout(newTimeoutId)
    }
  }, [searchValue])

  useEffect(() => {
    console.log('chosen word', chosenWord)
    async function fetchData() {
      setIsLoading(true)
      if (chosenWord === '') {
        return
      }
      const returnedWordData = await getWordData(chosenWord)
      setWordData(returnedWordData)
      setIsLoading(false)
    }
    fetchData()
  }, [chosenWord])

  useEffect(() => {
    console.log('wordData', wordData)
  }, [wordData])

  let wordDataElement
  if (wordData?.results) {
    wordDataElement = wordData?.results?.map((result, i) => (
      <Word
        key={wordData.word + i}
        wordData={{
          word: wordData.word,
          pronounciation: wordData.pronunciation?.all || null,
          result: result,
        }}
      />
    ))
  } else {
    wordDataElement = (
      <Word
        key={wordData?.word || 'no word'}
        wordData={{
          word: wordData?.word || '',
          pronounciation: null,
          result: null,
        }}
      />
    )
  }

  let matchedWordsElement

  if (isLoading && searchValue !== '') {
    matchedWordsElement = <div>Loading...</div>
  } else if (searchValue === '') {
    matchedWordsElement = null
  } else if (matchedWords.length > 0) {
    matchedWordsElement = matchedWords?.map((word, i) => (
      <div
        className='matched-word'
        key={word + i}
        onClick={() => {
          setChosenWord(word)
        }}>
        {word}
      </div>
    ))
  } else {
    matchedWordsElement = <div>Word not found</div>
  }

  return (
    <div>
      <div className='search--search-field'>
        <input
          type='text'
          id='search'
          value={searchValue}
          placeholder='Search for a word'
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <div className='search--user-input'>{searchValue}</div>
      </div>
      <div className='search--matched-words'>{matchedWordsElement}</div>
      <div className='search--word-data'>{wordDataElement}</div>
    </div>
  )
}

export default Search
