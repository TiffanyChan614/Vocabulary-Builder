import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setWordArray as setQuizWordArray,
  setInSession as setQuizInSession,
} from '../reducers/quizReducer'
import {
  setWordArray as setFlashcardsWordArray,
  setInSession as setFlashcardsInSession,
} from '../reducers/flashcardsReducer'
import { setWords as setJournalWords } from '../reducers/journalReducer'

const useReviewResult = (page, wordArray) => {
  const dispatch = useDispatch()
  const { words } = useSelector((state) => state.journal)
  console.log('wordArray', wordArray)

  useEffect(() => {
    const newWordArray = wordArray?.map((word) => {
      const { originalPoints, pointsEarned } = word
      const newPointsEarned = pointsEarned || 0
      const newPoints = originalPoints + newPointsEarned
      return {
        ...word,
        newPoints: newPoints < 0 ? 0 : newPoints,
        pointsEarned: newPointsEarned || 0,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export default useReviewResult
