import TextArea from './TextArea'

const WordFormField = ({
  fieldName,
  fieldData,
  handleChange,
  handleDelete,
  handleAdd,
}) => {
  return (
    <div className='word-form--fields'>
      <div className='word-form--details-name'>{fieldName}</div>
      <div className='word-form--details-content'>
        {fieldData?.map((data, i) => (
          <div key={data + i}>
            <TextArea
              id={`${fieldName}-${i}`}
              name={fieldName}
              value={data}
              onBlur={(e) => handleChange(e, i)}
            />
            <button
              type='button'
              className='delete'
              name={fieldName}
              onClick={(e) => handleDelete(e, i)}>
              Delete
            </button>
          </div>
        ))}
      </div>
      <button
        name={fieldName}
        type='button'
        onClick={handleAdd}>
        Add
      </button>
    </div>
  )
}

export default WordFormField
