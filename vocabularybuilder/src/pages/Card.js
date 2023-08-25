import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GrPrevious, GrNext } from 'react-icons/gr'
import {
  updateFlashcardsShowNotFinished,
  updateFlashcardsWordArrayByIndex,
} from '../reducers/flashcardsReducer'

const Card = () => {
  const { index } = useParams()
  const { mode, wordArray } = useSelector((state) => state.flashcards)
  const wordData = wordArray[index]

  console.log('wordData', wordData)
  console.log('index', index)

  const familiarityButtons = [
    { name: 'notFamiliar', text: 'Not familiar', score: -1, color: 'red' },
    {
      name: 'somewhatFamiliar',
      text: 'Somewhat familiar',
      score: 1,
      color: 'yellow',
    },
    { name: 'veryFamiliar', text: 'Very Familiar', score: 2, color: 'green' },
  ]

  const selectedFamiliarity =
    familiarityButtons.find(
      (familiarity) => familiarity.score === wordData.pointsEarned
    )?.name || null

  const [face, setFace] = useState('front')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const color = (() => {
    if (index === 0 || index % 3 === 0) {
      return 'bg-rose-50'
    } else if (index % 2 === 0) {
      return 'bg-amber-50'
    } else {
      return 'bg-sky-50'
    }
  })()

  const front = (() => {
    const cardFront = wordArray[index].front
    if (cardFront.type === 'word') {
      return (
        <div>
          <h2 className='text-2xl text-indigo-800 font-bold'>
            {wordArray[index].front.word}
          </h2>
          <p className='mt-2 text-sm text-gray-600'>Guess its meaning</p>
        </div>
      )
    } else if (cardFront.type === 'definitionWithImages') {
      const definition = wordArray[index].front.definition
      const image = wordArray[index].front.image
      if (image) {
        return (
          <div className='flex flex-col items-center gap-5'>
            <img
              src={image.src}
              alt={image.alt}
              className='h-40 w-40 object-cover rounded-lg shadow-md'
            />
            <p className='text-bold'>{definition}</p>
            <p className='mt-2 text-sm text-gray-600'>Guess the word</p>
          </div>
        )
      } else {
        return (
          <div className='flex flex-col items-center'>
            <p className='font-semibold'>{definition}</p>
            <p className='mt-2 text-sm text-gray-600'>Guess the word</p>
          </div>
        )
      }
    }
  })()

  const back = <div>{wordArray[index].back}</div>

  const handleCardClick = (e) => {
    e.stopPropagation()
    setFace(face === 'front' ? 'back' : 'front')
  }

  const handlePreviousClick = () => {
    if (Number(index) > 0) {
      const newIndex = Number(index) - 1
      navigate(`../${newIndex}`)
      setFace('front')
    }
  }

  const handleNextClick = () => {
    if (Number(index) < wordArray.length - 1) {
      const newIndex = Number(index) + 1
      navigate(`../${newIndex}`)
      setFace('front')
    }
  }

  const handleFamiliarityClick = (e) => {
    e.stopPropagation()
    if (e.target.name !== selectedFamiliarity) {
      const newScore = familiarityButtons.find(
        (familiarity) => familiarity.name === e.target.name
      ).score
      const updatedWordData = {
        ...wordData,
        pointsEarned: newScore,
      }
      dispatch(updateFlashcardsWordArrayByIndex(index, updatedWordData))
    }
  }

  const getButtonClassNames = (familiarity, isSelected) => {
    const bgClass = isSelected
      ? familiarity.color === 'red'
        ? 'bg-red-200 border-red-200'
        : familiarity.color === 'yellow'
        ? 'bg-yellow-200 border-yellow-200'
        : familiarity.color === 'green'
        ? 'bg-green-200 border-green-200'
        : ''
      : ''

    const borderClass =
      familiarity.color === 'red'
        ? 'border-red-200 hover:bg-red-200'
        : familiarity.color === 'yellow'
        ? 'border-yellow-200 hover:bg-yellow-200'
        : familiarity.color === 'green'
        ? 'border-green-200 hover:bg-green-200'
        : ''

    return `font-semibold px-4 py-2 rounded-full cursor-pointer border-2 select-none ${borderClass} ${bgClass}`
  }

  const handleFinish = () => {
    const notFinished = wordArray.some((word) => !word.pointsEarned)
    dispatch(updateFlashcardsShowNotFinished(notFinished))
    if (!notFinished) {
      navigate('../result')
    }
  }

  return (
    <>
      <div className='text-center'>Mode: {mode.text}</div>
      <div className='flex flex-col justify-center items-center gap-3'>
        <div className='card-control w-full flex justify-center items-center flex-grow gap-2'>
          <button
            onClick={handlePreviousClick}
            className={Number(index) <= 0 ? 'cursor-auto opacity-20' : ''}>
            <GrPrevious
              size={25}
              color='#808080'
            />
          </button>
          <div
            className={`card select-none text-center w-full flex flex-col justify-center items-center gap-5 min-h-[250px] sm:min-h-[350px] px-5 pt-5 pb-3 ${color} shadow-md rounded-lg hover:shadow-lg cursor-pointer`}
            onClick={handleCardClick}>
            <div className='h-full text-xl flex justify-center items-center'>
              {face === 'front' ? front : back}
            </div>
            <div className='font-light text-sm text-gray-400'>{face}</div>
          </div>

          <button
            onClick={handleNextClick}
            className={
              Number(index) >= wordArray.length - 1
                ? 'cursor-auto opacity-20'
                : ''
            }>
            <GrNext
              size={25}
              color='#808080'
            />
          </button>
        </div>
        <div>
          {Number(index) + 1} / {wordArray.length}
        </div>
      </div>
      <div className='text-center flex flex-col gap-3 items-center'>
        <p className='font-semibold'>
          Please rate your familiarity with this word:
        </p>
        <div className='flex flex-col gap-3 sm:flex-row '>
          {familiarityButtons.map((familiarity) => (
            <button
              key={familiarity.name}
              name={familiarity.name}
              onClick={handleFamiliarityClick}
              className={getButtonClassNames(
                familiarity,
                familiarity.name === selectedFamiliarity
              )}>
              {familiarity.text}
            </button>
          ))}
        </div>
        <button
          onClick={handleFinish}
          className='mt-4 bg-indigo-500 hover:bg-indigo-600 text-lg text-white rounded-lg px-5 py-2'>
          Finish Review
        </button>
      </div>
    </>
  )
}

export default Card
