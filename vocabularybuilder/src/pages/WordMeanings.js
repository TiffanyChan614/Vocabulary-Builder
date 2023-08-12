import { useState, useEffect } from 'react'
import { useParams, NavLink, Link, useSearchParams } from 'react-router-dom'
import Word from '../components/Word'
import { getWordData } from '../services/wordAPI'

const WordMeanings = () => {
  const { word } = useParams()
  const [wordData, setWordData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()

  const partOfSpeechFilter = searchParams.get('partOfSpeech')

  let displayedMeanings

  if (partOfSpeechFilter) {
    if (partOfSpeechFilter === 'other') {
      displayedMeanings = wordData?.results?.filter(
        (result) =>
          result.partOfSpeech !== 'noun' &&
          result.partOfSpeech !== 'verb' &&
          result.partOfSpeech !== 'adjective' &&
          result.partOfSpeech !== 'adverb'
      )
    } else {
      displayedMeanings = wordData?.results?.filter(
        (result) => result.partOfSpeech === partOfSpeechFilter
      )
    }
  } else {
    displayedMeanings = wordData?.results
  }

  console.log('word inside WordMeanings', word)
  console.log('wordData', wordData)

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      let returnedWordData = await getWordData(word)
      setWordData(returnedWordData)
      setIsLoading(false)
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
  } else {
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
    <div className='search--word-meanings'>
      <nav>
        <NavLink to='..'>Back</NavLink>
        <Link to='?partOfSpeech=noun'>Nouns</Link>
        <Link to='?partOfSpeech=verb'>Verbs</Link>
        <Link to='?partOfSpeech=adjective'>Adjectives</Link>
        <Link to='?partOfSpeech=adverb'>Adverbs</Link>
        <Link to='?partOfSpeech=other'>Other</Link>
        <Link to='.'>Clear</Link>
      </nav>
      {wordDataElement}
    </div>
  )
}

export default WordMeanings
