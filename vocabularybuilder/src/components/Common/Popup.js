import Overlay from './Overlay'
const Popup = ({ title, handleYes, handleNo, children }) => {
  return (
    <Overlay>
      <div className='review-not-finished-popup text-center w-3/4 sm:w-2/3 bg-white rounded-xl px-5 py-5 flex flex-col items-center gap-3'>
        <h1 className='text-indigo-800 font-bold text-2xl'>{title}</h1>
        {children}
        <div className='flex justify-around items-center gap-3'>
          <button
            onClick={handleYes}
            className='rounded-lg font-semibold text-white bg-gray-400 hover:bg-gray-500 px-4 py-2'>
            Yes
          </button>
          <button
            onClick={handleNo}
            className='rounded-lg font-semibold text-white bg-indigo-500 hover:bg-indigo-600 px-4 py-2'>
            No
          </button>
        </div>
      </div>
    </Overlay>
  )
}

export default Popup
