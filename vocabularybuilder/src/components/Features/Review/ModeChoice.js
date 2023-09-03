const ModeChoice = ({ mode, modesArray, handleModeClick }) => {
  const modeButtonStyleClassName = (buttonName) => {
    const baseStyle =
      'border-2 text-gray-600 rounded-xl py-2 px-4 w-full flex justify-center items-center hover:font-semibold'
    const isActive = mode.name === buttonName
    console.log(buttonName, isActive)
    const colorStyle = () => {
      switch (modesArray.findIndex((b) => b.name === buttonName)) {
        case 0:
          return (
            'border-amber-100 hover:bg-amber-100' +
            (isActive ? ' bg-amber-100 font-semibold' : '')
          )
        case 1:
          return (
            'border-sky-100 hover:bg-sky-100' +
            (isActive ? ' bg-sky-100 font-semibold' : '')
          )
        case 2:
          return (
            'border-rose-100 hover:bg-rose-100' +
            (isActive ? ' bg-rose-100 font-semibold' : '')
          )
        default:
          return ''
      }
    }
    return `${baseStyle} ${colorStyle()}`
  }

  return (
    <div className='flashcards--mode flex flex-col gap-3 w-full sm:w-3/4'>
      <h2 className='text-lg font-bold'>Please select a mode:</h2>

      <div className='flex flex-col gap-4 w-full'>
        {modesArray.map((button) => (
          <button
            key={button.name}
            name={button.name}
            className={modeButtonStyleClassName(button.name)}
            onClick={handleModeClick}>
            {button.text}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ModeChoice
