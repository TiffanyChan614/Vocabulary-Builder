import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Word from '../../components/Features/Word/Word'
import { getWordData } from '../../services/wordAPI'
import Filter from '../../components/Common/Filter'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateWordData,
  updateIsLoading,
  toggleMeaningsShowDetails,
} from '../../reducers/wordMeaningsReducer'
import { updateSearchCurrentPage } from '../../reducers/searchReducer'

const WordMeanings = () => {
  const { word } = useParams()
  const dispatch = useDispatch()
  const {
    wordData,
    isLoading,
    partOfSpeechFilter,
    showAllDetails,
    showDetails,
  } = useSelector((state) => state.wordMeanings)

  console.log('showAllDetails', showAllDetails)
  console.log('showDetails', showDetails)

  // console.log('word data in WordMeanings', wordData)

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
    dispatch(toggleMeaningsShowDetails(!showAllDetails))
  }

  useEffect(() => {
    async function fetchData() {
      dispatch(updateIsLoading(true))
      let returnedWordData = await getWordData(word)
      console.log('returnedWordData', returnedWordData)
      dispatch(updateWordData(returnedWordData))
      dispatch(updateIsLoading(false))
    }
    fetchData()
  }, [word])

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
    }

    if (partOfSpeechFilter === '') {
      return (
        <Word
          key={wordData.word || 'no word'}
          wordData={wordData}
          page='search'
        />
      )
    }

    return null
  })()

  return (
    <div className='search--word-meanings flex flex-col gap-5 px-2'>
      <nav className='flex items-center flex-wrap md:justify-between gap-3'>
        <Filter page='search' />
        <div className='flex justify-between w-full items-center'>
          <Link
            to='..'
            className='ml-2 underline text-sm hover:text-indigo-800 md:text-md'
            onClick={() => dispatch(updateSearchCurrentPage('search'))}>
            Back
          </Link>
          <button
            onClick={handleDetailsClick}
            className='py-1 px-3 border-2 border-indigo-100 rounded-lg text-sm font-semibold hover:bg-indigo-100 hover:text-indigo-800'>
            {showAllDetails ? 'Hide all details' : 'Show all details'}
          </button>
        </div>
      </nav>
      {wordDataElement}
    </div>
  )
}

export default WordMeanings
