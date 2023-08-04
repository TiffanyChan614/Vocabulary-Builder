import { useState, createContext } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export const SearchContext = createContext()

const Search = () => {
  const [searchValue, setSearchValue] = useState('')
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    setSearchValue(e.target.value)
    navigate('.')
  }

  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      <div>
        <div className='search--search-field'>
          <input
            type='text'
            id='search'
            value={searchValue}
            placeholder='Search for a word'
            onChange={handleInputChange}
          />
          <div className='search--user-input'>{searchValue}</div>
        </div>
        <Outlet />
      </div>
    </SearchContext.Provider>
  )
}

export default Search
