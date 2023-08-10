import { useState, useEffect } from 'react'
import TextArea from './TextArea'
import WordFormImages from './WordFormImages'

const WordForm = ({ wordData, setShowForm }) => {
  const [formData, setFormData] = useState({
    word: wordData.word,
    pronunciation: wordData.pronunciation?.all,
    partOfSpeech: wordData.partOfSpeech,
    definition:
      wordData.definition[0].toUpperCase() + wordData.definition.slice(1) ||
      'No definition found',
    synonyms: wordData.synonyms || [],
    antonyms: wordData.antonyms || [],
    examples: wordData.examples || [],
    images: wordData.images || [],
  })

  console.log('formData', formData)

  const handleChange = (e, index) => {
    console.log('in handleChange')
    const { name, value } = e.target
    console.log('name', name)
    console.log('value', value)
    console.log('index', index)
    setFormData((prevFormData) => {
      if (Array.isArray(prevFormData[name])) {
        const newArr = [...prevFormData[name]]
        console.log('newArr', newArr)
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

  const handleSubmit = (e) => {
    e.preventDefault()
    let journalData
    try {
      journalData = JSON.parse(localStorage.getItem('journal')) || []
    } catch {
      journalData = []
    }
    const filteredFormData = Object.keys(formData).reduce((acc, key) => {
      if (Array.isArray(formData[key]) && formData[key].length > 0) {
        acc[key] = formData[key].filter((item) => item !== '')
      } else if (
        !Array.isArray(formData[key]) &&
        formData[key] === '' &&
        key === 'definition'
      ) {
        acc[key] = 'No definition found'
      } else {
        acc[key] = formData[key]
      }
      return acc
    }, {})

    journalData.push(filteredFormData)
    console.log('journalData', journalData)
    localStorage.setItem('journal', JSON.stringify(journalData))
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
