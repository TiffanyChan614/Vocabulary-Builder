import React, { useEffect, useRef, useMemo } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { getMatchedWords } from '../../services/wordAPI'
import { useSelector, useDispatch } from 'react-redux'
import {
  setMatchedWords as setPossibleWordsMatchedWords,
  setIsLoading as setPossibleWordsIsLoading,
  setError as setPossibleWordsError
} from '../../reducers/possibleWordsReducer'

const CACHE_EXPIRATION_MS = 5 * 60 * 1000 // 5 min

const PossibleWords = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { searchValue } = useSelector((state) => state.search)
  const { matchedWords, isLoading, error } = useSelector(
    (state) => state.possibleWords
  )
  const isFirstRender = useRef(true)

  const cache = useMemo(() => ({}), [])

  const wordStyleClassName =
    'cursor-pointer border-2 border-gray-100 p-3 rounded-xl text-lg font-medium text-indigo-900 hover:border-indigo-100 hover:bg-indigo-100 hover:text-indigo-900 select-none'

  console.log('searchValue in possibleWords', searchValue)

  useEffect(() => {
    const isCacheExpired = (cacheItem) =>
      cacheItem && Date.now() - cacheItem.timestamp > CACHE_EXPIRATION_MS

    const cleanupExpiredCache = () => {
      Object.keys(cache).forEach((key) => {
        if (isCacheExpired(cache[key])) {
          delete cache[key]
        }
      })
    }
    async function fetchData () {
      if (searchValue === '' || error) {
        return
      }
      try {
        cleanupExpiredCache()
        if (cache[searchValue] && !isCacheExpired(cache[searchValue])) {
          dispatch(setPossibleWordsMatchedWords(cache[searchValue]))
        } else {
          dispatch(setPossibleWordsIsLoading(true))
          const returnedWords = await getMatchedWords(searchValue.toLowerCase())
          cache[searchValue.toLowerCase()] = returnedWords.results.data
          dispatch(setPossibleWordsMatchedWords(returnedWords.results.data))
        }
        dispatch(setPossibleWordsError(null))
      } catch (error) {
        dispatch(
          setPossibleWordsError({
            ...error,
            message:
              'Sorry, we could not fetch possible words. Please try again later.'
          })
        )
      } finally {
        dispatch(setPossibleWordsIsLoading(false))
      }
    }
    const newTimeoutId = setTimeout(() => {
      fetchData()
    }, 200)
    return () => {
      clearTimeout(newTimeoutId)
    }
  }, [searchValue, dispatch, error, cache])

  const matchedWordsElement = (() => {
    if (isLoading && searchValue !== '') {
      return <div>Loading...</div>
    }

    if (searchValue === '') {
      return null
    }

    if (matchedWords.length > 0) {
      return matchedWords.map((word, i) => (
        <div
          key={word + i}
          className={wordStyleClassName}
          onClick={() => navigate(`${word}`)}>
          {word}
        </div>
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
        {error ? <div>Error: {error.message}</div> : matchedWordsElement}
      </div>
      <Outlet />
    </div>
  )
}

export default PossibleWords
