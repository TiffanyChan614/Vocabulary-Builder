import { useDispatch, useSelector } from 'react-redux'
import {
  updateFlashcardsMode,
  updateFlashcardsNumber,
  updateFlashcardsWordArray,
} from '../reducers/flashcardsReducer'
import { Link } from 'react-router-dom'

const FlashcardsMode = () => {
  const { mode, number } = useSelector((state) => state.flashcards)
  const dispatch = useDispatch()

  console.log('number', number)

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
    const wordArray =
      words?.map((word) => {
        const images = word.images
        let image = null
        if (images && images.length > 0) {
          const randomIndex = Math.floor(Math.random() * images.length)
          image = images[randomIndex]
        }
        console.log('image', image)
        if (mode.name === 'wordToMeaning') {
          return {
            id: word.id,
            originalPoints: word.points,
            pointsEarned: 0,
            newPoints: word.points,
            front: { type: 'word', word: word.word },
            back: word.definition,
          }
        } else if (mode.name === 'meaningToWord') {
          return {
            id: word.id,
            originalPoints: word.points,
            pointsEarned: 0,
            newPoints: word.points,
            front: {
              type: 'definitionWithImages',
              definition: word.definition,
              image: image,
            },
            back: word.word,
          }
        } else {
          return Math.random() < 0.5
            ? {
                id: word.id,
                originalPoints: word.points,
                pointsEarned: 0,
                newPoints: word.points,
                front: { type: 'word', word: word.word },
                back: word.definition,
              }
            : {
                id: word.id,
                originalPoints: word.points,
                pointsEarned: 0,
                newPoints: word.points,
                front: {
                  type: 'definitionWithImages',
                  definition: word.definition,
                  image: image,
                },
                back: word.word,
              }
        }
      }) || []

    const shuffledArray = shuffleArray(wordArray)

    dispatch(updateFlashcardsWordArray(shuffledArray.slice(0, number)))
  }

  const handleStart = (e) => {
    e.stopPropagation()
    if (mode === '') {
      e.preventDefault()
      window.alert('Please select a mode')
    } else {
      initWordArray()
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
    <div className='card flex flex-col gap-5 text-center'>
      <div className='card--mode flex flex-col gap-3'>
        <h2 className='text-lg font-bold'>Please select a mode:</h2>
        <div className='flex flex-col gap-4'>
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
      <div className='card--number flex flex-col gap-3'>
        <h2 className='text-lg font-bold'>
          Please select the number of flashcards:
        </h2>
        <div className='flex flex-col gap-4'>
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

      <Link
        to={mode === '' ? '' : '0'}
        onClick={handleStart}>
        <button className='mt-7 w-full text-lg rounded-lg px-3 py-2 font-semibold text-white bg-indigo-400 hover:bg-indigo-500'>
          Start
        </button>
      </Link>
    </div>
  )
}

export default FlashcardsMode
