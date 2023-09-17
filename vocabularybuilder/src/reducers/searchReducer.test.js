import searchReducer, {
  setSearchValue,
  setShowForm,
  setFormWord,
  setCurrentPage,
} from './searchReducer'

describe('search reducer', () => {
  const initialState = {
    searchValue: '',
    showForm: false,
    formWord: '',
    currentPage: 'search',
  }

  it('should handle setSearchValue', () => {
    const nextState = searchReducer(initialState, setSearchValue('searchText'))
    expect(nextState.searchValue).toBe('searchText')
  })

  it('should handle setShowForm', () => {
    const nextState = searchReducer(initialState, setShowForm(true))
    expect(nextState.showForm).toBe(true)
  })

  it('should handle setFormWord', () => {
    const nextState = searchReducer(initialState, setFormWord('newFormWord'))
    expect(nextState.formWord).toBe('newFormWord')
  })

  it('should handle setCurentPage', () => {
    const nextState = searchReducer(
      initialState,
      setCurrentPage('possibleWords')
    )
    expect(nextState.currentPage).toBe('possibleWords')
  })
})
