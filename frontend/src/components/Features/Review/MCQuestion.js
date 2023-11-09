import React from 'react'
import PropType from 'prop-types'

const MCQuestion = ({ checked, chosen, questionData, handleSelect }) => {
  const { questionType, question, correctAnswer, choices } = questionData

  const answerButtonStyleClassName = (buttonName) => {
    const baseStyle =
      'border-2 text-gray-600 rounded-xl py-2 px-4 w-full flex justify-center items-center min-w-[250px]'
    const uncheckedStyle =
      'hover:font-semibold hover:bg-indigo-100 border-indigo-100'
    const chosenStyle = 'bg-indigo-100 font-semibold border-indigo-100'
    const correctStyle = 'bg-emerald-100 text-emerald-700 border-emerald-100'
    const chosenCorrectStyle =
      'bg-emerald-100 font-semibold text-emerald-700 border-emerald-100'
    const wrongStyle = 'bg-rose-100 font-semibold text-rose-700 border-rose-100'
    if (!checked) {
      return (
        baseStyle +
        (chosen === buttonName ? ' ' + chosenStyle : ' ' + uncheckedStyle)
      )
    } else if (chosen === buttonName && checked) {
      return (
        baseStyle +
        (chosen === correctAnswer ? ' ' + chosenCorrectStyle : ' ' + wrongStyle)
      )
    } else {
      return (
        baseStyle + (buttonName === correctAnswer ? ' ' + correctStyle : '')
      )
    }
  }

  const typeToPrompt = {
    'mc-definitionToWord': (
      <p>
        Choose the <span className='font-semibold'>word </span>that matches the
        following definition:
      </p>
    ),
    'mc-wordToDefinition': (
      <p>
        Choose the <span className='font-semibold'>definition</span> that
        matches the following word:
      </p>
    ),
    'mc-synonyms': (
      <p>
        Choose the word that is a <span className='font-semibold'>synonym</span>{' '}
        of the following words:
      </p>
    ),
    'mc-antonyms': (
      <p>
        Choose the word that is an{' '}
        <span className='font-semibold'>antonym</span> of the following words:
      </p>
    )
  }
  return (
    <div className='flex flex-col gap-3 text-center items-center'>
      {typeToPrompt[questionType]}
      <p className='font-semibold text-indigo-800 text-lg'>{question}</p>
      <div className='flex flex-col gap-3 items-center'>
        {choices?.map((answer) => (
          <button
            key={answer}
            name={answer}
            onClick={handleSelect}
            className={answerButtonStyleClassName(answer)}>
            {answer}
          </button>
        ))}
      </div>
    </div>
  )
}

export default MCQuestion

MCQuestion.propTypes = {
  checked: PropType.bool.isRequired,
  chosen: PropType.string.isRequired,
  questionData: PropType.object.isRequired,
  handleSelect: PropType.func.isRequired
}
