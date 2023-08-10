const SearchField = ({
  searchValue,
  setSearchValue,
  placeholder,
  handleInputChange,
}) => {
  return (
    <div className='search--search-field'>
      <input
        type='text'
        className='search'
        value={searchValue}
        placeholder={placeholder || ''}
        onChange={handleInputChange}
      />
      <button
        type='button'
        onClick={() => setSearchValue('')}>
        Clear
      </button>
    </div>
  )
}

export default SearchField
