import { checkBlanksCorrect } from '../../utils/reviewHelper'

const BlanksQuestion = ({ checked, blanksAns, questionData, handleChange }) => {
  const { questionType, question, correctAnswer } = questionData

  const questionElement =
    questionType === 'blank-images' ? (
      <img
        src={question.src}
        alt={question.alt}
        className='w-full max-w-screen-sm h-auto object-cover rounded-lg shadow-md'
      />
    ) : (
      <p className='font-semibold'>{question}</p>
    )

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && index > 1 && blanksAns[index] === '') {
      const prevIndex = index - 1
      const prevInput = document.querySelector(`[name=blank-${prevIndex}]`)
      if (prevInput) {
        prevInput.value = ''
        blanksAns[prevIndex] = ''
        prevInput.focus()
        e.preventDefault()
      }
    }
  }

  const handleInput = (e, index) => {
    if (
      e.target.value.length === 1 &&
      index < blanksAns.length - 1 &&
      !checked
    ) {
      const nextIndex = index + 1
      const nextInput = document.querySelector(`[name=blank-${nextIndex}]`)
      if (nextInput) {
        nextInput.focus()
      }
    }
  }

  const blanksStyleClassName = (index) => {
    const baseClassName =
      'w-6 border-b-2 text-lg font-semibold flex-none outline-none text-center'
    if (checked && checkBlanksCorrect(blanksAns, correctAnswer)) {
      return `${baseClassName} text-emerald-500`
    } else if (checked && !checkBlanksCorrect(blanksAns, correctAnswer)) {
      return `${baseClassName} text-rose-500`
    } else if (!checked && index !== 0) {
      return `${baseClassName} text-blue-500`
    } else {
      return baseClassName
    }
  }

  const blanksElement = Array.from({ length: blanksAns.length }, (_, index) => (
    <input
      className={blanksStyleClassName(index)}
      value={blanksAns[index]}
      key={index}
      name={`blank-${index}`}
      type='text'
      onChange={handleChange}
      readOnly={checked || index === 0}
      maxLength='1'
      onInput={(e) => handleInput(e, index)}
      onKeyDown={(e) => handleKeyDown(e, index)}
    />
  ))

  return (
    <div className='flex flex-col gap-3 text-center items-center'>
      <p className='text-lg font-semibold'>Fill in the blanks:</p>
      {questionElement}
      <div className='flex flex-wrap gap-2 justify-center items-center w-full'>
        {blanksElement}
      </div>
    </div>
  )
}

export default BlanksQuestion
