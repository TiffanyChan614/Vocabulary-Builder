import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

const initialState = {
  wordData: [],
  isLoading: false,
  partOfSpeechFilter: '',
  showDetails: {},
}

const wordMeaningsSlice = createSlice({
  name: 'wordMeanings',
  initialState,
  reducers: {
    setWordData: (state, action) => {
      const wordData = action.payload
      console.log('wordData in wordMeaningsReducer', wordData)
      if (wordData?.results && wordData?.results?.length > 0) {
        state.wordData = wordData.results.map((result) => ({
          id: uuidv4(),
          word: wordData.word || 'no word',
          definition: result.definition || null,
          pronunciation: wordData.pronunciation?.all || null,
          partOfSpeech: result.partOfSpeech || null,
          synonyms: result.synonyms || null,
          antonyms: result.antonyms || null,
          examples: result.examples || null,
          images: [],
        }))
      } else {
        state.wordData = [
          {
            id: uuidv4(),
            word: wordData.word || 'no word',
            definition: null,
            pronunciation: null,
            partOfSpeech: null,
            synonyms: null,
            antonyms: null,
            examples: null,
            images: [],
          },
        ]
      }

      state.showDetails = {}
      state.wordData?.forEach((result) => {
        state.showDetails[result.id] = false
      })
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setPartOfSpeechFilter: (state, action) => {
      state.partOfSpeechFilter = action.payload
    },
    setShowDetails: (state, action) => {
      state.showDetails = action.payload
    },
  },
})

export const updateWordData = (wordData) => {
  return { type: 'wordMeanings/setWordData', payload: wordData }
}

export const updateIsLoading = (isLoading) => {
  return { type: 'wordMeanings/setIsLoading', payload: isLoading }
}

export const updateMeaningsPartOfSpeechFilter = (filter) => {
  return { type: 'wordMeanings/setPartOfSpeechFilter', payload: filter }
}

export const updateMeaningsShowDetails = (wordId, showDetails) => {
  return {
    type: 'wordMeanings/setShowDetails',
    payload: { ...showDetails, [wordId]: showDetails },
  }
}

export const { setWordData, setIsLoading, setPartOfSpeechFilter } =
  wordMeaningsSlice.actions

export default wordMeaningsSlice.reducer
