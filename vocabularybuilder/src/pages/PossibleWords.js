import { useState, useEffect, useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { getMatchedWords } from '../services/wordAPI'
import { SearchContext } from '../pages/Search'
const PossibleWords = () => {
  const { searchValue, setSearchValue } = useContext(SearchContext)
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
      <div className='search--matched-words'>{matchedWordsElement}</div>
      <Outlet />
    </div>
  )
}

export default PossibleWords
