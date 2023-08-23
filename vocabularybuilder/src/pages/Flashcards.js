import { Outlet } from 'react-router-dom'

const Flashcards = () => {
  return (
    <div className='flex flex-col gap-7 w-full'>
      <h1 className='text-2xl font-bold text-center'>Flashcards</h1>
      <Outlet />
    </div>
  )
}

export default Flashcards
