import { Link, Outlet, useLocation } from 'react-router-dom'

const Review = () => {
  const location = useLocation()
  const isReviewPage = location.pathname === '/review'

  return (
    <div className='sm:w-2/3 w-full max-w-lg'>
      {isReviewPage && (
        <div className='flex flex-col gap-5'>
          <h1 className='text-3xl font-bold text-center'>Review</h1>
          <Link to='flashcards'>
            <div className='font-semibold hover:bg-indigo-100 hover:text-indigo-800 text-lg border-2 rounded-xl border-indigo-100 flex items-center justify-center p-6'>
              Flashcards
            </div>
          </Link>
        </div>
      )}
      <Outlet />
    </div>
  )
}

export default Review
