import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ReviewNotFinishedPopup from '../components/ReviewNotFinishedPopup'

const Flashcards = () => {
  const { showNotFinished } = useSelector((state) => state.flashcards)
  return (
    <div className='flex flex-col gap-5 w-full'>
      <h1 className='text-2xl font-bold text-center'>Flashcards</h1>
      <Outlet />
      {showNotFinished && <ReviewNotFinishedPopup />}
    </div>
  )
}

export default Flashcards
