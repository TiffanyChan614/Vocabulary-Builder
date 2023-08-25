import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  mode: '',
  wordArray: [],
  number: 0,
  showNotFinished: false,
  showQuit: false,
  inSession: false,
}

const flashcardsSlice = createSlice({
  name: 'flashcards',
  initialState,
  reducers: {
    setMode: (state, action) => {
      return {
        ...state,
        mode: action.payload,
      }
    },
    setWordArray: (state, action) => {
      return {
        ...state,
        wordArray: action.payload,
      }
    },
    setNumber: (state, action) => {
      return {
        ...state,
        number: action.payload,
      }
    },
    setWordArrayByIndex: (state, action) => {
      const { index, word } = action.payload
      const newWordArray = [...state.wordArray]
      newWordArray[index] = word
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
    resetFlashcards: () => {
      return {
        ...initialState,
      }
    },
  },
})

export const updateFlashcardsMode = (mode) => {
  return { type: 'flashcards/setMode', payload: mode }
}

export const updateFlashcardsWordArray = (wordArray) => {
  return { type: 'flashcards/setWordArray', payload: wordArray }
}

export const updateFlashcardsWordArrayByIndex = (index, word) => {
  return { type: 'flashcards/setWordArrayByIndex', payload: { index, word } }
}

export const updateFlashcardsNumber = (number) => {
  return { type: 'flashcards/setNumber', payload: number }
}

export const updateFlashcardsShowNotFinished = (show) => {
  return { type: 'flashcards/setShowNotFinished', payload: show }
}

export const updateFlashcardsShowQuit = (show) => {
  return { type: 'flashcards/setShowQuit', payload: show }
}

export const updateFlashcardsInSession = (ended) => {
  return { type: 'flashcards/setInSession', payload: ended }
}

export const resetFlashcards = () => {
  return { type: 'flashcards/resetFlashcards' }
}

export default flashcardsSlice.reducer
