import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import EndSessionPopup from '../../components/Features/Review/EndSessionPopup'
import BackPopup from '../../components/Features/Review/BackPopup'
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
    <div className='flex flex-col gap-3 w-full items-center'>
      <div
        className='text-sm underline hover:font-semibold cursor-pointer self-start'
        onClick={handleBack}>
        Back to Review
      </div>
      <h1 className='text-xl sm:text-2xl font-bold text-center'>Quiz</h1>
      <Outlet />
      {showNotFinished && <EndSessionPopup page='quiz' />}
      {showQuit && <BackPopup page='quiz' />}
    </div>
  )
}
export default Quiz
