import { Outlet } from 'react-router-dom'

const Flashcards = () => {
  return (
    <div>
      <h1>Flashcards</h1>
      <Outlet />
    </div>
  )
}

export default Flashcards
