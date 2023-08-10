import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Word from '../components/Word'
import SearchField from '../components/SearchField'

const Journal = () => {
  const [words, setWords] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [filteredWords, setFilteredWords] = useState([])
  const [sortValue, setSortValue] = useState('updated')

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
    if (searchValue !== '') {
      setFilteredWords((prevWords) => {
        const newWords = prevWords.filter((word) =>
          word.word.toLowerCase().includes(searchValue.toLowerCase())
        )
        return [...newWords].sort(sortOptions[sortValue])
      })
    } else {
      setFilteredWords((prevWords) =>
        [...prevWords].sort(sortOptions[sortValue])
      )
    }
  }, [searchValue, words, sortValue])

  const handleDelete = (id) => {
    const newWords = words.filter((word) => word.id !== id)
    setWords(newWords)
    setFilteredWords(newWords)
    localStorage.setItem('journal', JSON.stringify(newWords))
  }

  return (
    <div className='journal'>
      <div className='journal--search'>
        <SearchField
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          placeholder='Search journal'
          handleInputChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <div className='journal--control'>
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
        {filteredWords?.length > 0 ? (
          filteredWords.map((word) => (
            <Word
              wordData={word}
              page='journal'
              handleDelete={handleDelete}
              setWords={setWords}
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
  )
}

export default Journal
