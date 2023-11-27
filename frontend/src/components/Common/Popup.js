import Overlay from './Overlay'
import Button from './Button'
import React from 'react'
import PropType from 'prop-types'

const Popup = ({ title, handleChoice1, handleChoice2, children }) => {
  return (
    <Overlay>
      <div className='review-not-finished-popup text-center w-3/4 sm:w-2/3 bg-white rounded-xl px-5 py-5 flex flex-col items-center gap-3'>
        <h1 className='text-indigo-800 font-bold text-2xl'>{title}</h1>
        {children}
        <div className='flex justify-around items-center gap-3'>
          <Button
            bgColor='gray'
            size='md'
            onClick={handleChoice1}>
            Yes
          </Button>
          <Button
            bgColor='indigo'
            size='md'
            className='font-semibold'
            onClick={handleChoice2}>
            No
          </Button>
        </div>
      </div>
    </Overlay>
  )
}

export default Popup

Popup.propTypes = {
  title: PropType.string.isRequired,
  handleChoice1: PropType.func.isRequired,
  handleChoice2: PropType.func.isRequired,
  children: PropType.node.isRequired
}
