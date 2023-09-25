import quizReducer, {
  setWordArray,
  setQuestionArray,
  setMode,
  setNumber,
  setWordArrayById,
  setShowNotFinished,
  setShowQuit,
  setInSession,
  resetQuiz,
  setError,
  setIsLoading
} from './quizReducer'

import { describe, it, expect } from 'vitest'

describe('quiz reducer', () => {
  const initialState = {
    wordArray: [],
    questionArray: [],
    mode: '',
    number: 0,
    showNotFinished: false,
    showQuit: false,
    inSession: false,
    isLoading: false,
    error: null
  }

  it('should handle setWordArray', () => {
    const testWordArray = ['word1', 'word2']
    const nextState = quizReducer(initialState, setWordArray(testWordArray))
    expect(nextState.wordArray).toEqual(testWordArray)
  })

  it('should handle setQuestionArray', () => {
    const testQuestionArray = ['question1', 'question2']
    const nextState = quizReducer(
      initialState,
      setQuestionArray(testQuestionArray)
    )
    expect(nextState.questionArray).toEqual(testQuestionArray)
  })

  it('should handle setMode', () => {
    const nextState = quizReducer(initialState, setMode('testing'))
    expect(nextState.mode).toBe('testing')
  })

  it('should handle setNumber', () => {
    const nextState = quizReducer(initialState, setNumber(5))
    expect(nextState.number).toBe(5)
  })

  it('should handle setWordArrayById', () => {
    const initialStateWithWords = {
      ...initialState,
      wordArray: [
        { id: 1, word: 'word1' },
        { id: 2, word: 'word2' }
      ]
    }
    const nextState = quizReducer(
      initialStateWithWords,
      setWordArrayById({ id: 2, word: { id: 2, word: 'newWord' } })
    )
    expect(nextState.wordArray[1].word).toBe('newWord')
  })

  it('should handle setShowNotFinished', () => {
    const nextState = quizReducer(initialState, setShowNotFinished(true))
    expect(nextState.showNotFinished).toBe(true)
  })

  it('should handle setShowQuit', () => {
    const nextState = quizReducer(initialState, setShowQuit(true))
    expect(nextState.showQuit).toBe(true)
  })

  it('should handle setInSession', () => {
    const nextState = quizReducer(initialState, setInSession(true))
    expect(nextState.inSession).toBe(true)
  })

  it('should handle resetQuiz', () => {
    const currentState = {
      ...initialState,
      mode: 'testMode',
      wordArray: ['testWord'],
      number: 5,
      showNotFinished: true,
      showQuit: true,
      inSession: true,
      isLoading: true,
      error: 'Test Error'
    }
    const nextState = quizReducer(currentState, resetQuiz())
    expect(nextState).toEqual(initialState)
  })

  it('should handle setError', () => {
    const testError = 'An error occurred'
    const nextState = quizReducer(initialState, setError(testError))
    expect(nextState.error).toBe(testError)
  })

  it('should handle setIsLoading', () => {
    const nextState = quizReducer(initialState, setIsLoading(true))
    expect(nextState.isLoading).toBe(true)
  })
})
