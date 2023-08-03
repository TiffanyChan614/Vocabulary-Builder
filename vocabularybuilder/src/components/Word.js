const Word = ({ wordData }) => {
  console.log('wordData', wordData)
  return (
    <div className='word'>
      <h3>{wordData.word}</h3>
      <h4>{wordData.result.definition}</h4>
    </div>
  )
}

export default Word
