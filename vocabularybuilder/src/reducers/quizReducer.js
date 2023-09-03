import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  wordArray: [],
  questionArray: [],
  mode: '',
  number: 0,
  showNotFinished: false,
  showQuit: false,
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
  },
})

export const updateQuizWordArray = (wordArray) => {
  return { type: 'quiz/setWordArray', payload: wordArray }
}

export const updateQuizQuestionArray = (questionArray) => {
  return { type: 'quiz/setQuestionArray', payload: questionArray }
}

export const updateQuizMode = (mode) => {
  return { type: 'quiz/setMode', payload: mode }
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

export const updateQuizShowQuit = (showQuit) => {
  return { type: 'quiz/setShowQuit', payload: showQuit }
}

export const updateQuizInSession = (inSession) => {
  return { type: 'quiz/setInSession', payload: inSession }
}

export const resetQuiz = () => {
  return { type: 'quiz/resetQuiz' }
}

export default quizSlice.reducer
