import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import {
  updateQuizWordArray,
  updateQuizInSession,
} from '../../reducers/quizReducer'
import { updateWords } from '../../reducers/journalReducer'
import ResultTable from '../../components/Features/Review/ResultTable'

const QuizResult = () => {
  const { wordArray } = useSelector((state) => state.quiz)
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
        word.points + newWordArray.find((w) => w.id === word.id)?.newPoints ||
        word.points,
      lastReviewed:
        newWordArray.find((w) => w.id === word.id)?.pointsEarned === 0
          ? word.lastReviewed
          : new Date().toISOString(),
    }))
    dispatch(updateQuizWordArray(newWordArray))
    dispatch(updateQuizInSession(false))
    localStorage.setItem('journal', JSON.stringify(newJournalWords))
    dispatch(updateWords(newJournalWords))
  }, [])

  return (
    <div className='flex flex-col gap-3 items-center w-full'>
      <h2 className='font-bold text-xl text-center text-indigo-800'>Result</h2>
      <ResultTable wordArray={wordArray} />
      <button
        onClick={() => navigate('../..')}
        className='mt-4 bg-indigo-500 hover:bg-indigo-600 text-lg font-semibold text-white rounded-lg px-5 py-2'>
        Return
      </button>
    </div>
  )
}

export default QuizResult
