import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getRandomWord } from '../services/wordAPI'

const Home = () => {
  const [word, setWord] = useState(null)
  const divClassName =
    'border-2 rounded-xl border-indigo-100 py-5 px-6 w-full mx-auto text-center md:px-10'

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
    <div className='flex flex-col gap-3 w-full items-center max-w-screen-md'>
      <h1 className='text-3xl font-bold md:text-4xl'>Vocabulary Builder</h1>
      <p className='text-lg font-bold md:text-xl'>
        Welcome to Vocabulary Builder!
      </p>
      <div className={`home--word-of-the-day ${divClassName} mt-3`}>
        <h3 className='text-lg font-bold'>Word of the day</h3>
        <p className='text-xl font-bold text-indigo-800 my-4'>{word}</p>
        <Link
          to={`search/${word}`}
          className='text-md hover:text-indigo-800 hover:underline select-none'>
          Learn this word
        </Link>
      </div>
      <div className={`home--search ${divClassName}`}>
        <h3 className='text-lg font-bold'>Don't know the meaning of a word?</h3>
        <button className='mt-4 text-md font-bold py-2 px-4 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600'>
          <Link
            to='/search'
            className='select-none'>
            Search
          </Link>
        </button>
      </div>
    </div>
  )
}

export default Home
