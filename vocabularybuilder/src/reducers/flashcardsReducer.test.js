import flashcardsReducer, {
  setMode,
  setWordArray,
  setNumber,
  setWordArrayByIndex,
  setShowNotFinished,
  setShowQuit,
  setInSession,
  resetFlashcards,
} from './flashcardsReducer'

describe('flashcards reducer', () => {
  const initialState = {
    mode: '',
    wordArray: [],
    number: 0,
    showNotFinished: false,
    showQuit: false,
    inSession: false,
  }

  it('should handle setMode', () => {
    const nextState = flashcardsReducer(initialState, setMode('testing'))
    expect(nextState.mode).toEqual('testing')
  })

  it('should handle setWordArray', () => {
    const testWordArray = ['word1', 'word2']
    const nextState = flashcardsReducer(
      initialState,
      setWordArray(testWordArray)
    )
    expect(nextState.wordArray).toEqual(testWordArray)
  })

  it('should handle setNumber', () => {
    const nextState = flashcardsReducer(initialState, setNumber(2))
    expect(nextState.number).toEqual(2)
  })

  it('should handle setWordArrayByIndex', () => {
    const initialStateWithWords = {
      ...initialState,
      wordArray: ['word1', 'word2', 'word3'],
    }
    const nextState = flashcardsReducer(
      initialStateWithWords,
      setWordArrayByIndex({ index: 1, word: 'newWord' })
    )
    expect(nextState.wordArray).toEqual(['word1', 'newWord', 'word3'])
  })

  it('should handle setShowNotFinished', () => {
    const nextState = flashcardsReducer(initialState, setShowNotFinished(true))
    expect(nextState.showNotFinished).toBe(true)
  })

  it('should handle setShowQuit', () => {
    const nextState = flashcardsReducer(initialState, setShowQuit(true))
    expect(nextState.showQuit).toBe(true)
  })

  it('should handle setInSession', () => {
    const nextState = flashcardsReducer(initialState, setInSession(true))
    expect(nextState.inSession).toBe(true)
  })

  it('should handle resetFlashcards', () => {
    const currentState = {
      mode: 'testMode',
      wordArray: ['testWord'],
      number: 5,
      showNotFinished: true,
      showQuit: true,
      inSession: true,
    }
    const nextState = flashcardsReducer(currentState, resetFlashcards())
    expect(nextState).toEqual(initialState)
  })
})
