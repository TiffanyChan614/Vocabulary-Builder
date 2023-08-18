import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  searchValue: '',
  showForm: false,
  formWord: '',
  currentPage: 'search',
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload
    },
    setShowForm: (state, action) => {
      state.showForm = action.payload
    },
    setFormWord: (state, action) => {
      state.formWord = action.payload
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
  },
})

export const updateSearchSearchValue = (searchValue) => {
  return { type: 'search/setSearchValue', payload: searchValue }
}

export const updateSearchShowForm = (showForm) => {
  return { type: 'search/setShowForm', payload: showForm }
}

export const updateSearchFormWord = (formWord) => {
  return { type: 'search/setFormWord', payload: formWord }
}

export const updateSearchCurrentPage = (currentPage) => {
  return { type: 'search/setCurrentPage', payload: currentPage }
}

export const { setSearchValue, setShowForm, setFormWord } = searchSlice.actions

export default searchSlice.reducer
