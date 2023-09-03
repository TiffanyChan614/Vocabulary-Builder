const MCQuestion = ({ checked, chosen, questionData, handleSelect }) => {
  const { questionType, question, correctAnswer, choices } = questionData

  const answerButtonStyleClassName = (buttonName) => {
    const baseStyle =
      'border-2 text-gray-600 rounded-xl py-2 px-4 w-full flex justify-center items-center max-w-[750px]'
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
    'mc-wordToDefinition':
      'Choose the word that matches the following definition:',
    'mc-definitionToWord':
      'Choose the definition that matches the following word:',
    'mc-synonyms': 'Choose the word that is a synonym of the following words:',
    'mc-antonyms': 'Choose the word that is an antonym of the following words:',
  }
  return (
    <div className='flex flex-col gap-4 text-center items-center'>
      <p>{typeToPrompt[questionType]}</p>
      <p className='font-semibold'>{question}</p>
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
