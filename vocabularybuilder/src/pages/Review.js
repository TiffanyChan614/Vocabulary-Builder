import { Link, Outlet, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  updateSearchSearchValue,
  updateSearchCurrentPage,
} from '../reducers/searchReducer'

const Review = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const isReviewPage = location.pathname === '/review'

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
    <div className='sm:w-2/3 w-full max-w-lg'>
      {isReviewPage && (
        <div className='flex flex-col gap-5'>
          <h1 className='text-2xl font-bold text-center'>Review</h1>
          {isJournalEmpty ? (
            <div className='text-center'>
              There is no word in your journal to review.{' '}
              <Link
                className='text-indigo-800 hover:underline'
                to='../search'
                onClick={() => {
                  dispatch(updateSearchSearchValue(''))
                  dispatch(updateSearchCurrentPage('search'))
                }}>
                Explore new words here!
              </Link>
            </div>
          ) : (
            <Link to='flashcards'>
              <div className='font-semibold hover:bg-indigo-100 hover:text-indigo-800 text-lg border-2 rounded-xl border-indigo-100 flex items-center justify-center p-6'>
                Flashcards
              </div>
            </Link>
          )}
        </div>
      )}
      <Outlet />
    </div>
  )
}

export default Review
