import Popup from '../../Common/Popup'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateFlashcardsShowQuit } from '../../../reducers/flashcardsReducer'
import { updateQuizShowQuit } from '../../../reducers/quizReducer'

const QuitSessionPopup = ({ page }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleYes = () => {
    navigate('..')
  }

  const handleNo = () => {
    if (page === 'quiz') {
      dispatch(updateQuizShowQuit(false))
    } else {
      dispatch(updateFlashcardsShowQuit(false))
    }
  }

  return (
    <Popup
      title='Quit session'
      handleYes={handleYes}
      handleNo={handleNo}>
      <p>If you return to Review, your current review progress will be lost.</p>
      <p className='font-semibold'>Are you sure to quit the session?</p>
    </Popup>
  )
}

export default QuitSessionPopup
