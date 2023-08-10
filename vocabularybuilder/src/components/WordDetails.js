const WordDetail = ({ fieldName, fieldData, transformSentence, speak }) => {
  let fieldContent

  if (fieldName === 'Examples') {
    fieldContent = (
      <div className='word--details-content'>
        <ol className='word-details--example-list'>
          {fieldData?.map((example, i) => {
            const formattedExample = transformSentence(example)
            const lines = formattedExample.split('/')
            return (
              <li key={example + i}>
                {lines.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
                <button onClick={(e) => speak(e, example, 'samantha', 0.8)}>
                  Play
                </button>
              </li>
            )
          })}
        </ol>
      </div>
    )
  } else if (fieldName === 'Images') {
    fieldContent = (
      <div className='word--details-content'>
        {fieldData.map((image, i) => (
          <img
            key={image + i}
            src={image.src}
            alt={image.alt}
          />
        ))}
      </div>
    )
  } else {
    fieldContent = (
      <div className='word--details-content'>
        {fieldData?.map((data, i) => (
          <div key={i}>{i === fieldData.length - 1 ? data : data + ', '}</div>
        ))}
      </div>
    )
  }
  return (
    <div className='word--details'>
      <div className='word--details-name'>{fieldName}</div>
      {fieldContent}
    </div>
  )
}

export default WordDetail
