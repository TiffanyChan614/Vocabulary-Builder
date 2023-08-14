import { useState, createContext } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import SearchField from '../components/SearchField'
import WordForm from '../components/WordForm'

export const SearchContext = createContext()

const Search = () => {
  const [searchValue, setSearchValue] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [formWord, setFormWord] = useState('')
  const navigate = useNavigate()

  console.log('formWord', formWord)

  const handleInputChange = (e) => {
    setSearchValue(e.target.value)
    navigate('.')
  }

  return (
    <SearchContext.Provider
      value={{
        searchValue,
        setSearchValue,
        showForm,
        setShowForm,
        formWord,
        setFormWord,
      }}>
      <div className='flex flex-col gap-5 w-full max-w-screen-md'>
        <SearchField
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          placeholder='Search for a word'
          handleInputChange={handleInputChange}
        />
        <Outlet />
      </div>
      {showForm && <WordForm page='search' />}
    </SearchContext.Provider>
  )
}

export default Search
