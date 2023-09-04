import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  updateQuizWordArray,
  updateQuizInSession,
} from '../reducers/quizReducer'
import {
  updateFlashcardsWordArray,
  updateFlashcardsInSession,
} from '../reducers/flashcardsReducer'
import { updateWords } from '../reducers/journalReducer'

const useReviewResult = (wordArray, words, page) => {
  const dispatch = useDispatch()

  useEffect(() => {
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
    const newJournalWords = words.map((word) => ({
      ...word,
      points:
        word.points + newWordArray.find((w) => w.id === word.id)?.newPoints ||
        word.points,
      lastReviewed:
        newWordArray.find((w) => w.id === word.id)?.pointsEarned === 0
          ? word.lastReviewed
          : new Date().toISOString(),
    }))
    const updateWordArray =
      page === 'quiz' ? updateQuizWordArray : updateFlashcardsWordArray
    const updateInSession =
      page === 'quiz' ? updateQuizInSession : updateFlashcardsInSession
    dispatch(updateWordArray(newWordArray))
    dispatch(updateInSession(false))
    localStorage.setItem('journal', JSON.stringify(newJournalWords))
    dispatch(updateWords(newJournalWords))
  }, [])
}

export default useReviewResult
