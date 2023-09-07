import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import EndSessionPopup from '../../components/Features/Review/EndSessionPopup'
import BackPopup from '../../components/Features/Review/BackPopup'
import {
  setShowQuit as setFlashcardsShowQuit,
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
  }, [dispatch])

  const handleBack = () => {
    if (inSession) {
      dispatch(setFlashcardsShowQuit(true))
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
      {showNotFinished && <EndSessionPopup page='flashcards' />}
      {showQuit && <BackPopup page='flashcards' />}
    </div>
  )
}

export default Flashcards
