import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { updateFlashcardsWordArray } from '../reducers/flashcardsReducer'

const FlashcardsResult = () => {
  const { wordArray } = useSelector((state) => state.flashcards)
  const dispatch = useDispatch()

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
    dispatch(updateFlashcardsWordArray(newWordArray))
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
    <div className='flex flex-col gap-3'>
      <h2 className='font-bold text-xl text-center text-indigo-800'>Result</h2>
      <div className='flex flex-col gap-2'>
        <div className='grid grid-cols-4 gap-1 font-semibold'>
          <div className='grid-item p-2 text-center'>Word</div>
          <div className='grid-item p-2 text-center'>Original</div>
          <div className='grid-item p-2 text-center'>Updated</div>
          <div className='grid-item p-2 text-center'>Change</div>
        </div>
        {wordArray.map((wordData, index) => {
          const { word, originalPoints, newPoints, pointsEarned } = wordData
          return (
            <div
              className={`grid grid-cols-4 gap-1 rounded-xl ${bgColor(
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
    </div>
  )
}

export default FlashcardsResult
