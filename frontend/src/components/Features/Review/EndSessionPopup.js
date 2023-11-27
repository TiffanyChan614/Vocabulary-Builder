import Popup from '../../Common/Popup'
import { setShowNotFinished as setFlashcardsShowNotFinished } from '../../../reducers/flashcardsReducer'
import { setShowNotFinished as setQuizShowNotFinished } from '../../../reducers/quizReducer'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import PropType from 'prop-types'

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

  const choices = [{ bgColor: 'indigo', text: 'Yes', handleClick: handleYes },
    { bgColor: 'gray', text: 'No', handleClick: handleNo }]

  return (
    <Popup
      title='End Review'
      choices={choices}>
      <p>
        {message} If you end now, points will only be counted towards the cards
        that you have reviewed.
      </p>
      <p className='font-semibold'>Are you sure to end the review?</p>
    </Popup>
  )
}

export default EndSessionPopup

EndSessionPopup.propTypes = {
  page: PropType.string.isRequired
}
