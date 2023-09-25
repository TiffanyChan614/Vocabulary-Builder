import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ bgColor, size, children, onClick, className = '' }) => {
  const bgColorClassName =
    bgColor === 'indigo' ? 'bg-indigo-500' : 'bg-gray-200'
  const textColorClassName =
    bgColor === 'indigo' ? 'text-white' : 'text-gray-800'
  const hoverColorClassName =
    bgColor === 'indigo' ? 'hover:bg-indigo-600' : 'hover:bg-gray-300'

  let fontSizeClassName = ''
  let paddingClassName = ''

  switch (size) {
    case 'sm':
      fontSizeClassName = 'text-sm'
      paddingClassName = 'px-2 py-1'
      break
    case 'lg':
      fontSizeClassName = 'text-lg'
      paddingClassName = 'px-6 py-2'
      break
    default:
      fontSizeClassName = 'text-base'
      paddingClassName = 'px-4 py-2'
  }

  return (
    <button
      onClick={onClick}
      className={`${className} ${bgColorClassName} ${textColorClassName} ${fontSizeClassName} ${paddingClassName} rounded-lg ${hoverColorClassName}`}>
      {children}
    </button>
  )
}

export default Button

Button.propTypes = {
  bgColor: PropTypes.string,
  size: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string
}
