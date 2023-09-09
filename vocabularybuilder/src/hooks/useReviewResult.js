import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import {
  setWordArray as setQuizWordArray,
  setInSession as setQuizInSession,
} from '../reducers/quizReducer'
import {
  setWordArray as setFlashcardsWordArray,
  setInSession as setFlashcardsInSession,
} from '../reducers/flashcardsReducer'
import { setWords as setJournalWords } from '../reducers/journalReducer'

const useReviewResult = (wordArray, words, page) => {
  const dispatch = useDispatch()
  const prevWordArray = useRef(wordArray)
  const prevWords = useRef(words)
  const prevPage = useRef(page)

  useEffect(() => {
    if (
      prevWordArray.current !== wordArray ||
      prevWords.current !== words ||
      prevPage.current !== page
    ) {
      prevWordArray.current = wordArray
      prevWords.current = words
      prevPage.current = page
      const newWordArray = wordArray.map((word) => {
        const { originalPoints, pointsEarned } = word
        const newPointsEarned = pointsEarned ? pointsEarned : 0
        const newPoints = originalPoints + newPointsEarned
        return {
          ...word,
          newPoints: newPoints < 0 ? 0 : newPoints,
          pointsEarned: newPointsEarned,
        }
      })

      console.log('newWordArray', newWordArray)
      const newJournalWords = words.map((word) => ({
        ...word,
        points:
          newWordArray.find((w) => w.id === word.id)?.newPoints || word.points,
        lastReviewed:
          newWordArray.find((w) => w.id === word.id)?.pointsEarned === 0
            ? word.lastReviewed
            : new Date().toISOString(),
      }))

      console.log('newJournalWords', newJournalWords)
      const updateWordArray =
        page === 'quiz' ? setQuizWordArray : setFlashcardsWordArray
      const updateInSession =
        page === 'quiz' ? setQuizInSession : setFlashcardsInSession
      dispatch(updateWordArray(newWordArray))
      dispatch(updateInSession(false))
      localStorage.setItem('journal', JSON.stringify(newJournalWords))
      dispatch(setJournalWords(newJournalWords))
    }
  }, [dispatch, wordArray, words, page])
}

export default useReviewResult
