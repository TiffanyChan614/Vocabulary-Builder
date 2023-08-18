import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  words: [],
  searchValue: '',
  sortValue: 'updated',
  partOfSpeechFilter: null,
  showForm: false,
  formWord: '',
}

const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    setWords: (state, action) => {
      state.words = action.payload
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

export const {
  setWords,
  setSearchValue,
  setSortValue,
  setPartOfSpeechFilter,
  setShowForm,
  setFormWord,
} = journalSlice.actions

export default journalSlice.reducer
