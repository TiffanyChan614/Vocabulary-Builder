import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getRandomWord } from '../services/wordAPI'
import {
  setCurrentPage as setSearchCurrentPage,
  setSearchValue as setSearchSearchValue,
} from '../reducers/searchReducer'
import { useDispatch } from 'react-redux'
import Button from '../components/Common/Button'

const Home = () => {
  const [word, setWord] = useState(null)
  const [error, setError] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const divClassName =
    'max-w-screen-md border-2 rounded-xl border-indigo-100 py-5 px-6 w-full mx-auto text-center md:px-10'

  const fetchRandomWord = async (maxRetries = 20) => {
    let retries = 0
    let word = null
    while (retries < maxRetries) {
      try {
        console.log('fetching random word')
        word = await getRandomWord()
        console.log('new word', word)

        if (word?.results?.length > 0) {
          return word.word
        }
      } catch (error) {
        setError(error)
      }
      retries++
    }
  }

  const handleLearnWord = () => {
    dispatch(setSearchCurrentPage(`search/${word}`))
    dispatch(setSearchSearchValue(word))
  }

  const handleSearchClick = () => {
    dispatch(setSearchCurrentPage('search'))
    navigate('/search')
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
    getWordOfTheDay()
      .then((word) => {
        setError(null)
        setWord(word)
      })
      .catch((error) =>
        setError({
          ...error,
          message:
            'Sorry, we could not fetch the word of the day. Please try refreshing the page.',
        })
      )
  }, [])

  console.log('word', word)

  return (
    <div className='flex flex-col gap-2 md:gap-3 w-full items-center'>
      <h1 className='text-2xl font-bold md:text-4xl text-center'>
        Vocabulary Builder
      </h1>
      <p className='text-lg font-bold md:text-xl text-center'>
        Welcome to Vocabulary Builder!
      </p>
      <div className={`home--word-of-the-day ${divClassName} mt-2 md:mt-3`}>
        {error ? (
          <div>Error: {error.message}</div>
        ) : (
          <>
            <h3 className='text-lg font-bold'>Word of the day</h3>
            <p className='text-xl font-bold text-indigo-800 my-4'>{word}</p>
            <Link
              to={`search/${word}`}
              className='text-md hover:text-indigo-800 hover:underline select-none'
              onClick={handleLearnWord}>
              Learn this word
            </Link>
          </>
        )}
      </div>
      <div className={`home--search ${divClassName}`}>
        <h3 className='text-lg font-bold'>Don't know the meaning of a word?</h3>
        <Button
          bgColor='indigo'
          size='md'
          className='mt-4 font-semibold select-none'
          onClick={handleSearchClick}>
          Search
        </Button>
      </div>
    </div>
  )
}

export default Home
