import { useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import SearchField from '../components/SearchField'
import WordForm from '../components/WordForm'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateSearchSearchValue,
  updateSearchCurrentPage,
} from '../reducers/searchReducer'
import {
  resetMeaningsShowDetails,
  updateMeaningsPartOfSpeechFilter,
} from '../reducers/wordMeaningsReducer'

const Search = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { searchValue, showForm, formWord, currentPage } = useSelector(
    (state) => state.search
  )

  console.log('formWord', formWord)
  console.log('searchValue in Search', searchValue)

  const handleInputChange = (e) => {
    dispatch(resetMeaningsShowDetails())
    dispatch(updateMeaningsPartOfSpeechFilter(''))
    dispatch(updateSearchSearchValue(e.target.value))
    dispatch(updateSearchCurrentPage('search'))
  }

  const clearSearchValue = () => {
    dispatch(resetMeaningsShowDetails())
    dispatch(updateMeaningsPartOfSpeechFilter(''))
    dispatch(updateSearchSearchValue(''))
    dispatch(updateSearchCurrentPage('search'))
  }

  useEffect(() => {
    navigate(`/${currentPage}`)
  }, [currentPage, navigate])

  return (
    <>
      <div className='flex flex-col gap-5 w-full max-w-screen-md'>
        <SearchField
          searchValue={searchValue}
          clearSearchValue={clearSearchValue}
          placeholder='Search for a word'
          handleInputChange={handleInputChange}
        />
        <Outlet />
      </div>
      {showForm && <WordForm page='search' />}
    </>
  )
}

export default Search
