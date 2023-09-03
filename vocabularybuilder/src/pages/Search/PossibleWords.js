import { useEffect, useRef } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { getMatchedWords } from '../../services/wordAPI'
import { useSelector, useDispatch } from 'react-redux'
import {
  updateMatchedWords,
  updateIsLoading,
} from '../../reducers/possibleWordsReducer'
import { updateSearchCurrentPage } from '../../reducers/searchReducer'

const cache = {}

const PossibleWords = () => {
  const dispatch = useDispatch()
  const { searchValue } = useSelector((state) => state.search)
  const { matchedWords, isLoading } = useSelector(
    (state) => state.possibleWords
  )
  const isFirstRender = useRef(true)

  const wordStyleClassName =
    'border-2 border-gray-100 p-3 rounded-xl text-lg font-medium text-indigo-900 hover:border-indigo-100 hover:bg-indigo-100 hover:text-indigo-900 select-none'

  console.log('searchValue in possibleWords', searchValue)

  useEffect(() => {
    async function fetchData() {
      if (searchValue === '') {
        return
      }
      if (cache[searchValue]) {
        dispatch(updateMatchedWords(cache[searchValue]))
      } else {
        dispatch(updateIsLoading(true))
        const returnedWords = await getMatchedWords(searchValue.toLowerCase())
        cache[searchValue.toLowerCase()] = returnedWords.results.data
        dispatch(updateMatchedWords(returnedWords.results.data))
        dispatch(updateIsLoading(false))
      }
    }
    const newTimeoutId = setTimeout(() => {
      fetchData()
    }, 200)
    return () => {
      clearTimeout(newTimeoutId)
    }
  }, [searchValue])

  const matchedWordsElement = (() => {
    if (isLoading && searchValue !== '') {
      return <div>Loading...</div>
    }

    if (searchValue === '') {
      return null
    }

    if (matchedWords.length > 0) {
      return matchedWords.map((word, i) => (
        <NavLink
          to={`${word}`}
          className='matched-word'
          key={word + i}
          onClick={() => dispatch(updateSearchCurrentPage(`search/${word}`))}>
          <div className={wordStyleClassName}>{word}</div>
        </NavLink>
      ))
    }

    if (!isFirstRender.current) {
      return <div>Word not found</div>
    }

    return null
  })()

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
