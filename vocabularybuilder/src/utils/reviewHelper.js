import { getRandomWord } from '../services/wordAPI'

const shuffleArray = (array) => {
  let currentIndex = array.length
  let temporaryValue
  let randomIndex
  const arrayCopy = [...array]

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
            image
          },
    back: frontCardType === 'word' ? word.definition : word.word
  }
}

const getSelectedWordData = (words, number) => {
  const wordsWithLowestPoints = getWordsWithLowestPoints(words, number)
  console.log('wordsWithLowestPoints', wordsWithLowestPoints)
  const wordsWithEarliestReview = getWordsWithEarliestReview(
    words,
    number,
    wordsWithLowestPoints
  )
  console.log('wordsWithEarliestReview', wordsWithEarliestReview)
  return [...wordsWithLowestPoints, ...wordsWithEarliestReview]
}

export const getFlashcardsInitWordArray = (words, number, mode) => {
  const selectedWordData = getSelectedWordData(words, number)
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

const getQuizChoices = async (words) => {
  const uniqueWords = {}
  const quizChoices = words
    .filter((word) => {
      if (!uniqueWords[word.word]) {
        uniqueWords[word.word] = true
        return true
      } else {
        return false
      }
    })
    .map((word) => ({ ...word, source: 'journal' }))
  //   console.log('quizChoices', quizChoices)
  while (quizChoices.length < 4) {
    console.log('Get words from API')
    try {
      const word = await getRandomWord()

      if (!word || !word.results || word.results.length === 0) {
        continue
      }

      const randomDefinition =
        word.results[Math.floor(Math.random() * word.results.length)]

      const isDuplicate = quizChoices.some(
        (choice) =>
          choice.word === word.word &&
          choice.definition === randomDefinition.definition
      )

      if (!isDuplicate) {
        quizChoices.push({
          word: word.word,
          definition: randomDefinition.definition,
          source: 'api'
        })
      }
    } catch (error) {
      throw new Error(error)
    }
  }
  return quizChoices
}

const getWordDefinitionQuestions = (quizChoices) => {
  const questions = []
  for (const choice of quizChoices) {
    let questionType
    if (choice.source === 'journal') {
      questionType =
        Math.random() < 0.5 ? 'mc-wordToDefinition' : 'mc-definitionToWord'
    } else {
      questionType = null
    }
    if (questionType) {
      const isWordToDefinition = questionType === 'mc-wordToDefinition'
      const correctAnswer =
        questionType === 'mc-wordToDefinition' ? choice.definition : choice.word

      const incorrectAnswers = shuffleArray(
        quizChoices
          .map((choice) => {
            const isDifferentWord = choice.word !== correctAnswer
            const isDifferentDefinition = choice.definition !== correctAnswer
            if (isWordToDefinition) {
              return isDifferentDefinition ? choice.definition : null
            } else {
              return isDifferentWord ? choice.word : null
            }
          })
          .filter((answer) => answer !== null)
      ).slice(0, 3)

      const choices = shuffleArray([correctAnswer, ...incorrectAnswers])

      questions.push({
        id: choice.id,
        questionType,
        question: isWordToDefinition ? choice.word : choice.definition,
        correctAnswer,
        choices
      })
    }
  }
  return questions
}

const getSynonymAntonymQuestions = (quizChoices) => {
  const questions = []
  for (const choice of quizChoices) {
    let questionType
    if (
      choice.source === 'journal' &&
      choice.synonyms?.length > 0 &&
      choice.antonyms?.length > 0
    ) {
      questionType = Math.random() < 0.5 ? 'mc-synonyms' : 'mc-antonyms'
    } else if (choice.source === 'journal' && choice.synonyms?.length > 0) {
      questionType = 'mc-synonyms'
    } else if (choice.source === 'journal' && choice.antonyms?.length > 0) {
      questionType = 'mc-antonyms'
    } else {
      questionType = null
    }
    if (questionType) {
      const correctAnswer = choice.word

      const incorrectAnswers = shuffleArray(
        quizChoices
          .filter((choice) => choice.word !== correctAnswer)
          .map((choice) => choice.word)
          .slice(0, 3)
      )
      const choices = shuffleArray([correctAnswer, ...incorrectAnswers])
      const question = choice[questionType.split('-')[1]].join(', ')

      questions.push({
        id: choice.id,
        questionType,
        question,
        correctAnswer: choice.word,
        choices
      })
    }
  }
  //   console.log('synonym-antonym questions', questions)
  return questions
}

const getBlankQuestions = (quizChoices) => {
  const questions = []
  for (const choice of quizChoices) {
    let questionType
    if (choice.source === 'journal' && choice.images?.length > 0) {
      questionType = 'blank-' + (Math.random() < 0.5 ? 'definition' : 'images')
    } else if (choice.source === 'journal') {
      questionType = 'blank-definition'
    } else {
      questionType = null
    }
    if (questionType) {
      let question
      if (questionType === 'blank-images') {
        question =
          choice.images[Math.floor(Math.random() * choice.images?.length)]
      } else {
        question = choice.definition
      }
      questions.push({
        id: choice.id,
        questionType,
        question,
        correctAnswer: choice.word
      })
    }
  }
  return questions
}

export const getQuizInitWordArray = (words, number) => {
  const selectedWordData = getSelectedWordData(words, number)
  return selectedWordData.map((word) => ({
    ...word,
    pointsEarned: null,
    originalPoints: word.points,
    newPoints: word.points
  }))
}

export const getQuizInitQuestionArray = async (selectedWordData, mode) => {
  const quizChoices = await getQuizChoices(selectedWordData)
  console.log('quiz choice in getQuizInitWordArray', quizChoices)

  let wordDefinitionQuestions = []
  let synonymAntonymQuestions = []
  let blanksQuestions = []

  if (mode.name === 'MC') {
    wordDefinitionQuestions = shuffleArray(
      getWordDefinitionQuestions(quizChoices)
    )
    console.log(
      'word-definition questions in getQuizInitWordArray',
      wordDefinitionQuestions
    )

    synonymAntonymQuestions = shuffleArray(
      getSynonymAntonymQuestions(quizChoices)
    )
    console.log(
      'synonym-antonym questions in getQuizInitWordArray',
      synonymAntonymQuestions
    )
  } else if (mode.name === 'blank') {
    blanksQuestions = shuffleArray(getBlankQuestions(quizChoices))
    console.log('blanks questions in getQuizInitWordArray', blanksQuestions)
  } else if (mode.name === 'mixed') {
    wordDefinitionQuestions = shuffleArray(
      getWordDefinitionQuestions(quizChoices)
    )
    console.log(
      'word-definition questions in getQuizInitWordArray',
      wordDefinitionQuestions
    )

    synonymAntonymQuestions = shuffleArray(
      getSynonymAntonymQuestions(quizChoices)
    )
    console.log(
      'synonym-antonym questions in getQuizInitWordArray',
      synonymAntonymQuestions
    )

    blanksQuestions = shuffleArray(getBlankQuestions(quizChoices))
    console.log('blanks questions in getQuizInitWordArray', blanksQuestions)
  }

  const result = [
    ...wordDefinitionQuestions,
    ...synonymAntonymQuestions,
    ...blanksQuestions
  ]

  return result
}

export const checkBlanksCorrect = (blanksAns, correctAnswer) => {
  return blanksAns.join('') === correctAnswer
}

export const hasBlank = (blanksAns) => {
  return blanksAns.some((blank) => blank === '')
}
