const Word = ({ wordData }) => {
  console.log(wordData)
  if (wordData.word === '') {
    return null
  }
  return (
    <div className='word'>
      <h3>{wordData.word}</h3>
      <h4>{wordData.result?.definition || 'No definition found'}</h4>
    </div>
  )
}

export default Word
