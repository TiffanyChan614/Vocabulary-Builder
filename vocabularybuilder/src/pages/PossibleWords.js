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

  const wordStyleClassName =
    'border-2 border-gray-100 p-3 rounded-xl text-lg font-medium text-indigo-900 hover:border-indigo-100 hover:bg-indigo-100 hover:text-indigo-900 select-none'

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
          <div className={wordStyleClassName}>{word}</div>
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
      <div className='search--matched-words flex flex-col gap-4'>
        {matchedWordsElement}
      </div>
      <Outlet />
    </div>
  )
}

export default PossibleWords
