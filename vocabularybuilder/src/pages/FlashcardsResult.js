import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  updateFlashcardsWordArray,
  updateFlashcardsInSession,
} from '../reducers/flashcardsReducer'
import { updateWords } from '../reducers/journalReducer'

const FlashcardsResult = () => {
  const { wordArray } = useSelector((state) => state.flashcards)
  const { words } = useSelector((state) => state.journal)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const newWordArray = wordArray.map((word) => {
      const { originalPoints, pointsEarned } = word
      const newPointsEarned = pointsEarned ? pointsEarned : 0
      const newPoints = originalPoints + newPointsEarned
      return {
        ...word,
        newPoints: newPoints < 0 ? 0 : newPoints,
        pointsEarned: newPointsEarned,
      }
    })
    const newJournalWords = words.map((word) => ({
      ...word,
      points:
        newWordArray.find((w) => w.id === word.id)?.newPoints || word.points,
    }))
    dispatch(updateFlashcardsWordArray(newWordArray))
    dispatch(updateFlashcardsInSession(false))
    localStorage.setItem('journal', JSON.stringify(newJournalWords))
    dispatch(updateWords(newJournalWords))
  }, [])

  const bgColor = (pointsEarned) => {
    if (pointsEarned > 0) {
      return 'bg-emerald-100'
    } else if (pointsEarned < 0) {
      return 'bg-rose-100'
    } else {
      return 'bg-gray-100'
    }
  }

  const changeColor = (pointsEarned) => {
    if (pointsEarned > 0) {
      return 'text-emerald-700'
    } else if (pointsEarned < 0) {
      return 'text-rose-700'
    } else {
      return 'text-gray-700'
    }
  }

  return (
    <div className='flex flex-col gap-3 items-center w-full'>
      <h2 className='font-bold text-xl text-center text-indigo-800'>Result</h2>
      <div className='flex flex-col gap-2 '>
        <div className='grid grid-cols-4 gap-1 font-semibold grow'>
          <div className='grid-item p-2 text-center'>Word</div>
          <div className='grid-item p-2 text-center'>Original</div>
          <div className='grid-item p-2 text-center'>Updated</div>
          <div className='grid-item p-2 text-center'>Change</div>
        </div>
        {wordArray.map((wordData, index) => {
          const { word, originalPoints, newPoints, pointsEarned } = wordData
          return (
            <div
              className={`grid grid-cols-4 gap-1 rounded-xl w-full ${bgColor(
                pointsEarned
              )}`}
              key={word + index}>
              <div className='grid-item p-4 font-semibold'>{word}</div>
              <div className='grid-item p-4 text-center'>{originalPoints}</div>
              <div className='grid-item p-4 text-center'>{newPoints}</div>
              <div
                className={`grid-item p-4 text-center font-bold ${changeColor(
                  pointsEarned
                )}`}>
                {pointsEarned > 0 ? `+${pointsEarned}` : pointsEarned}
              </div>
            </div>
          )
        })}
      </div>
      <button
        onClick={() => navigate('../..')}
        className='mt-4 bg-indigo-500 hover:bg-indigo-600 text-lg font-semibold text-white rounded-lg px-5 py-2'>
        Return
      </button>
    </div>
  )
}

export default FlashcardsResult
