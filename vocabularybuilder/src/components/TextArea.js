import { useState } from 'react'

const TextArea = ({ id, name, index, value, onBlur }) => {
  const [text, setText] = useState(value)

  const handleChange = (e) => {
    setText(e.target.value)
  }

  return (
    <>
      <textarea
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
