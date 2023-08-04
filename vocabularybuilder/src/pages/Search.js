import { useState, useEffect } from 'react'
import Word from '../components/Word'
import { getWordData, getMatchedWords } from '../services/wordAPI'
import { Link, Outlet } from 'react-router-dom'

const Search = () => {
  const [searchValue, setSearchValue] = useState('')
  const [matchedWords, setMatchedWords] = useState([])
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
    return () => {
      clearTimeout(newTimeoutId)
    }
  }, [searchValue])

  let matchedWordsElement

  if (isLoading && searchValue !== '') {
    matchedWordsElement = <div>Loading...</div>
  } else if (searchValue === '') {
    matchedWordsElement = null
  } else if (matchedWords.length > 0) {
    matchedWordsElement = matchedWords?.map((word, i) => (
      <Link
        to={`${word}`}
        className='matched-word'
        key={word + i}>
        {word}
      </Link>
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
      <Outlet />
    </div>
  )
}

export default Search
