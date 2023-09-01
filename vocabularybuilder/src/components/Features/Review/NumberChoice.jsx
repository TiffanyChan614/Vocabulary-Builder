const NumberChoice = ({
  choiceArray,
  wordsLength,
  number,
  prompt,
  handleNumberClick,
}) => {
  const numberButtonStyleClassName = (buttonName) => {
    const baseStyle =
      'border-2 text-gray-600 rounded-xl py-2 px-4 w-full flex justify-center items-center hover: border-indigo-100 hover:font-semibold hover:bg-indigo-100'
    const activeStyle = 'bg-indigo-100 font-semibold border-indigo-100'
    return baseStyle + (number === buttonName ? ' ' + activeStyle : '')
  }

  const numberButtons = choiceArray.filter((num) => num <= wordsLength)

  return (
    <div className='card--number flex flex-col gap-3 w-full sm:w-3/4'>
      <h2 className='text-lg font-bold'>{prompt}</h2>
      <div className='flex flex-col gap-4 w-full'>
        {numberButtons.map((button) => (
          <button
            type='button'
            key={button}
            name={button}
            onClick={handleNumberClick}
            className={numberButtonStyleClassName(button)}>
            {button}
          </button>
        ))}
      </div>
    </div>
  )
}

export default NumberChoice
