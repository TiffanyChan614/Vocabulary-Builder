import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useReviewResult = (wordArray, setWordArray, setInSession, setJournalWords, isResultSubmitted) => {
  const dispatch = useDispatch()
  const { words } = useSelector((state) => state.journal)
  console.log('wordArray', wordArray)

  useEffect(() => {
    if (isResultSubmitted) {
      return
    }
    const newWordArray = wordArray?.map((word) => {
      const { originalPoints, pointsEarned } = word
      const newPointsEarned = pointsEarned || 0
      const newPoints = originalPoints + newPointsEarned
      return {
        ...word,
        newPoints: newPoints < 0 ? 0 : newPoints,
        pointsEarned: newPointsEarned || 0
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
          : new Date().toISOString()
    }))

    console.log('newJournalWords', newJournalWords)
    dispatch(setWordArray(newWordArray))
    dispatch(setInSession(false))
    localStorage.setItem('isResultSubmitted', true)
    localStorage.setItem('journal', JSON.stringify(newJournalWords))
    dispatch(setJournalWords(newJournalWords))
  }, [])
}

export default useReviewResult
