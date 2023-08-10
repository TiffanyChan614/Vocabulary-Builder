import { useState, createContext } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import SearchField from '../components/SearchField'

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
        <SearchField
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          placeholder='Search for a word'
          handleInputChange={handleInputChange}
        />
        <Outlet />
      </div>
    </SearchContext.Provider>
  )
}

export default Search
