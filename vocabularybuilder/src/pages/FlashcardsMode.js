import { useDispatch, useSelector } from 'react-redux'
import {
  updateFlashcardsMode,
  updateFlashcardsWordArray,
} from '../reducers/flashcardsReducer'
import { Link } from 'react-router-dom'

const FlashcardsMode = () => {
  const { mode } = useSelector((state) => state.flashcards)
  const { words } = useSelector((state) => state.journal)
  const dispatch = useDispatch()

  const handleModeClick = (e) => {
    e.stopPropagation()
    dispatch(updateFlashcardsMode(e.target.name))
  }

  const shuffleArray = (array) => {
    let currentIndex = array.length
    let temporaryValue
    let randomIndex

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1

      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }
  }

  const initWordArray = () => {
    const wordArray = words.map((word) => ({
      word: word.word,
      definition: word.definition,
      images: word.images,
    }))
    shuffleArray(wordArray)
    dispatch(updateFlashcardsWordArray(wordArray))
  }

  const handleStart = (e) => {
    if (mode === '') {
      e.preventDefault()
      window.alert('Please select a mode')
    } else {
      initWordArray()
    }
  }

  return (
    <div>
      <h2>Please select a mode:</h2>
      <div className='flex flex-col'>
        <button
          name='wordToMeaning'
          onClick={handleModeClick}>
          Show Word, Guess Meaning
        </button>
        <button
          name='meaningToWord'
          onClick={handleModeClick}>
          Show Meaning (and Images if available), Guess Word
        </button>
        <button
          name='mixed'
          onClick={handleModeClick}>
          Mixed Mode
        </button>
      </div>
      <Link
        to={mode === '' ? '' : 'card'}
        onClick={handleStart}>
        <button>Start</button>
      </Link>
    </div>
  )
}

export default FlashcardsMode
