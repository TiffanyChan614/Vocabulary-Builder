import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Word from '../components/Word'

const Journal = () => {
  const [words, setWords] = useState([])

  useEffect(() => {
    try {
      setWords(JSON.parse(localStorage.getItem('journal')))
    } catch {
      setWords([])
    }
  }, [])

  return (
    <div className='journal'>
      {words.length > 0 ? (
        words.map((word) => (
          <Word
            wordData={word}
            page='journal'
          />
        ))
      ) : (
        <>
          <p>No words in journal</p>
          <NavLink to='../search'>Learn some new words!</NavLink>
        </>
      )}
    </div>
  )
}

export default Journal
