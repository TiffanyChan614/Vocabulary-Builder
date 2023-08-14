import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import TextArea from './TextArea'
import WordFormImages from './WordFormImages'
import { v4 as uuidv4 } from 'uuid'
import { SearchContext } from '../pages/Search'
import { JournalContext } from '../pages/Journal'
import WordFormField from './WordFormField'

//TODO: not updaing, no display changes shown -> not render update problem

const WordForm = ({ formWord, page, updateWord = null }) => {
  const context = page === 'search' ? SearchContext : JournalContext
  const { setShowForm } = useContext(context)

  console.log('formWord', formWord)

  const [formData, setFormData] = useState({
    id: formWord.id || uuidv4(),
    word: formWord.word,
    pronunciation: formWord.pronunciation || '',
    partOfSpeech: formWord.partOfSpeech,
    definition:
      formWord.definition[0].toUpperCase() + formWord.definition.slice(1) ||
      'No definition found',
    synonyms: formWord.synonyms || [],
    antonyms: formWord.antonyms || [],
    examples: formWord.examples || [],
    images: formWord.images || [],
    lastUpdated: new Date(),
    created: page === 'search' ? new Date() : formWord.created,
  })

  console.log('formData', formData)

  const navigate = useNavigate()

  const handleChange = (e, index) => {
    const { name, value } = e.target
    setFormData((prevFormData) => {
      if (Array.isArray(prevFormData[name])) {
        const newArr = [...prevFormData[name]]
        newArr[index] = value
        return {
          ...prevFormData,
          [name]: newArr,
        }
      } else {
        return {
          ...prevFormData,
          [name]: value,
        }
      }
    })
  }

  const handleDelete = (e, index) => {
    e.stopPropagation()
    const name = e.target.name
    console.log('name', name, 'index', index)
    setFormData((prevFormData) => {
      const newArr = [...prevFormData[name]]
      newArr.splice(index, 1)
      return {
        ...prevFormData,
        [name]: newArr,
      }
    })
  }

  const handleAdd = (e) => {
    e.stopPropagation()
    const name = e.target.name
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: [...prevFormData[name], ''],
      }
    })
  }

  const getFilteredFormData = () => {
    console.log('formData', formData)

    return Object.keys(formData).reduce((acc, key) => {
      if (Array.isArray(formData[key]) && formData[key].length > 0) {
        acc[key] = formData[key].filter((item) => item !== '')
      } else if (
        !Array.isArray(formData[key]) &&
        formData[key] !== '' &&
        key !== 'definition'
      ) {
        acc[key] = formData[key]
      } else if (key === 'definition' && formData[key] !== '') {
        acc[key] = formData[key]
      } else if (Array.isArray(formData[key])) {
        acc[key] = []
      } else {
        acc[key] = 'No definition found'
      }
      return acc
    }, {})
  }

  const getJournalData = () => {
    let journalData
    try {
      journalData = JSON.parse(localStorage.getItem('journal')) || []
    } catch {
      journalData = []
    }
    return journalData
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const filteredFormData = getFilteredFormData()
    console.log('filteredFormData', filteredFormData)

    const journalData = getJournalData()
    console.log('journalData', journalData)

    if (page === 'search') {
      journalData.push(filteredFormData)
      localStorage.setItem('journal', JSON.stringify(journalData))
      navigate('../../journal')
    } else if (page === 'journal' && updateWord) {
      const updatedJournalData = journalData.map((word) => {
        if (word.id === filteredFormData.id) {
          return filteredFormData
        }
        return word
      })
      localStorage.setItem('journal', JSON.stringify(updatedJournalData))
      updateWord(updatedJournalData)
    }

    setShowForm(false)
  }

  const {
    word,
    pronunciation,
    partOfSpeech,
    definition,
    synonyms,
    antonyms,
    examples,
  } = formData

  const fieldList = [
    {
      name: 'synonyms',
      data: synonyms,
    },
    {
      name: 'antonyms',
      data: antonyms,
    },
    {
      name: 'examples',
      data: examples,
    },
  ]

  return (
    <div className='word-form-wrapper'>
      <form
        className='word-form'
        onSubmit={handleSubmit}>
        <h1>{word}</h1>
        {pronunciation && <h4>{`[${pronunciation}]`}</h4>}
        <h4>{partOfSpeech}</h4>
        <label htmlFor='definition'>Definition:</label>
        <TextArea
          id='definition'
          name='definition'
          value={definition}
          onBlur={(e) => handleChange(e)}
        />
        {fieldList.map((field) => (
          <WordFormField
            key={field.name}
            fieldName={field.name}
            fieldData={field.data}
            handleChange={handleChange}
            handleDelete={handleDelete}
            handleAdd={handleAdd}
          />
        ))}
        <WordFormImages
          formData={formData}
          setFormData={setFormData}
          handleDelete={handleDelete}
        />
        <button
          type='button'
          onClick={() => setShowForm(false)}>
          Cancel
        </button>
        <button type='submit'>Add</button>
      </form>
    </div>
  )
}

export default WordForm
