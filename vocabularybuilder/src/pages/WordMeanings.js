import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Word from '../components/Word'
import { getWordData } from '../services/wordAPI'
import Filter from '../components/Filter'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateWordData,
  updateIsLoading,
  toggleShowDetails,
} from '../reducers/wordMeaningsReducer'
import Cookies from 'js-cookie'
import { v4 as uuidv4 } from 'uuid'

const WordMeanings = () => {
  const { word } = useParams()
  const dispatch = useDispatch()
  const { wordData, isLoading, partOfSpeechFilter, showAllDetails } =
    useSelector((state) => state.wordMeanings)

  console.log('showAllDetails', showAllDetails)

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

  const getWordDataFromCookie = () => {
    const cachedWordData = Cookies.get(word)
    if (cachedWordData) {
      try {
        return JSON.parse(cachedWordData)
      } catch (error) {
        console.error('Error parsing cached wordData: ', error)
        return null
      }
    }
    return null
  }

  const setWordDataToCookie = (returnedWordData) => {
    try {
      const serializedWordData = JSON.stringify(returnedWordData)
      Cookies.set(word, serializedWordData, { expires: 30 })
    } catch (error) {
      console.error('Error serializing wordData: ', error)
    }
  }

  const handleDetailsClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const newShowAllDetails = !showAllDetails
    console.log('newShowAllDetails', newShowAllDetails)
    dispatch(toggleShowDetails(newShowAllDetails))
  }

  useEffect(() => {
    async function fetchData() {
      dispatch(updateIsLoading(true))
      let returnedWordData = getWordDataFromCookie()
      // console.log('returnedWordData from cookies', returnedWordData)
      if (!returnedWordData) {
        returnedWordData = await getWordData(word)
        // console.log('returnedWordData from API', returnedWordData)
        if (returnedWordData.results) {
          returnedWordData.results = returnedWordData.results.map((result) => ({
            id: uuidv4(),
            ...result,
          }))
        }
      }
      // console.log('returnedWordData', returnedWordData)
      dispatch(updateWordData(returnedWordData))
      setWordDataToCookie(returnedWordData)
      dispatch(updateIsLoading(false))
    }
    fetchData()
  }, [word])

  let wordDataElement
  if (isLoading || !wordData) {
    wordDataElement = <div>Loading...</div>
  } else if (displayedMeanings && displayedMeanings.length > 0) {
    wordDataElement = displayedMeanings.map((result, i) => (
      <Word
        key={result.word + i}
        wordData={result}
        page='search'
      />
    ))
  } else if (partOfSpeechFilter === '') {
    wordDataElement = (
      <Word
        key={wordData?.word || 'no word'}
        wordData={wordData}
        page='search'
      />
    )
  }

  return (
    <div className='search--word-meanings flex flex-col gap-5 px-2'>
      <nav className='flex items-center flex-wrap md:justify-between gap-3'>
        <Filter page='search' />
        <button
          onClick={handleDetailsClick}
          className='py-1 px-2 border-2 border-indigo-100 rounded-lg text-sm font-semibold hover:bg-indigo-100 hover:text-indigo-800'>
          {showAllDetails ? 'Hide all details' : 'Show all details'}
        </button>
      </nav>
      {wordDataElement}
    </div>
  )
}

export default WordMeanings
