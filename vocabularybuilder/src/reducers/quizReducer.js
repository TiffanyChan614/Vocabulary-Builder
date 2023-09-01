import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  wordArray: [],
  questionArray: [],
  number: 0,
  showNotFinished: false,
  showQuiz: false,
  inSession: false,
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
    setShowQuiz: (state, action) => {
      return {
        ...state,
        showQuiz: action.payload,
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
  },
})

export const updateQuizWordArray = (wordArray) => {
  return { type: 'quiz/setWordArray', payload: wordArray }
}

export const updateQuizQuestionArray = (questionArray) => {
  return { type: 'quiz/setQuestionArray', payload: questionArray }
}

export const updateQuizNumber = (number) => {
  return { type: 'quiz/setNumber', payload: number }
}

export const updateQuizWordArrayById = (id, word) => {
  return { type: 'quiz/setWordArrayById', payload: { id, word } }
}

export const updateQuizShowNotFinished = (showNotFinished) => {
  return { type: 'quiz/setShowNotFinished', payload: showNotFinished }
}

export const updateQuizShowQuit = (showQuiz) => {
  return { type: 'quiz/setShowQuit', payload: showQuiz }
}

export const updateQuizInSession = (inSession) => {
  return { type: 'quiz/setInSession', payload: inSession }
}

export const resetQuiz = () => {
  return { type: 'quiz/resetQuiz' }
}

export default quizSlice.reducer
