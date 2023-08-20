import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  words: [],
  searchValue: '',
  sortValue: 'updated',
  partOfSpeechFilter: null,
  showForm: false,
  formWord: '',
  showDetails: {},
}

const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    setWords: (state, action) => {
      state.words = action.payload
      state.words?.forEach((word) => {
        console.log(word.id, state.showDetails[word.id])
        if (typeof state.showDetails[word.id] === 'undefined') {
          state.showDetails[word.id] = false
        }
      })
      console.log('after setting words, state.showDetails', state.showDetails)
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload
    },
    setSortValue: (state, action) => {
      state.sortValue = action.payload
    },
    setPartOfSpeechFilter: (state, action) => {
      state.partOfSpeechFilter = action.payload
    },
    setShowForm: (state, action) => {
      state.showForm = action.payload
    },
    setFormWord: (state, action) => {
      state.formWord = action.payload
    },
    setShowDetails: (state, action) => {
      const { wordId, showDetails } = action.payload
      state.showDetails[wordId] = showDetails
      console.log(
        'after setting showDetails, state.showDetails',
        wordId,
        state.showDetails[wordId],
        state.showDetails
      )
    },
  },
})

export const updateWords = (words) => {
  return { type: 'journal/setWords', payload: words }
}

export const updateJournalSearchValue = (searchValue) => {
  return { type: 'journal/setSearchValue', payload: searchValue }
}

export const updateSortValue = (sortValue) => {
  return { type: 'journal/setSortValue', payload: sortValue }
}

export const updateJournalPartOfSpeechFilter = (filter) => {
  return { type: 'journal/setPartOfSpeechFilter', payload: filter }
}

export const updateJournalShowForm = (showForm) => {
  return { type: 'journal/setShowForm', payload: showForm }
}

export const updateJournalFormWord = (formWord) => {
  return { type: 'journal/setFormWord', payload: formWord }
}

export const updateJournalShowDetails = (wordId, showDetails) => {
  return {
    type: 'journal/setShowDetails',
    payload: { wordId, showDetails },
  }
}

export const {
  setWords,
  setSearchValue,
  setSortValue,
  setPartOfSpeechFilter,
  setShowForm,
  setFormWord,
} = journalSlice.actions

export default journalSlice.reducer
