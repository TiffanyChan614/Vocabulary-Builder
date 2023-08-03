import { useState, useEffect } from 'react'
import Word from '../components/Word'
import { getWord } from '../services/wordAPI'

const Home = () => {
  const [searchValue, setSearchValue] = useState('')
  const [matchedWords, setMatchedWords] = useState([])

  useEffect(() => {
    async function fetchData() {
      if (searchValue === '') {
        return
      }
      const data = await getWord(searchValue)
      setMatchedWords(data)
    }
    const newTimeoutId = setTimeout(() => {
      fetchData()
    }, 500)
    return () => {
      clearTimeout(newTimeoutId)
    }
  }, [searchValue])

  useEffect(() => {
    console.log('matchedWords', matchedWords)
  }, [matchedWords])

  const matchedWordsElement = matchedWords?.results?.map((result, i) => (
    <Word
      key={matchedWords.word + i}
      wordData={{
        word: matchedWords.word,
        pronounciation: matchedWords.pronunciation.all,
        result: result,
      }}
    />
  ))

  return (
    <div>
      <h1>Vocabulary Builder</h1>
      <p>Welcome to vocabulary builder!</p>
      <div className='search-field'>
        <label htmlFor='search'>Don't know the meaning of a word?</label>
        <input
          type='text'
          id='search'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <div className='user-input'>{searchValue}</div>
      </div>
      <div className='matched-words'>
        {matchedWords === null ? (
          <div>Word not found</div>
        ) : (
          matchedWordsElement
        )}
      </div>
    </div>
  )
}

export default Home
