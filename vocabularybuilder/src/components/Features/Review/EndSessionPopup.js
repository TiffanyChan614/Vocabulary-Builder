import Popup from '../../Common/Popup'
import { setShowNotFinished as setFlashcardsShowNotFinished } from '../../../reducers/flashcardsReducer'
import { setShowNotFinished as setQuizShowNotFinished } from '../../../reducers/quizReducer'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const EndSessionPopup = ({ page }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleNo = () => {
    if (page === 'quiz') {
      dispatch(setQuizShowNotFinished(false))
    } else {
      dispatch(setFlashcardsShowNotFinished(false))
    }
  }

  const handleYes = () => {
    navigate('result')
    if (page === 'quiz') {
      dispatch(setQuizShowNotFinished(false))
    } else {
      dispatch(setFlashcardsShowNotFinished(false))
    }
  }

  const message =
    page === 'quiz'
      ? "You haven't answered all the questions."
      : "You haven't rated all the flashcards."

  return (
    <Popup
      title='End Review'
      handleYes={handleYes}
      handleNo={handleNo}>
      <p>
        {message} If you end now, points will only be counted towards the cards
        that you have reviewed.
      </p>
      <p className='font-semibold'>Are you sure to end the review?</p>
    </Popup>
  )
}

export default EndSessionPopup
