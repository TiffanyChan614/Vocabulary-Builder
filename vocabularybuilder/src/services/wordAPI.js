import axios from 'axios'

const getWordData = async (word) => {
  const options = {
    method: 'GET',
    url: `https://wordsapiv1.p.rapidapi.com/words/${word}`,
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_WORD_API_KEY,
      'X-RapidAPI-Host': process.env.REACT_APP_WORD_API_HOST,
    },
  }

  try {
    const response = await axios.request(options)
    return response.data
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.error('word not found')
      return null
    } else {
      console.error(error)
    }
  }
}

const getMatchedWords = async (word) => {
  const options = {
    method: 'GET',
    url: 'https://wordsapiv1.p.rapidapi.com/words/',
    params: {
      letterPattern: `^${word}\\w*$`,
      limit: 10,
    },
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_WORD_API_KEY,
      'X-RapidAPI-Host': process.env.REACT_APP_WORD_API_HOST,
    },
  }

  try {
    const response = await axios.request(options)
    return response.data
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.error('word not found')
      return null
    } else {
      console.log(error)
    }
  }
}

export { getWordData, getMatchedWords }
