import React from 'react'
import { PropTypes } from 'prop-types'

const Input = ({ type = 'text', value, name, placeholder, onChange, isValid = true }) => {
  return (
    <input type={type} value={value} name={name} placeholder={placeholder} noValidate
        onChange={onChange} className={`outline-none bg-white border p-2 rounded-lg ${isValid ? '' : 'border-rose-500'}`}/>
  )
}

export default Input

Input.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  isValid: PropTypes.bool
}
