import { useState, useEffect, createContext } from 'react'
import { NavLink, useSearchParams } from 'react-router-dom'
import Word from '../components/Word'
import SearchField from '../components/SearchField'
import Filter from '../components/Filter'
import WordForm from '../components/WordForm'

export const JournalContext = createContext()

const Journal = () => {
  const [words, setWords] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [filteredWords, setFilteredWords] = useState([])
  const [sortValue, setSortValue] = useState('updated')
  const [searchParams, setSearchParams] = useSearchParams()
  const [showForm, setShowForm] = useState(false)
  const [formWord, setFormWord] = useState('')

  const sortOptions = {
    updated: (a, b) =>
      new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime(),
    created: (a, b) =>
      new Date(b.created).getTime() - new Date(a.created).getTime(),
    alphabetical: (a, b) => a.word.localeCompare(b.word),
    length: (a, b) => a.word.length - b.word.length,
    partOfSpeech: (a, b) => a.partOfSpeech.localeCompare(b.partOfSpeech),
  }

  useEffect(() => {
    try {
      setWords(JSON.parse(localStorage.getItem('journal')))
      setFilteredWords(JSON.parse(localStorage.getItem('journal')))
    } catch {
      setWords([])
    }
  }, [])

  useEffect(() => {
    console.log('display changes')
    if (searchValue !== '') {
      const newWords = words
        .filter((word) =>
          word.word.toLowerCase().includes(searchValue.toLowerCase())
        )
        .sort(sortOptions[sortValue])
      setFilteredWords(newWords)
    } else {
      console.log('no search')
      const newWords = [...words].sort(sortOptions[sortValue])
      setFilteredWords(newWords)
    }
  }, [searchValue, words, sortValue])

  const handleDelete = (id) => {
    const newWords = words.filter((word) => word.id !== id)
    setWords(newWords)
    setFilteredWords(newWords)
    localStorage.setItem('journal', JSON.stringify(newWords))
  }

  const partOfSpeechFilter = searchParams.get('partOfSpeech')
  let displayedWords
  if (partOfSpeechFilter) {
    if (partOfSpeechFilter === 'other') {
      displayedWords = filteredWords?.filter(
        (word) =>
          word.partOfSpeech !== 'noun' &&
          word.partOfSpeech !== 'verb' &&
          word.partOfSpeech !== 'adjective' &&
          word.partOfSpeech !== 'adverb'
      )
    } else {
      displayedWords = filteredWords?.filter(
        (word) => word.partOfSpeech === partOfSpeechFilter
      )
    }
  } else {
    displayedWords = filteredWords
  }

  return (
    <JournalContext.Provider
      value={{ setShowForm, setFormWord, handleDelete, setWords }}>
      <div className='journal border-2 flex flex-col gap-4'>
        <div className='journal--search'>
          <SearchField
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            placeholder='Search journal'
            handleInputChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className='journal--control'>
          <nav>
            <Filter partOfSpeechFilter={partOfSpeechFilter} />
          </nav>

          <select
            className='journal--sort'
            onChange={(e) => setSortValue(e.target.value)}>
            <option disabled>Sort by</option>
            <option
              value='updated'
              defaultValue>
              Recently updated
            </option>
            <option value='alphabetical'>Alphabetical</option>
            <option value='length'>Length</option>
            <option value='partOfSpeech'>Part of speech</option>
            <option value='created'>Recently created</option>
          </select>
        </div>
        <div className='journal--words'>
          {displayedWords?.length > 0 ? (
            displayedWords.map((word) => (
              <Word
                key={word.id}
                wordData={word}
                page='journal'
                deleteWord={handleDelete}
              />
            ))
          ) : (
            <>
              <p>No words in journal</p>
              <NavLink to='../search'>Search for some new words!</NavLink>
            </>
          )}
        </div>
      </div>
      {showForm && (
        <WordForm
          formWord={formWord}
          page='journal'
          updateWord={(newWords) => setWords(newWords)}
        />
      )}
    </JournalContext.Provider>
  )
}

export default Journal
