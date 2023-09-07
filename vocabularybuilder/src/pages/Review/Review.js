import { Link, Outlet, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  setSearchValue as setSearchSearchValue,
  setCurrentPage as setSearchCurrentPage,
} from '../../reducers/searchReducer'

const Review = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const isReviewPage = location.pathname === '/review'
  const divStyleClassName =
    'w-full font-semibold hover:bg-indigo-100 hover:text-indigo-800 text-lg border-2 rounded-xl border-indigo-100 flex items-center justify-center p-6'

  const isJournalEmpty = (() => {
    try {
      const journalData = localStorage.getItem('journal')
      return !journalData || JSON.parse(journalData).length === 0
    } catch (error) {
      console.error('Error parsing journal data:', error)
      return true
    }
  })()

  return (
    <div className='w-full flex flex-col items-center'>
      {isReviewPage && (
        <div className='flex flex-col gap-2 md:gap-5 w-full max-w-screen-md'>
          <h1 className='text-xl md:text-2xl font-bold text-center'>Review</h1>
          {isJournalEmpty ? (
            <div className='text-center w-full'>
              There is no word in your journal to review.{' '}
              <Link
                className='text-indigo-800 hover:underline'
                to='../search'
                onClick={() => {
                  dispatch(setSearchSearchValue(''))
                  dispatch(setSearchCurrentPage('search'))
                }}>
                Explore new words here!
              </Link>
            </div>
          ) : (
            <>
              <Link to='flashcards'>
                <div className={divStyleClassName}>Flashcards</div>
              </Link>
              <Link to='quiz'>
                <div className={divStyleClassName}>Quiz</div>
              </Link>
            </>
          )}
        </div>
      )}
      <Outlet />
    </div>
  )
}

export default Review
