import { getRandomWord } from '../services/wordAPI'

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
    let word
    do {
      word = await getRandomWord()
    } while (!word || !word.results || word.results.length === 0)

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
        source: 'api',
      })
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
        Math.random() < 0.5 ? 'wordToDefinition' : 'definitionToWord'
    } else {
      questionType = null
    }
    if (questionType) {
      questions.push({
        questionType,
        question:
          questionType === 'wordToDefinition' ? choice.word : choice.definition,
        correctAnswer:
          questionType === 'wordToDefinition' ? choice.definition : choice.word,
        choices: shuffleArray(
          quizChoices.map((choice) =>
            questionType === 'wordToDefinition'
              ? choice.definition
              : choice.word
          )
        ),
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
      questionType = Math.random() < 0.5 ? 'synonyms' : 'antonyms'
    } else if (choice.source === 'journal' && choice.synonyms?.length > 0) {
      questionType = 'synonyms'
    } else if (choice.source === 'journal' && choice.antonyms?.length > 0) {
      questionType = 'antonyms'
    } else {
      questionType = null
    }
    if (questionType) {
      questions.push({
        questionType,
        question: choice[questionType],
        correctAnswer: choice.word,
        choices: shuffleArray(quizChoices.map((choice) => choice.word)),
      })
    }
  }
  //   console.log('synonym-antonym questions', questions)
  return questions
}

const getBlanksQuestions = (quizChoices) => {
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
        questionType,
        question,
        correctAnswer: choice.word,
      })
    }
  }
  return questions
}

export const getQuizInitQuestionArray = async (words, number) => {
  const selectedWordData = getSelectedWordData(words, number)
  console.log('selected word data in getQuizInitWordArray', selectedWordData)
  const quizChoices = await getQuizChoices(selectedWordData)
  console.log('quiz choice in getQuizInitWordArray', quizChoices)
  const wordDefinitionQuestions = getWordDefinitionQuestions(quizChoices)
  console.log(
    'word-definition questions in getQuizInitWordArray',
    wordDefinitionQuestions
  )
  const synonymAntonymQuestions = getSynonymAntonymQuestions(quizChoices)
  console.log(
    'synonym-antonym questions in getQuizInitWordArray',
    synonymAntonymQuestions
  )
  const blanksQuestions = getBlanksQuestions(quizChoices)
  console.log('blanks questions in getQuizInitWordArray', blanksQuestions)
  return [
    ...wordDefinitionQuestions,
    ...synonymAntonymQuestions,
    ...blanksQuestions,
  ]
}
