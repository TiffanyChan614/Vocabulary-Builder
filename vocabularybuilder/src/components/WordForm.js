import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import TextArea from './TextArea'
import WordFormImages from './WordFormImages'
import { v4 as uuidv4 } from 'uuid'
import { SearchContext } from '../pages/Search'
import { JournalContext } from '../pages/Journal'

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
    return Object.keys(formData).reduce((acc, key) => {
      if (Array.isArray(formData[key] && formData[key]?.length > 0)) {
        acc[key] = formData[key].filter((item) => item !== '')
      } else if (
        !Array.isArray(
          formData[key] && formData[key === '' && key === 'definition']
        )
      ) {
        acc[key] = 'No definition found'
      }
      return acc
    }, {})
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const filteredFormData = getFilteredFormData()

    let journalData
    try {
      journalData = JSON.parse(localStorage.getItem('journal')) || []
    } catch {
      journalData = []
    }

    if (page === 'search') {
      journalData.push(filteredFormData)
      console.log('journalData', journalData)
      localStorage.setItem('journal', JSON.stringify(journalData))
      navigate('../../journal')
    } else if (page === 'journal' && updateWord) {
      const updatedJournalData = journalData.map((word) => {
        if (word.id === filteredFormData.id) {
          return filteredFormData
        }
        return word
      })
      console.log('updatedJournalData', updatedJournalData)
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
        <div className='word-form--synonyms'>
          <div className='word-form--details-name'>Synonyms:</div>
          <div className='word-form--details-content'>
            {synonyms?.map((synonym, index) => (
              <div key={synonym + index}>
                <TextArea
                  id={`synonym-${index}`}
                  name='synonyms'
                  value={synonym}
                  onBlur={(e) => handleChange(e, index)}
                />
                <button
                  type='button'
                  className='delete'
                  name='synonyms'
                  onClick={(e) => handleDelete(e, index)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
          <button
            name='synonyms'
            type='button'
            onClick={handleAdd}>
            Add
          </button>
        </div>
        <div className='word-form--antonyms'>
          <div className='word-form--details-name'>Antonyms:</div>
          <div className='word-form--details-content'>
            {antonyms?.map((antonym, index) => (
              <div key={antonym + index}>
                <TextArea
                  id={`antonym-${index}`}
                  name='antonyms'
                  value={antonym}
                  onBlur={(e) => handleChange(e, index)}
                />
                <button
                  type='button'
                  className='delete'
                  name='antonyms'
                  onClick={(e) => handleDelete(e, index)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
          <button
            name='antonyms'
            type='button'
            onClick={handleAdd}>
            Add
          </button>
        </div>
        <div className='word-form--examples'>
          <div className='word-form--details-name'>Examples:</div>
          <div className='word-form--details-content'>
            {examples?.map((example, index) => (
              <div key={example + index}>
                <TextArea
                  id={`example-${index}`}
                  name='examples'
                  value={example}
                  onBlur={(e) => handleChange(e, index)}
                />
                <button
                  type='button'
                  className='delete'
                  name='examples'
                  onClick={(e) => handleDelete(e, index)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
          <button
            name='examples'
            type='button'
            onClick={handleAdd}>
            Add
          </button>
        </div>
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
