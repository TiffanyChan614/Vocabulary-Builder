import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  searchValue: '',
  showForm: false,
  formWord: '',
  currentPage: 'search'
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
    }
  }
})

export const { setSearchValue, setShowForm, setFormWord, setCurrentPage } =
  searchSlice.actions
export default searchSlice.reducer
