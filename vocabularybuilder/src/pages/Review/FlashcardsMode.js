import { useDispatch, useSelector } from 'react-redux'
import {
  updateFlashcardsInSession,
  updateFlashcardsMode,
  updateFlashcardsNumber,
  updateFlashcardsWordArray,
} from '../../reducers/flashcardsReducer'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Common/Button'
import { getInitWordArray } from '../../utils/reviewHelper'
import NumberChoice from '../../components/Features/Review/NumberChoice'

const FlashcardsMode = () => {
  const { mode, number } = useSelector((state) => state.flashcards)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const words = (() => {
    try {
      return JSON.parse(localStorage.getItem('journal'))
    } catch {
      return []
    }
  })()

  const minNum = Math.min(5, words.length)

  const modeButtonStyleClassName = (buttonMode) => {
    const baseStyle =
      'border-2 text-gray-600 rounded-xl py-2 px-4 w-full flex justify-center items-center hover:font-semibold'
    const colorStyle = () => {
      switch (buttonMode) {
        case 'wordToMeaning':
          return (
            'border-amber-100 hover:bg-amber-100' +
            (mode.name === 'wordToMeaning' ? ' bg-amber-100 font-semibold' : '')
          )
        case 'meaningToWord':
          return (
            'border-sky-100 hover:bg-sky-100' +
            (mode.name === 'meaningToWord' ? ' bg-sky-100 font-semibold' : '')
          )
        case 'mixed':
          return (
            'border-rose-100 hover:bg-rose-100' +
            (mode.name === 'mixed' ? ' bg-rose-100 font-semibold' : '')
          )
        default:
          return ''
      }
    }
    return baseStyle + ' ' + colorStyle()
  }

  const handleModeClick = (e) => {
    e.stopPropagation()
    dispatch(
      updateFlashcardsMode(modeButtons.find((b) => b.name === e.target.name))
    )
  }

  const handleStart = (e) => {
    e.stopPropagation()
    if (mode === '') {
      e.preventDefault()
      window.alert('Please select a mode')
    } else if (number === 0) {
      e.preventDefault()
      window.alert('Please select the number of flashcards')
    } else {
      dispatch(updateFlashcardsWordArray(getInitWordArray(words, number, mode)))
      dispatch(updateFlashcardsInSession(true))
      navigate(mode === '' ? '' : '0')
    }
  }

  const handleNumberClick = (e) => {
    e.stopPropagation()
    dispatch(updateFlashcardsNumber(parseInt(e.target.name)))
  }

  const modeButtons = [
    { name: 'wordToMeaning', text: 'Show Word, Guess Meaning' },
    { name: 'meaningToWord', text: 'Show Meaning, Guess Word' },
    { name: 'mixed', text: 'Mixed Mode' },
  ]

  return (
    <div className='card flex flex-col gap-5 text-center items-center'>
      <div className='card--mode flex flex-col gap-3 w-full sm:w-3/4'>
        <h2 className='text-lg font-bold'>Please select a mode:</h2>
        <div className='flex flex-col gap-4 w-full'>
          {modeButtons.map((button) => (
            <button
              key={button.name}
              name={button.name}
              onClick={handleModeClick}
              className={modeButtonStyleClassName(button.name)}>
              {button.text}
            </button>
          ))}
        </div>
      </div>
      <NumberChoice
        choiceArray={[minNum, 10, 15, 20]}
        wordsLength={words?.length}
        number={number}
        prompt='Pease select the number of flashcards:'
        handleNumberClick={handleNumberClick}
      />
      <Button
        onClick={handleStart}
        bgColor='indigo'
        size='lg'
        className='mt-4 font-semibold'>
        Start
      </Button>
      <div className='mt-7 text-center'>
        <span className='font-bold'>Reminder: </span>If you switch to other
        pages in the middle of a review session, you will lose your current
        review progress.
      </div>
    </div>
  )
}

export default FlashcardsMode
