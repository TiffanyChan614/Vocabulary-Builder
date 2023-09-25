import TextArea from '../../Common/TextArea'
import { MdOutlineDeleteOutline } from 'react-icons/md'
import { AiOutlinePlus } from 'react-icons/ai'
import React from 'react'
import PropType from 'prop-types'

const WordFormField = ({
  fieldName,
  fieldData,
  handleChange,
  handleDelete,
  handleAdd
}) => {
  return (
    <div className='word-form--fields flex flex-col gap-2'>
      <div className='word-form--details-name font-bold'>
        {fieldName[0].toUpperCase() + fieldName.slice(1)}
      </div>
      <div className='word-form--details-content flex flex-col gap-2'>
        {fieldData?.map((data, i) => (
          <div key={data + i}>
            <div className='flex flex-row gap-2 items-center'>
              <TextArea
                id={`${fieldName}-${i}`}
                name={fieldName}
                value={data}
                onBlur={(e) => handleChange(e, i)}
                height={fieldName === 'examples' ? 'h-15' : 'h-10'}
              />
              <button
                type='button'
                className='delete'
                name={fieldName}
                onClick={(e) => handleDelete(e, i)}>
                <div className='pointer-events-none'>
                  <MdOutlineDeleteOutline size={20} />
                </div>
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
        <div className='pointer-events-none'>
          <AiOutlinePlus size={20} />
        </div>
        <div className='ml-2 pointer-events-none'>
          Add {fieldName[0].toUpperCase() + fieldName.slice(1)}
        </div>
      </button>
    </div>
  )
}

export default WordFormField

WordFormField.propTypes = {
  fieldName: PropType.string.isRequired,
  fieldData: PropType.array.isRequired,
  handleChange: PropType.func.isRequired,
  handleDelete: PropType.func.isRequired,
  handleAdd: PropType.func.isRequired
}
