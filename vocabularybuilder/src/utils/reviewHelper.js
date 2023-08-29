const shuffleArray = (array) => {
  let currentIndex = array.length
  let temporaryValue
  let randomIndex
  let arrayCopy = [...array]

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    temporaryValue = arrayCopy[currentIndex]
    arrayCopy[currentIndex] = arrayCopy[randomIndex]
    arrayCopy[randomIndex] = temporaryValue
  }

  return arrayCopy
}

const getWordsWithLowestPoints = (words, number) => {
  return words.sort((a, b) => a.points - b.points).slice(0, number * 0.7)
}

const getWordsWithEarliestReview = (words, number, wordsWithLowestPoints) => {
  return words
    .filter((word) => !wordsWithLowestPoints.some((w) => w.id === word.id))
    .sort((a, b) => {
      if (a.lastReviewed === null && b.lastReviewed === null) {
        return 0
      } else if (a.lastReviewed === null) {
        return -1
      } else if (b.lastReviewed === null) {
        return 1
      } else {
        return a.lastReviewed - b.lastReviewed
      }
    })
    .slice(0, number - wordsWithLowestPoints.length)
}

const generateFrontCardType = (mode) => {
  if (mode.name === 'wordToMeaning') {
    return 'word'
  } else if (mode.name === 'meaningToWord') {
    return 'definitionWithImages'
  } else if (mode.name === 'mixed') {
    return Math.random() < 0.5 ? 'word' : 'definitionWithImages'
  }
}

const createCardData = (word, mode, image) => {
  const frontCardType = generateFrontCardType(mode)

  return {
    word: word.word,
    id: word.id,
    originalPoints: word.points,
    pointsEarned: null,
    newPoints: word.points,
    front:
      frontCardType === 'word'
        ? { type: 'word', word: word.word }
        : {
            type: 'definitionWithImages',
            definition: word.definition,
            image: image,
          },
    back: frontCardType === 'word' ? word.definition : word.word,
  }
}

export const getInitWordArray = (words, number, mode) => {
  const wordsWithLowestPoints = getWordsWithLowestPoints(words, number)
  console.log('wordsWithLowestPoints', wordsWithLowestPoints)
  const wordsWithEarliestReview = getWordsWithEarliestReview(
    words,
    number,
    wordsWithLowestPoints
  )
  console.log('wordsWithEarliestReview', wordsWithEarliestReview)
  const selectedWordData = [
    ...wordsWithLowestPoints,
    ...wordsWithEarliestReview,
  ]
  const wordArray =
    selectedWordData?.map((word) => {
      const images = word.images || []
      const image =
        images.length > 0
          ? images[Math.floor(Math.random() * images.length)]
          : null
      console.log('image', image)
      return createCardData(word, mode, image)
    }) || []

  return shuffleArray(wordArray)
}
