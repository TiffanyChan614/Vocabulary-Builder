import React, { useState } from 'react'
import PropType from 'prop-types'

const TextArea = ({ id, name, index, value, onBlur, height }) => {
  const [text, setText] = useState(value)

  const handleChange = (e) => {
    setText(e.target.value)
  }

  return (
    <>
      <textarea
        className={`rounded-lg border-2 border-indigo-100 py-1 px-2 w-full ${height}`}
        id={id}
        key={name + index}
        name={name}
        value={text}
        onChange={handleChange}
        onBlur={(e) => onBlur(e, index)}
      />
    </>
  )
}

export default TextArea

TextArea.propTypes = {
  id: PropType.string.isRequired,
  name: PropType.string.isRequired,
  index: PropType.number.isRequired,
  value: PropType.string.isRequired,
  onBlur: PropType.func.isRequired,
  height: PropType.string.isRequired
}
