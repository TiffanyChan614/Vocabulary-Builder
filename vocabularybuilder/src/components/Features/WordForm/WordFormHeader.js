const WordFormHeader = ({ word, pronunciation, partOfSpeech, message }) => {
  return (
    <header className='word-form--header pt-6 pb-4 px-6 border-b-2 flex flex-col sm:flex-row items-center sm:justify-between gap-2'>
      <div className='flex items-center gap-'>
        <h2 className='text-xl font-bold text-indigo-800'>{word}</h2>
        {pronunciation && <h3 className='text-lg'>{`[${pronunciation}]`}</h3>}
        {partOfSpeech && (
          <h4 className='text-md font-semibold ml-6'>
            {partOfSpeech[0].toUpperCase() + partOfSpeech.slice(1)}
          </h4>
        )}
      </div>
      <div>
        {message && (
          <p className='text-md font-semibold text-emerald-700'>{message}</p>
        )}
      </div>
    </header>
  )
}

export default WordFormHeader
