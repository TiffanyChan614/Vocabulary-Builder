import Popup from '../../Common/Popup'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setShowQuit as setFlashcardsShowQuit } from '../../../reducers/flashcardsReducer'
import { setShowQuit as setQuizShowQuit } from '../../../reducers/quizReducer'
import React from 'react'
import PropType from 'prop-types'

const BackPopup = ({ page }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleYes = () => {
    navigate('..')
  }

  const handleNo = () => {
    if (page === 'quiz') {
      dispatch(setQuizShowQuit(false))
    } else {
      dispatch(setFlashcardsShowQuit(false))
    }
  }

  const choices = [{ bgColor: 'indigo', text: 'Yes', handleClick: handleYes },
    { bgColor: 'gray', text: 'No', handleClick: handleNo }]

  return (
    <Popup
      title='Quit session'
      choices={choices}
      >
      <p>If you return to Review, your current review progress will be lost.</p>
      <p className='font-semibold'>Are you sure to quit the session?</p>
    </Popup>
  )
}

export default BackPopup

BackPopup.propTypes = {
  page: PropType.string.isRequired
}
