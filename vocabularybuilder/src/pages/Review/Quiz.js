import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import ReviewNotFinishedPopup from '../../components/Features/Review/ReviewNotFinishedPopup'
import QuitSessionPopup from '../../components/Features/Review/QuitSessionPopup'
import { updateQuizShowQuit, resetQuiz } from '../../reducers/quizReducer'
import { useEffect } from 'react'

const Quiz = () => {
  const { showNotFinished, inSession, showQuit } = useSelector(
    (state) => state.quiz
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(resetQuiz())
  }, [])

  const handleBack = () => {
    if (inSession) {
      dispatch(updateQuizShowQuit(true))
    } else {
      navigate('..')
    }
  }

  return (
    <div className='flex flex-col gap-3 w-full'>
      <div
        className='text-sm underline hover:font-semibold cursor-pointer'
        onClick={handleBack}>
        Back to Review
      </div>
      <h1 className='text-xl sm:text-2xl font-bold text-center'>Quiz</h1>
      <Outlet />
      {showNotFinished && <ReviewNotFinishedPopup page='quiz' />}
      {showQuit && <QuitSessionPopup page='quiz' />}
    </div>
  )
}
export default Quiz
