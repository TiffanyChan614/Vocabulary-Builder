import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  wordArray: [],
  questionArray: [],
  mode: '',
  number: 0,
  showNotFinished: false,
  showQuit: false,
  inSession: false,
  isLoading: false,
  error: null,
}

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setWordArray: (state, action) => {
      return {
        ...state,
        wordArray: action.payload,
      }
    },
    setQuestionArray: (state, action) => {
      return {
        ...state,
        questionArray: action.payload,
      }
    },
    setMode: (state, action) => {
      return {
        ...state,
        mode: action.payload,
      }
    },
    setNumber: (state, action) => {
      return {
        ...state,
        number: action.payload,
      }
    },
    setWordArrayById: (state, action) => {
      const { id, word } = action.payload
      const newWordArray = state.wordArray.map((w) => {
        if (w.id === id) {
          return word
        } else {
          return w
        }
      })
      return {
        ...state,
        wordArray: newWordArray,
      }
    },
    setShowNotFinished: (state, action) => {
      return {
        ...state,
        showNotFinished: action.payload,
      }
    },
    setShowQuit: (state, action) => {
      return {
        ...state,
        showQuit: action.payload,
      }
    },
    setInSession: (state, action) => {
      return {
        ...state,
        inSession: action.payload,
      }
    },
    resetQuiz: () => {
      return initialState
    },
    setError: (state, action) => {
      return {
        ...state,
        error: action.payload,
      }
    },
    setIsLoading: (state, action) => {
      return {
        ...state,
        isLoading: action.payload,
      }
    },
  },
})

export const {
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
  setIsLoading,
} = quizSlice.actions
export default quizSlice.reducer
