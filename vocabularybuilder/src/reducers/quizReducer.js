import { createSlice } from '@reduxjs/toolkit'

const initialState = {
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
    setWordArrayByIndex: (state, action) => {
      const { index, word } = action.payload
      const newWordArray = [...state.questionArray]
      newWordArray[index] = word
      return {
        ...state,
        questionArray: newWordArray,
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

export const updateQuizQuestionArray = (questionArray) => {
  return { type: 'quiz/setQuestionArray', payload: questionArray }
}

export const updateQuizNumber = (number) => {
  return { type: 'quiz/setNumber', payload: number }
}

export const updateQuizWordArrayByIndex = (index, word) => {
  return { type: 'quiz/setWordArrayByIndex', payload: { index, word } }
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
