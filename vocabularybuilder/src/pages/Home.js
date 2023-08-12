import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { getRandomWord } from '../services/wordAPI'

const Home = () => {
  const [word, setWord] = useState(null)

  const fetchRandomWord = async () => {
    let word = await getRandomWord()
    while (true) {
      console.log('fetching random word')
      word = await getRandomWord()
      console.log('new word', word)

      if (word && word.results && word.results.length > 0) {
        return word.word
      }
    }
  }

  useEffect(() => {
    const getWordOfTheDay = async () => {
      const today = new Date().toISOString().slice(0, 10)
      const storedWord = localStorage.getItem('wordOfTheDay')
      const storedDate = localStorage.getItem('wordOfTheDayDate')
      if (storedDate === today && storedWord) {
        return storedWord
      } else {
        const word = await fetchRandomWord()
        localStorage.setItem('wordOfTheDay', word)
        localStorage.setItem('wordOfTheDayDate', today)
        return word
      }
    }
    getWordOfTheDay().then((word) => setWord(word))
  }, [])

  console.log('word', word)

  return (
    <div>
      <h1>Vocabulary Builder</h1>
      <p>Welcome to Vocabulary Builder!</p>
      <div className='home--word-of-the-day'>
        <h3>Word of the day</h3>
        <p>{word}</p>
        <NavLink to={`search/${word}`}>Learn this word</NavLink>
      </div>
      <div className='home--search'>
        <p>Don't know the meaning of a word?</p>
        <NavLink to='/search'>Search</NavLink>
      </div>
    </div>
  )
}

export default Home
