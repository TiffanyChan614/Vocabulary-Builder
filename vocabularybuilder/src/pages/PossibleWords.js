import { useState, useEffect, useContext, useMemo, useRef } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { getMatchedWords } from '../services/wordAPI'
import { SearchContext } from '../pages/Search'

const cache = {}

const PossibleWords = () => {
  const { searchValue, setSearchValue } = useContext(SearchContext)
  const [matchedWords, setMatchedWords] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const isFirstRender = useRef(true)

  useEffect(() => {
    async function fetchData() {
      if (searchValue === '') {
        return
      }
      if (cache[searchValue]) {
        setMatchedWords(cache[searchValue])
      } else {
        setIsLoading(true)
        const returnedWords = await getMatchedWords(searchValue.toLowerCase())
        cache[searchValue.toLowerCase()] = returnedWords.results.data
        setMatchedWords(returnedWords.results.data)
        setIsLoading(false)
      }
    }
    const newTimeoutId = setTimeout(() => {
      fetchData()
    }, 200)
    return () => {
      clearTimeout(newTimeoutId)
    }
  }, [searchValue])

  const matchedWordsElement = useMemo(() => {
    if (isLoading && searchValue !== '') {
      return <div>Loading...</div>
    } else if (searchValue === '') {
      return null
    } else if (matchedWords.length > 0) {
      return matchedWords?.map((word, i) => (
        <NavLink
          to={`${word}`}
          className='matched-word'
          key={word + i}>
          {word}
        </NavLink>
      ))
    } else if (!isFirstRender.current) {
      return <div>Word not found</div>
    }
  }, [isLoading, searchValue, matchedWords])

  useEffect(() => {
    isFirstRender.current = false
  }, [])

  return (
    <div>
      <div className='search--matched-words'>{matchedWordsElement}</div>
      <Outlet />
    </div>
  )
}

export default PossibleWords
