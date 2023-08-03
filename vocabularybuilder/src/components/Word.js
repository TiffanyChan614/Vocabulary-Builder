const Word = ({ wordData }) => {
  console.log(wordData)
  if (wordData.word === '') {
    return null
  }
  return (
    <div className='word'>
      <h3>{wordData.word}</h3>
      <h4>{wordData.result?.partOfSpeech}</h4>
      <p>{wordData.result?.definition || 'No definition found'}</p>
    </div>
  )
}

export default Word
