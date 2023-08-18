import { configureStore } from '@reduxjs/toolkit'
import journalReducer from './reducers/journalReducer'
import searchReducer from './reducers/searchReducer'
import possibleWordsReducer from './reducers/possibleWordsReducer'
import wordMeaningsReducer from './reducers/wordMeaningsReducer'

const store = configureStore({
  reducer: {
    journal: journalReducer,
    search: searchReducer,
    possibleWords: possibleWordsReducer,
    wordMeanings: wordMeaningsReducer,
  },
})

export default store
