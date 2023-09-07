import { useEffect } from 'react'
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
} from '../../reducers/wordMeaningsReducer'
import { setCurrentPage as setSearchCurrentPage } from '../../reducers/searchReducer'

const WordMeanings = () => {
  const { word } = useParams()
  const dispatch = useDispatch()
  const {
    wordData,
    isLoading,
    partOfSpeechFilter,
    showAllDetails,
    showDetails,
    error,
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
    async function fetchData() {
      dispatch(setMeaningsIsLoading(true))
      try {
        if (wordData.every((data) => data.word === word)) {
          console.log('wordData already exists')
        } else {
          let returnedWordData = await getWordData(word)
          console.log('returnedWordData', returnedWordData)
          dispatch(setMeaningsWordData(returnedWordData))
          dispatch(setMeaningsError(null))
        }
      } catch (error) {
        dispatch(
          setMeaningsError({
            ...error,
            message:
              'Sorry, we are having trouble fetching the data. Please try again later.',
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
      <nav className='flex items-center flex-wrap md:justify-between gap-3'>
        <Filter page='search' />
        <div className='flex justify-between w-full items-center'>
          <Link
            to='..'
            className='ml-2 underline text-sm hover:text-indigo-800 md:text-md'
            onClick={() => dispatch(setSearchCurrentPage('search'))}>
            Back
          </Link>
          <button
            onClick={handleDetailsClick}
            className='py-1 px-3 border-2 border-indigo-100 rounded-lg text-sm font-semibold hover:bg-indigo-100 hover:text-indigo-800'>
            {showAllDetails ? 'Hide all details' : 'Show all details'}
          </button>
        </div>
      </nav>
      {error ? <div>Error: {error.message}</div> : wordDataElement}
    </div>
  )
}

export default WordMeanings
