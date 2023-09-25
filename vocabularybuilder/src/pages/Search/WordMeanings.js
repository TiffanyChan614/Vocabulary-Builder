import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Word from '../../components/Features/Word/Word'
import { getWordData } from '../../services/wordAPI'
import Filter from '../../components/Common/Filter'
import { useDispatch, useSelector } from 'react-redux'
import {
  setWordData as setMeaningsWordData,
  setIsLoading as setMeaningsIsLoading,
  setShowAllDetails as setMeaningsShowAllDetails,
  setError as setMeaningsError,
  setFilterOpen as setMeaningsFilterOpen
} from '../../reducers/wordMeaningsReducer'
import { setCurrentPage as setSearchCurrentPage } from '../../reducers/searchReducer'
import useIsMobile from '../../hooks/useIsMobile'

const WordMeanings = () => {
  const { word } = useParams()
  const dispatch = useDispatch()
  const { isMobile } = useIsMobile(1070)
  const {
    wordData,
    isLoading,
    partOfSpeechFilter,
    showAllDetails,
    showDetails,
    error,
    filterOpen
  } = useSelector((state) => state.wordMeanings)

  console.log('showAllDetails', showAllDetails)
  console.log('showDetails', showDetails)

  console.log('word data in WordMeanings', wordData)

  let displayedMeanings

  if (partOfSpeechFilter !== '') {
    if (partOfSpeechFilter === 'other') {
      displayedMeanings = wordData?.filter(
        (result) =>
          result.partOfSpeech !== 'noun' &&
          result.partOfSpeech !== 'verb' &&
          result.partOfSpeech !== 'adjective' &&
          result.partOfSpeech !== 'adverb'
      )
    } else {
      displayedMeanings = wordData?.filter(
        (result) => result.partOfSpeech === partOfSpeechFilter
      )
      // console.log('displayedMeanings', displayedMeanings)
    }
  } else {
    displayedMeanings = wordData
  }

  // console.log('word inside WordMeanings', word)
  // console.log('wordData', wordData)

  const handleDetailsClick = (e) => {
    e.preventDefault()
    dispatch(setMeaningsShowAllDetails(!showAllDetails))
  }

  useEffect(() => {
    async function fetchData () {
      dispatch(setMeaningsIsLoading(true))
      try {
        if (
          wordData.length > 0 &&
          wordData.every((data) => data.word === word)
        ) {
          console.log('wordData already exists')
        } else {
          const returnedWordData = await getWordData(word)
          console.log('returnedWordData', returnedWordData)
          dispatch(setMeaningsWordData(returnedWordData))
          dispatch(setMeaningsError(null))
        }
      } catch (error) {
        dispatch(
          setMeaningsError({
            ...error,
            message:
              'Sorry, we are having trouble fetching the data. Please try again later.'
          })
        )
      } finally {
        dispatch(setMeaningsIsLoading(false))
      }
    }
    fetchData()
  }, [word, dispatch, wordData])

  useEffect(() => {
    dispatch(setSearchCurrentPage(`search/${word}`))
  }, [dispatch, word])

  const wordDataElement = (() => {
    if (isLoading || !wordData) {
      return <div>Loading...</div>
    }

    if (displayedMeanings && displayedMeanings.length > 0) {
      return displayedMeanings.map((result, i) => (
        <Word
          key={result.word + i}
          wordData={result}
          page='search'
        />
      ))
    } else if (partOfSpeechFilter === '') {
      return (
        <Word
          key={wordData.word || 'no word'}
          wordData={wordData}
          page='search'
        />
      )
    } else {
      return (
        <div>
          No results found. Try clearing the filter or switch to other filters.
        </div>
      )
    }
  })()

  return (
    <div className='search--word-meanings flex flex-col gap-5 px-2'>
      <nav className='flex flex-row items-center flex-wrap gap-3 justify-between'>
        <div className='flex flex-row items-center gap-3'>
          <Link
            to='..'
            className='ml-2 underline text-sm hover:text-indigo-800 md:text-md'
            onClick={() => dispatch(setSearchCurrentPage('search'))}>
            Back
          </Link>
          {isMobile
            ? (
                <button
                  className={`text-sm text-gray-700 font-semibold border-2 border-indigo-100 hover:text-indigo-800 hover:bg-indigo-100 py-1 px-3 rounded-lg
                ${filterOpen ? 'bg-indigo-100' : ''}
              `}
                  onClick={() => dispatch(setMeaningsFilterOpen(!filterOpen))}>
                  {filterOpen ? 'Hide' : 'Show'} filter
                </button>
              )
            : (
                <Filter page='search' />
              )}
        </div>
        <button
          onClick={handleDetailsClick}
          className='py-1 px-3 border-2 border-indigo-100 rounded-lg text-sm font-semibold hover:bg-indigo-100 hover:text-indigo-800'>
          {showAllDetails ? 'Hide all details' : 'Show all details'}
        </button>
      </nav>
      {filterOpen && isMobile && (
        <div>
          <Filter page='search' />
        </div>
      )}
      {error ? <div>Error: {error.message}</div> : wordDataElement}
    </div>
  )
}

export default WordMeanings
