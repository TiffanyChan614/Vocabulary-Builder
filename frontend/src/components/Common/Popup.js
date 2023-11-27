import Overlay from './Overlay'
import Button from './Button'
import React from 'react'
import PropType from 'prop-types'

const Popup = ({ title, choices = [], children, className }) => {
  return (
    <Overlay>
      <div className={`${className} text-center w-3/4 sm:w-2/3 bg-white rounded-xl px-6 py-5 flex flex-col items-center gap-3`}>
        <h1 className='text-indigo-800 font-bold text-2xl'>{title}</h1>
        {children}
        <div className='flex justify-around items-center gap-3'>
          {choices.map((choice, index) => (
            <Button
              key={index}
              bgColor={choice.bgColor}
              size='md'
              className={choice.className}
              onClick={choice.handleClick}>
              {choice.text}
            </Button>
          ))}
        </div>
      </div>
    </Overlay>
  )
}

export default Popup

Popup.propTypes = {
  title: PropType.string.isRequired,
  choices: PropType.arrayOf(
    PropType.shape({
      bgColor: PropType.string.isRequired,
      className: PropType.string,
      text: PropType.string.isRequired,
      handleClick: PropType.func.isRequired
    })
  ).isRequired,
  children: PropType.node.isRequired,
  className: PropType.string
}
