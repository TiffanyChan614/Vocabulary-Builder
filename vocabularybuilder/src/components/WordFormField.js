import TextArea from './TextArea'
import { MdOutlineDeleteOutline } from 'react-icons/md'
import { AiOutlinePlus } from 'react-icons/ai'

const WordFormField = ({
  fieldName,
  fieldData,
  handleChange,
  handleDelete,
  handleAdd,
}) => {
  return (
    <div className='word-form--fields flex flex-col gap-2'>
      <div className='word-form--details-name font-bold'>
        {fieldName[0].toUpperCase() + fieldName.slice(1)}
      </div>
      <div className='word-form--details-content flex flex-col gap-2'>
        {fieldData?.map((data, i) => (
          <div>
            <div
              key={data + i}
              className='flex flex-row gap-2 items-center'>
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
                <MdOutlineDeleteOutline size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        name={fieldName}
        type='button'
        onClick={handleAdd}
        className='flex items-center hover:bg-indigo-100 rounded p-2'>
        <AiOutlinePlus size={20} />
        <span className='ml-2'>
          Add {fieldName[0].toUpperCase() + fieldName.slice(1)}
        </span>
      </button>
    </div>
  )
}

export default WordFormField
