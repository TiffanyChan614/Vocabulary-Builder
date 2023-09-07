import { createSlice } from '@reduxjs/toolkit'

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
}

const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    setWords: (state, action) => {
      const newWords = action.payload
      const newShowDetails = { ...state.showDetails }

      newWords?.forEach((result) => {
        if (typeof state.showDetails[result.id] === 'undefined') {
          newShowDetails[result.id] = false
        }
      })

      let allDetailsShown = true
      for (const wordId in newShowDetails) {
        if (!newShowDetails[wordId]) {
          allDetailsShown = false
          break
        }
      }

      return {
        ...state,
        words: newWords,
        showDetails: newShowDetails,
        showAllDetails: allDetailsShown,
      }
    },
    setSearchValue: (state, action) => {
      return {
        ...state,
        searchValue: action.payload,
      }
    },
    setSortValue: (state, action) => {
      return {
        ...state,
        sortValue: action.payload,
      }
    },
    setPartOfSpeechFilter: (state, action) => {
      return {
        ...state,
        partOfSpeechFilter: action.payload,
      }
    },
    setShowForm: (state, action) => {
      state.showForm = action.payload
    },
    setFormWord: (state, action) => {
      state.formWord = action.payload
    },
    setShowDetailsById: (state, action) => {
      const { wordId, showDetails } = action.payload
      const newShowDetails = { ...state.showDetails, [wordId]: showDetails }

      let allDetailsShown = true
      for (const wordId in newShowDetails) {
        if (!newShowDetails[wordId]) {
          allDetailsShown = false
          break
        }
      }

      return {
        ...state,
        showDetails: newShowDetails,
        showAllDetails: allDetailsShown,
      }
    },
    setShowAllDetails: (state, action) => {
      const value = action.payload
      const newShowDetails = {}
      for (const wordId in state.showDetails) {
        newShowDetails[wordId] = value
      }
      return {
        ...state,
        showDetails: newShowDetails,
        showAllDetails: value,
      }
    },
    setGoToTopButton: (state, action) => {
      return {
        ...state,
        showGoToTopButton: action.payload,
      }
    },
  },
})

export const {
  setWords,
  setSearchValue,
  setSortValue,
  setPartOfSpeechFilter,
  setShowForm,
  setFormWord,
  setShowDetailsById,
  setShowAllDetails,
  setGoToTopButton,
} = journalSlice.actions
export default journalSlice.reducer
