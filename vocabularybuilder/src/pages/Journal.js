import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Word from '../components/Word'
import SearchField from '../components/SearchField'

const Journal = () => {
  const [words, setWords] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [filteredWords, setFilteredWords] = useState([])

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
        return prevWords.filter((word) =>
          word.word.toLowerCase().includes(searchValue.toLowerCase())
        )
      })
    } else {
      setFilteredWords(words)
    }
  }, [searchValue, words])

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
            <NavLink to='../search'>Learn some new words!</NavLink>
          </>
        )}
      </div>
    </div>
  )
}

export default Journal
