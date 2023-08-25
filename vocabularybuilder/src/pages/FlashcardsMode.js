import { useDispatch, useSelector } from 'react-redux'
import {
  updateFlashcardsInSession,
  updateFlashcardsMode,
  updateFlashcardsNumber,
  updateFlashcardsWordArray,
} from '../reducers/flashcardsReducer'
import { useNavigate } from 'react-router-dom'

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

  const numberButtonStyleClassName = (buttonNumber) => {
    const baseStyle =
      'border-2 text-gray-600 rounded-xl py-2 px-4 w-full flex justify-center items-center hover: border-indigo-100 hover:font-semibold hover:bg-indigo-100'
    const activeStyle = 'bg-indigo-100 font-semibold border-indigo-100'
    return (
      baseStyle + (number === Number(buttonNumber) ? ' ' + activeStyle : '')
    )
  }
  const handleModeClick = (e) => {
    e.stopPropagation()
    dispatch(
      updateFlashcardsMode(modeButtons.find((b) => b.name === e.target.name))
    )
  }

  const shuffleArray = (array) => {
    let currentIndex = array.length
    let temporaryValue
    let randomIndex
    let arrayCopy = [...array]

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1

      temporaryValue = arrayCopy[currentIndex]
      arrayCopy[currentIndex] = arrayCopy[randomIndex]
      arrayCopy[randomIndex] = temporaryValue
    }

    return arrayCopy
  }

  const initWordArray = () => {
    const selectedWordData = words
      .sort((a, b) => a.points - b.points)
      .slice(0, number)
    const wordArray =
      selectedWordData?.map((word) => {
        const images = word.images || []
        const image =
          images.length > 0
            ? images[Math.floor(Math.random() * images.length)]
            : null
        console.log('image', image)

        let frontCardType
        if (mode.name === 'wordToMeaning') {
          frontCardType = 'word'
        } else if (mode.name === 'meaningToWord') {
          frontCardType = 'definitionWithImages'
        } else if (mode.name === 'mixed') {
          frontCardType = Math.random() < 0.5 ? 'word' : 'definitionWithImages'
        }

        return {
          word: word.word,
          id: word.id,
          originalPoints: word.points,
          pointsEarned: null,
          newPoints: word.points,
          front:
            frontCardType === 'word'
              ? { type: 'word', word: word.word }
              : {
                  type: 'definitionWithImages',
                  definition: word.definition,
                  image: image,
                },
          back: frontCardType === 'word' ? word.definition : word.word,
        }
      }) || []

    const shuffledArray = shuffleArray(wordArray)

    dispatch(updateFlashcardsWordArray(shuffledArray))
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
      initWordArray()
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

  const numberButtons = [minNum, 10, 15, 20].filter(
    (num) => num <= words?.length
  )

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
      <div className='card--number flex flex-col gap-3 w-full sm:w-3/4'>
        <h2 className='text-lg font-bold'>
          Please select the number of flashcards:
        </h2>
        <div className='flex flex-col gap-4 w-full'>
          {numberButtons.map((button) => (
            <button
              key={button}
              name={button}
              onClick={handleNumberClick}
              className={numberButtonStyleClassName(button)}>
              {button}
            </button>
          ))}
        </div>
      </div>
      <button
        onClick={handleStart}
        className='mt-4 bg-indigo-500 hover:bg-indigo-600 text-lg font-semibold text-white rounded-lg px-5 py-2'>
        Start
      </button>
      <div className='mt-7 text-center'>
        <span className='font-bold'>Reminder: </span>If you switch to other
        pages in the middle of a review session, you will lose your current
        review progress.
      </div>
    </div>
  )
}

export default FlashcardsMode
