import { Outlet, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ReviewNotFinishedPopup from '../components/ReviewNotFinishedPopup'

const Flashcards = () => {
  const { showNotFinished, inSession } = useSelector(
    (state) => state.flashcards
  )

  console.log('showNotFinished', showNotFinished)

  return (
    <div className='flex flex-col gap-3 w-full'>
      <Link
        className='text-sm underline hover:font-semibold'
        to='..'>
        Back to Review
      </Link>
      <h1 className='text-xl sm:text-2xl font-bold text-center'>Flashcards</h1>
      <Outlet />
      {showNotFinished && <ReviewNotFinishedPopup />}
    </div>
  )
}

export default Flashcards
