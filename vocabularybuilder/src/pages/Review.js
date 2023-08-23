import { Link, Outlet } from 'react-router-dom'

const Review = () => {
  return (
    <div>
      <h1>Review</h1>
      <div>
        <Link to='flashcards'>Flashcards</Link>
      </div>
      <Outlet />
    </div>
  )
}

export default Review
