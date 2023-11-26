const getWordsWithLowestPoints = (words, number) => {
    return words.sort((a, b) => a.points - b.points).slice(0, number * 0.7)
}

const getWordsWithEarliestReview = (words, number) => {
return words
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
    .slice(0, number)
}

const getSelectedWordData = (words, number) => {
    const wordsWithLowestPoints = getWordsWithLowestPoints(words, number)
    console.log('wordsWithLowestPoints', wordsWithLowestPoints)
    const wordsWithEarliestReview = getWordsWithEarliestReview(
        words.filter(((word) => !wordsWithLowestPoints.some((w) => w.id === word.id))),
        number,
    )
    console.log('wordsWithEarliestReview', wordsWithEarliestReview)
    return [...wordsWithLowestPoints, ...wordsWithEarliestReview]
}

module.exports = { getSelectedWordData }
