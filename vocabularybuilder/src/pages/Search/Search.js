import { useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import SearchField from '../../components/Common/SearchField'
import WordForm from '../../components/Features/WordForm/WordForm'
import { useDispatch, useSelector } from 'react-redux'
import {
  setSearchValue as setSearchSearchValue,
  setCurrentPage as setSearchCurrentPage,
} from '../../reducers/searchReducer'
import {
  setShowAllDetails as setMeaningsShowDetails,
  setPartOfSpeechFilter as setMeaningsPartOfSpeechFilter,
} from '../../reducers/wordMeaningsReducer'

const Search = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { searchValue, showForm, formWord, currentPage } = useSelector(
    (state) => state.search
  )

  console.log('formWord', formWord)
  console.log('searchValue in Search', searchValue)

  const handleInputChange = (e) => {
    dispatch(setMeaningsShowDetails({}))
    dispatch(setMeaningsPartOfSpeechFilter(''))
    dispatch(setSearchSearchValue(e.target.value))
    dispatch(setSearchCurrentPage('search'))
  }

  const clearSearchValue = () => {
    dispatch(setMeaningsShowDetails({}))
    dispatch(setMeaningsPartOfSpeechFilter(''))
    dispatch(setSearchSearchValue(''))
    dispatch(setSearchCurrentPage('search'))
  }

  useEffect(() => {
    navigate(`/${currentPage}`)
  }, [currentPage, navigate])

  return (
    <>
      <div className='flex flex-col gap-5 w-full'>
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
