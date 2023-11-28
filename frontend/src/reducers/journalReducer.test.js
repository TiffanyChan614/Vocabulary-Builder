import journalReducer, {
  setWords,
  setSearchValue,
  setSortValue,
  setPartOfSpeechFilter,
  setShowForm,
  setFormWord,
  setShowDetailsById,
  setShowAllDetails,
  setGoToTopButton,
  setFilterOpen
} from './journalReducer'

describe('journalReducer', () => {
  const initialState = {
    words: [],
    searchValue: '',
    sortValue: 'updated',
    partOfSpeechFilter: null,
    showForm: false,
    formWord: '',
    showDetails: {},
    showAllDetails: false,
    showGoToTopButton: false,
    filterOpen: false
  }

  it('should handle setWords', () => {
    const testWords = [{ id: 1, word: 'testWord' }]
    const nextState = journalReducer(initialState, setWords(testWords))
    expect(nextState.words).toEqual(testWords)
  })

  it('should handle setSearchValue', () => {
    const nextState = journalReducer(initialState, setSearchValue('searchText'))
    expect(nextState.searchValue).toBe('searchText')
  })

  it('should handle setSortValue', () => {
    const nextState = journalReducer(initialState, setSortValue('alphabetical'))
    expect(nextState.sortValue).toBe('alphabetical')
  })

  it('should handle setPartOfSpeechFilter', () => {
    const nextState = journalReducer(
      initialState,
      setPartOfSpeechFilter('noun')
    )
    expect(nextState.partOfSpeechFilter).toBe('noun')
  })

  it('should handle setShowForm', () => {
    const nextState = journalReducer(initialState, setShowForm(true))
    expect(nextState.showForm).toBe(true)
  })

  it('should handle setFormWord', () => {
    const nextState = journalReducer(initialState, setFormWord('newFormWord'))
    expect(nextState.formWord).toBe('newFormWord')
  })

  it('should handle setShowDetailsById', () => {
    const initialStateWithShowDetails = {
      ...initialState,
      showDetails: { 1: false, 2: false }
    }
    const nextState = journalReducer(
      initialStateWithShowDetails,
      setShowDetailsById({ wordId: 1, showDetails: true })
    )
    expect(nextState.showDetails[1]).toBe(true)
  })

  it('should handle setShowAllDetails', () => {
    const nextState = journalReducer(initialState, setShowAllDetails(true))
    expect(nextState.showAllDetails).toBe(true)
    expect(
      Object.values(nextState.showDetails).every((value) => value === true)
    ).toBe(true)
  })

  it('should handle setGoToTopButton', () => {
    const nextState = journalReducer(initialState, setGoToTopButton(true))
    expect(nextState.showGoToTopButton).toBe(true)
  })

  it('should handle setFilterOpen', () => {
    const nextState = journalReducer(initialState, setFilterOpen(true))
    expect(nextState.filterOpen).toBe(true)
  })
})
