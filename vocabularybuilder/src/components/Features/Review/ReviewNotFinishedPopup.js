import Popup from '../../Common/Popup'
import { updateFlashcardsShowNotFinished } from '../../../reducers/flashcardsReducer'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ReviewNoFinishedPopup = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleNo = () => {
    dispatch(updateFlashcardsShowNotFinished(false))
  }

  const handleYes = () => {
    navigate('result')
    dispatch(updateFlashcardsShowNotFinished(false))
  }

  return (
    <Popup
      title='End Review'
      handleYes={handleYes}
      handleNo={handleNo}>
      <p>
        You haven't rated all the flashcards. If you end now, points will only
        be counted towards the cards that you have reviewed.
      </p>
      <p className='font-semibold'>Are you sure to end the review?</p>
    </Popup>
  )
}

export default ReviewNoFinishedPopup
