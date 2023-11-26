import { MdClear } from 'react-icons/md'
import React from 'react'
import PropTypes from 'prop-types'

const SearchField = ({
  searchValue,
  clearSearchValue,
  placeholder,
  handleInputChange
}) => {
  return (
    <div className='search--search-field border-2 rounded-full py-1 pr-2 pl-3 flex justify-between'>
      <input
        type='text'
        className='search outline-none w-full'
        value={searchValue}
        placeholder={placeholder || ''}
        onChange={handleInputChange}
        autoFocus
      />
      <button
        type='button'
        onClick={clearSearchValue}>
        <MdClear
          size={18}
          color='gray'
        />
      </button>
    </div>
  )
}

export default SearchField

SearchField.propTypes = {
  searchValue: PropTypes.string.isRequired,
  clearSearchValue: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  handleInputChange: PropTypes.func.isRequired
}
