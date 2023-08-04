import { useState, createContext } from 'react'
import { Link, Outlet } from 'react-router-dom'

export const SearchContext = createContext()

const Search = () => {
  const [searchValue, setSearchValue] = useState('')

  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      <div>
        <div className='search--search-field'>
          <input
            type='text'
            id='search'
            value={searchValue}
            placeholder='Search for a word'
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <div className='search--user-input'>{searchValue}</div>
        </div>
        <Outlet />
      </div>
    </SearchContext.Provider>
  )
}

export default Search
