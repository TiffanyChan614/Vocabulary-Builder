import { useState } from 'react'

const TextArea = ({ name, index, value, onChange }) => {
  const [text, setText] = useState(value)

  const handleChange = (e) => {
    setText(e.target.value)
    onChange(e, name, index, e.target.value)
  }

  return (
    <>
      <textarea
        key={name + index}
        name={name}
        value={text}
        onChange={handleChange}
      />
    </>
  )
}

export default TextArea
