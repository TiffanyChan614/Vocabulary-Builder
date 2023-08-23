import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GrPrevious, GrNext } from 'react-icons/gr'

// TODO: fix next and previous button,
// change Link to div and create a handleNextClick and handlePreviousClick function

const Card = () => {
  const { index } = useParams()
  const { mode, wordArray } = useSelector((state) => state.flashcards)
  const [face, setFace] = useState('front')
  const navigate = useNavigate()

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
    if (mode === 'wordToMeaning') {
      return wordArray[index].word
    }
    if (mode === 'meaningToWord') {
      return wordArray[index].definition
    }
    if (mode === 'mixed') {
      return Math.random() < 0.5
        ? wordArray[index].word
        : wordArray[index].definition
    }
  })()

  const back = (() => {
    if (mode === 'wordToMeaning') {
      return wordArray[index].definition
    }
    if (mode === 'meaningToWord') {
      return wordArray[index].word
    }
    if (mode === 'mixed') {
      return Math.random() < 0.5
        ? wordArray[index].word
        : wordArray[index].definition
    }
  })()

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

  return (
    <div className='flex flex-col justify-center items-center gap-3'>
      <div className='w-full flex justify-center flex-grow gap-2'>
        <button
          onClick={handlePreviousClick}
          className={Number(index) <= 0 ? 'cursor-auto opacity-20' : ''}>
          <GrPrevious
            size={25}
            color='#808080'
          />
        </button>

        <div
          className={`w-full flex flex-col items-center h-80 py-2 px-4 ${color} shadow-md rounded-lg hover:shadow-lg cursor-pointer`}
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
  )
}

export default Card
