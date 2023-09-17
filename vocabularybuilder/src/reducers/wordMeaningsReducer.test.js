import wordMeaningsReducer, {
  setWordData,
  setIsLoading,
  setPartOfSpeechFilter,
  setShowDetailsById,
  setShowDetailsArray,
  setShowAllDetails,
  setError,
  setFilterOpen,
} from './wordMeaningsReducer'

describe('wordMeanings reducer', () => {
  const initialState = {
    wordData: [],
    isLoading: false,
    partOfSpeechFilter: '',
    showDetails: {},
    showAllDetails: false,
    error: null,
    filterOpen: false,
  }

  it('should handle setWordData', () => {
    const testWordData = {
      results: [
        {
          id: 1,
          definition: 'Definition 1',
          partOfSpeech: 'noun',
          synonyms: ['synonym1', 'synonym2'],
        },
        {
          id: 2,
          definition: 'Definition 2',
          partOfSpeech: 'verb',
          synonyms: ['synonym3', 'synonym4'],
        },
      ],
      word: 'testWord',
      pronunciation: {
        all: 'testPronunciation',
      },
    }
    const nextState = wordMeaningsReducer(
      initialState,
      setWordData(testWordData)
    )
    expect(nextState.wordData.length).toBe(2)
    expect(nextState.wordData[0].id).toBe(1)
    expect(nextState.wordData[1].id).toBe(2)
  })

  it('should handle setIsLoading', () => {
    const nextState = wordMeaningsReducer(initialState, setIsLoading(true))
    expect(nextState.isLoading).toBe(true)
  })

  it('should handle partOfSpeechFilter', () => {
    const nextState = wordMeaningsReducer(
      initialState,
      setPartOfSpeechFilter('noun')
    )
    expect(nextState.partOfSpeechFilter).toBe('noun')
  })
  it('should handle setShowDetailsById', () => {
    const nextState = wordMeaningsReducer(
      initialState,
      setShowDetailsById({ wordId: 1, showDetails: true })
    )
    expect(nextState.showDetails[1]).toBe(true)
  })

  it('should handle setShowDetailsArray', () => {
    const testShowDetails = { 1: true, 2: false }
    const nextState = wordMeaningsReducer(
      initialState,
      setShowDetailsArray(testShowDetails)
    )
    expect(nextState.showDetails).toEqual(testShowDetails)
  })

  it('should handle setShowAllDetails', () => {
    const nextState = wordMeaningsReducer(initialState, setShowAllDetails(true))
    expect(nextState.showAllDetails).toBe(true)
    expect(nextState.showDetails).toEqual({}) // Expect showDetails to be empty
  })

  it('should handle setError', () => {
    const testError = 'An error occurred.'
    const nextState = wordMeaningsReducer(initialState, setError(testError))
    expect(nextState.error).toBe(testError)
  })

  it('should handle setFilterOpen', () => {
    const nextState = wordMeaningsReducer(initialState, setFilterOpen(true))
    expect(nextState.filterOpen).toBe(true)
  })
})
