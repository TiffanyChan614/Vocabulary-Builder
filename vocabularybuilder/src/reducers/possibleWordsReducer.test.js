import possibleWordsReducer, {
  setMatchedWords,
  setIsLoading,
  setError,
} from './possibleWordsReducer'

describe('possibleWords reducer', () => {
  const initialState = {
    matchedWords: [],
    isLoading: false,
    error: null,
  }

  it('should handle setMatchedWords', () => {
    const testMatchedWords = ['word1', 'word2']
    const nextState = possibleWordsReducer(
      initialState,
      setMatchedWords(testMatchedWords)
    )
    expect(nextState.matchedWords).toEqual(testMatchedWords)
  })

  it('should handle setIsLoading', () => {
    const nextState = possibleWordsReducer(initialState, setIsLoading(true))
    expect(nextState.isLoading).toBe(true)
  })

  it('should handle setError', () => {
    const testError = 'An error occurred.'
    const nextState = possibleWordsReducer(initialState, setError(testError))
    expect(nextState.error).toBe(testError)
  })
})
