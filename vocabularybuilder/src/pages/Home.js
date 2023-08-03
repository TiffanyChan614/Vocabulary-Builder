import { useState, useEffect } from 'react'

const Home = () => {
  const [searchValue, setSearchValue] = useState('')
  const [matchedWords, setMatchedWords] = useState([])

  useEffect(() => {
    if (searchValue === '') {
      return
    }
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchValue}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setMatchedWords(data)
      })
      .catch((err) => console.error(err))
  }, [searchValue])

  return (
    <div>
      <h1>Vocabulary Builder</h1>
      <p>Welcome to vocabulary builder!</p>
      <div className='search-field'>
        <label htmlFor='search'>Don't know the meaning of a word?</label>
        <input
          type='text'
          id='search'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <div className='user-input'>{searchValue}</div>
      </div>
    </div>
  )
}

export default Home
