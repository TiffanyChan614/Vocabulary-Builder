import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import ReviewNotFinishedPopup from '../../components/Features/Review/ReviewNotFinishedPopup'
import QuitSessionPopup from '../../components/Features/Review/QuitSessionPopup'
import {
  updateFlashcardsShowQuit,
  resetFlashcards,
} from '../../reducers/flashcardsReducer'
import { useEffect } from 'react'

const Flashcards = () => {
  const { showNotFinished, inSession, showQuit } = useSelector(
    (state) => state.flashcards
  )

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(resetFlashcards())
  }, [])

  const handleBack = () => {
    if (inSession) {
      dispatch(updateFlashcardsShowQuit(true))
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
      <h1 className='text-xl sm:text-2xl font-bold text-center'>Flashcards</h1>
      <Outlet />
      {showNotFinished && <ReviewNotFinishedPopup page='flashcards' />}
      {showQuit && <QuitSessionPopup page='flashcards' />}
    </div>
  )
}

export default Flashcards
