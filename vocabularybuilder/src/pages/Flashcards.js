import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Flashcards = () => {
  return (
    <div className='flex flex-col gap-5 w-full'>
      <h1 className='text-2xl font-bold text-center'>Flashcards</h1>
      <Outlet />
    </div>
  )
}

export default Flashcards
