import { AiFillSound } from 'react-icons/ai'

const WordDetail = ({ fieldName, fieldData, transformSentence, speak }) => {
  if (!fieldData) return null

  let fieldContent

  if (fieldName === 'Examples') {
    fieldContent = (
      <div className='word--details-content'>
        <ul className='word-details--example-list flex- flex-col gap-2'>
          {fieldData?.map((example, i) => {
            const formattedExample = transformSentence(example)
            const lines = formattedExample.split('/')
            return (
              <li
                key={example + i}
                className='flex flex-row gap-3'>
                <div className='lines'>
                  {lines.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
                <button onClick={(e) => speak(e, example, 'samantha', 0.8)}>
                  <AiFillSound size={15} />
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    )
  } else if (fieldName === 'Images') {
    fieldContent = (
      <div className='word--details-content flex gap-2 wrap'>
        {fieldData.map((image, i) => (
          <img
            className='w-20 md:w-40 object-cover rounded-lg'
            key={image + i}
            src={image.src}
            alt={image.alt}
          />
        ))}
      </div>
    )
  } else {
    const content = fieldData?.map((data, i) =>
      i === fieldData?.length - 1 ? data : data + ', '
    )

    fieldContent = (
      <div className='word--details-content flex gap-2'>{content}</div>
    )
  }
  return (
    <div className='word--details'>
      <div className='word--details-name font-bold'>{fieldName}</div>
      {fieldContent}
    </div>
  )
}

export default WordDetail
