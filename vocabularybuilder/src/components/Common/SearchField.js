import { MdClear } from 'react-icons/md'

const SearchField = ({
  searchValue,
  clearSearchValue,
  placeholder,
  handleInputChange,
}) => {
  return (
    <div className='search--search-field border-2 rounded-full py-1 pr-2 pl-3 flex justify-between'>
      <input
        type='text'
        className='search outline-none w-full'
        value={searchValue}
        placeholder={placeholder || ''}
        onChange={handleInputChange}
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
