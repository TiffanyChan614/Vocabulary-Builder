import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  wordData: [],
  isLoading: false,
  partOfSpeechFilter: '',
  showDetails: {},
  showAllDetails: false,
}

const wordMeaningsSlice = createSlice({
  name: 'wordMeanings',
  initialState,
  reducers: {
    setWordData: (state, action) => {
      const wordData = action.payload
      // console.log('wordData in wordMeaningsReducer', wordData)
      if (wordData?.results && wordData?.results?.length > 0) {
        state.wordData = wordData.results.map((result) => {
          // console.log('result in reducer', result.id)
          return {
            id: result.id,
            word: wordData.word || 'no word',
            definition: result.definition || null,
            pronunciation: wordData.pronunciation?.all || null,
            partOfSpeech: result.partOfSpeech || null,
            synonyms: result.synonyms || null,
            antonyms: result.antonyms || null,
            examples: result.examples || null,
            images: [],
          }
        })
      } else {
        state.wordData = [
          {
            id: null,
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

      state.wordData?.forEach((result) => {
        if (typeof state.showDetails[result.id] === 'undefined') {
          state.showDetails[result.id] = false
        }
      })
      // console.log('---------------------------------')
      // console.log('state.showDetails', state.showDetails)
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setPartOfSpeechFilter: (state, action) => {
      state.partOfSpeechFilter = action.payload
    },
    setShowDetailsById: (state, action) => {
      const { wordId, showDetails } = action.payload
      state.showDetails[wordId] = showDetails
      for (const wordId in state.showDetails) {
        if (state.showDetails[wordId] === false) {
          state.showAllDetails = false
          return
        }
      }
      state.showAllDetails = true
    },
    setShowDetails: (state, action) => {
      state.showDetails = action.payload
      for (const wordId in state.showDetails) {
        if (state.showDetails[wordId] === false) {
          state.showAllDetails = false
          return
        }
      }
      state.showAllDetails = true
    },
    toggleShowDetails: (state, action) => {
      const value = action.payload
      const newShowDetails = {}
      for (const wordId in state.showDetails) {
        newShowDetails[wordId] = value
      }
      state.showDetails = newShowDetails
      console.log('state.showDetails', state.showDetails)
      state.showAllDetails = value
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
  console.log('new showDetails', { ...showDetails, [wordId]: showDetails })
  return {
    type: 'wordMeanings/setShowDetailsById',
    payload: { wordId, showDetails },
  }
}

export const resetMeaningsShowDetails = () => {
  console.log('clearing showDetails')
  return {
    type: 'wordMeanings/setShowDetails',
    payload: {},
  }
}

export const toggleShowDetails = (newValue) => {
  return {
    type: 'wordMeanings/toggleShowDetails',
    payload: newValue,
  }
}

export const { setWordData, setIsLoading, setPartOfSpeechFilter } =
  wordMeaningsSlice.actions

export default wordMeaningsSlice.reducer
