import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Word from '../components/Word'
import { getWordData } from '../services/wordAPI'
import Filter from '../components/Filter'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateWordData,
  updateIsLoading,
} from '../reducers/wordMeaningsReducer'

const WordMeanings = () => {
  const { word } = useParams()
  const dispatch = useDispatch()
  const { wordData, isLoading, partOfSpeechFilter } = useSelector(
    (state) => state.wordMeanings
  )

  let displayedMeanings

  console.log('partOfSpeechFilter', partOfSpeechFilter)
  console.log('wordData partOfSpeech', wordData?.results?.partOfSpeech)
  console.log(
    'partOfSpeechFilter match',
    wordData?.results?.partOfSpeech === partOfSpeechFilter
  )

  if (partOfSpeechFilter !== '') {
    if (partOfSpeechFilter === 'other') {
      displayedMeanings = wordData?.results?.filter(
        (result) =>
          result.partOfSpeech !== 'noun' &&
          result.partOfSpeech !== 'verb' &&
          result.partOfSpeech !== 'adjective' &&
          result.partOfSpeech !== 'adverb'
      )
    } else {
      console.log('there is a specific filter')
      displayedMeanings = wordData?.results?.filter(
        (result) => result.partOfSpeech === partOfSpeechFilter
      )
      console.log('displayedMeanings', displayedMeanings)
    }
  } else {
    displayedMeanings = wordData?.results
  }

  console.log('word inside WordMeanings', word)
  console.log('wordData', wordData)

  useEffect(() => {
    async function fetchData() {
      dispatch(updateIsLoading(true))
      let returnedWordData = await getWordData(word)
      dispatch(updateWordData(returnedWordData))
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
        key={wordData.word + i}
        wordData={{
          word: wordData?.word || 'no word',
          pronunciation: wordData.pronunciation?.all,
          partOfSpeech: result?.partOfSpeech || null,
          definition: result?.definition || null,
          synonyms: result?.synonyms || null,
          antonyms: result?.antonyms || null,
          examples: result?.examples || null,
          images: [],
        }}
        page='search'
      />
    ))
  } else if (partOfSpeechFilter === '') {
    wordDataElement = (
      <Word
        key={wordData?.word || 'no word'}
        wordData={{
          word: wordData?.word || 'no word',
          pronunciation: null,
          partOfSpeech: null,
          definition: null,
          synonyms: null,
          antonyms: null,
          examples: null,
          images: [],
        }}
      />
    )
  }

  return (
    <div className='search--word-meanings flex flex-col gap-5 px-2'>
      <nav className='flex items-center flex-wrap md:justify-between gap-3'>
        <Filter page='search' />
      </nav>
      {wordDataElement}
    </div>
  )
}

export default WordMeanings
