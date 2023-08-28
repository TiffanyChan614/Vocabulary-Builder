import Popup from '../../Common/Popup'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateFlashcardsShowQuit } from '../../../reducers/flashcardsReducer'

const QuitSessionPopup = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleYes = () => {
    navigate('..')
  }

  const handleNo = () => {
    dispatch(updateFlashcardsShowQuit(false))
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
