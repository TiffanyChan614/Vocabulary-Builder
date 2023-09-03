import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='justify-center p-5'>
      <h1 className='text-2xl font-bold'>Vocabulary Builder: Page Not Found</h1>
      Click{' '}
      <Link
        to='/'
        className='underline hover:text-indigo-800 inline'>
        here
      </Link>{' '}
      to go back to the home page.
    </div>
  )
}

export default NotFound
