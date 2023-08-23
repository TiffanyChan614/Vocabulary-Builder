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

  const buttonStyleClassName = (type, option) => {
    const baseStyle =
      'border-2 text-gray-600 rounded-xl py-2 px-4 w-full flex justify-center items-center hover:font-semibold'
    const colorStyle = () => {
      switch (type) {
        case 'mode':
          switch (option) {
            case 'wordToMeaning':
              return (
                'border-amber-100 hover:bg-amber-100' +
                (mode === 'wordToMeaning' ? ' bg-amber-100 font-semibold' : '')
              )
            case 'meaningToWord':
              return (
                'border-sky-100 hover:bg-sky-100' +
                (mode === 'meaningToWord' ? ' bg-sky-100 font-semibold' : '')
              )
            case 'mixed':
              return (
                'border-rose-100 hover:bg-rose-100' +
                (mode === 'mixed' ? ' bg-rose-100 font-semibold' : '')
              )
            default:
              return ''
          }
        case 'number':
          switch (option) {
            case `${minNum}`:
              return (
                'border-amber-100 hover:bg-amber-100' +
                (number === minNum ? ' bg-amber-100 font-semibold' : '')
              )
            case '10':
              return (
                'border-sky-100 hover:bg-sky-100' +
                (number === 10 ? ' bg-sky-100 font-semibold' : '')
              )
            case '15':
              return (
                'border-rose-100 hover:bg-rose-100' +
                (number === 15 ? ' bg-rose-100 font-semibold' : '')
              )
            case '20':
              return (
                'border-lime-100 hover:bg-lime-100' +
                (number === 20 ? ' bg-lime-100 font-semibold' : '')
              )
            default:
              return ''
          }
        default:
          return ''
      }
    }
    return baseStyle + ' ' + colorStyle()
  }

  const handleModeClick = (e) => {
    e.stopPropagation()
    dispatch(updateFlashcardsMode(e.target.name))
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
        if (mode === 'wordToMeaning') {
          return {
            front: { type: 'word', word: word.word },
            back: word.definition,
          }
        } else if (mode === 'meaningToWord') {
          return {
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
                front: { type: 'word', word: word.word },
                back: word.definition,
              }
            : {
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

  return (
    <div className='card flex flex-col gap-5 text-center'>
      <div className='card--mode flex flex-col gap-3'>
        <h2 className='text-lg font-bold'>Please select a mode:</h2>
        <div className='flex flex-col gap-4'>
          <button
            name='wordToMeaning'
            onClick={handleModeClick}
            className={buttonStyleClassName('mode', 'wordToMeaning')}>
            Show Word, Guess Meaning
          </button>
          <button
            name='meaningToWord'
            onClick={handleModeClick}
            className={buttonStyleClassName('mode', 'meaningToWord')}>
            Show Meaning, Guess Word
          </button>
          <button
            name='mixed'
            onClick={handleModeClick}
            className={buttonStyleClassName('mode', 'mixed')}>
            Mixed Mode
          </button>
        </div>
      </div>
      <div className='card--number flex flex-col gap-3'>
        <h2 className='text-lg font-bold'>
          Please select the number of flashcards:
        </h2>
        <div className='flex flex-col gap-4'>
          <button
            name={minNum.toString()}
            onClick={handleNumberClick}
            className={buttonStyleClassName('number', minNum.toString())}>
            5
          </button>
          {words?.length >= 10 && (
            <button
              name='10'
              onClick={handleNumberClick}
              className={buttonStyleClassName('number', '10')}>
              10
            </button>
          )}
          {words?.length >= 15 && (
            <button
              name='15'
              onClick={handleNumberClick}
              className={buttonStyleClassName('number', '15')}>
              15
            </button>
          )}
          {words?.length >= 20 && (
            <button
              name='20'
              onClick={handleNumberClick}
              className={buttonStyleClassName('number', '20')}>
              20
            </button>
          )}
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
