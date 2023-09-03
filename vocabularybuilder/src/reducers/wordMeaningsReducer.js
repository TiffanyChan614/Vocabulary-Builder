import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

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

      let newWordData
      if (wordData.results && wordData.results?.length > 0) {
        newWordData = wordData.results?.map((result) => {
          // console.log('result in reducer', result.id)
          return {
            id: result.id || uuidv4(),
            word: wordData.word || 'no word',
            definition: result.definition || null,
            pronunciation: wordData.pronunciation?.all || null,
            partOfSpeech: result.partOfSpeech || null,
            synonyms: result.synonyms || null,
            antonyms: result.antonyms || null,
            examples: result.examples || null,
            images: [],
            points: null,
            lastReviewed: null,
          }
        })
      } else {
        newWordData = [
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
            points: null,
            lastReviewed: null,
          },
        ]
      }

      console.log('newWordData', newWordData)

      const newShowDetails = { ...state.showDetails }

      newWordData?.forEach((result) => {
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
        wordData: newWordData,
        showDetails: newShowDetails,
        showAllDetails: allDetailsShown,
      }
    },
    setIsLoading: (state, action) => {
      return {
        ...state,
        isLoading: action.payload,
      }
    },
    setPartOfSpeechFilter: (state, action) => {
      return {
        ...state,
        partOfSpeechFilter: action.payload,
      }
    },
    setShowDetailsById: (state, action) => {
      const { wordId, showDetails } = action.payload
      const newShowDetails = {
        ...state.showDetails,
        [wordId]: showDetails,
      }

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
    setShowDetails: (state, action) => {
      const newShowDetails = action.payload

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
    toggleShowDetails: (state, action) => {
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

export const toggleMeaningsShowDetails = (newValue) => {
  return {
    type: 'wordMeanings/toggleShowDetails',
    payload: newValue,
  }
}

export default wordMeaningsSlice.reducer
