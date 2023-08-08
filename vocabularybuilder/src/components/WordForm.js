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

  console.log('formData', formData.word)

  function handleChange(e) {
    const { name, value } = e.target
    console.log('name', name)
    console.log('value', value)
    setFormData((prevFormData) => {
      if (Array.isArray(prevFormData[name])) {
        const index = parseInt(e.target.dataset.index)
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

  function handleDelete(e) {
    e.stopPropagation()
    const name = e.target.name
    const index = parseInt(e.target.dataset.index)
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

  function handleAdd(e) {
    e.stopPropagation()
    const name = e.target.name
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: [...prevFormData[name], ''],
      }
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    let journalData
    try {
      journalData = JSON.parse(localStorage.getItem('journal')) || []
    } catch {
      journalData = []
    }
    journalData.push(formData)
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
        <div>Definition:</div>
        <textarea
          className='word-form--definition'
          name='definition'
          value={definition}
          onChange={handleChange}
        />
        {synonyms?.length > 0 && (
          <div className='word-form--synonyms'>
            <div className='word-form--details-name'>Synonyms:</div>
            <div className='word-form--details-content'>
              {synonyms?.map((synonym, i) => (
                <div key={synonym + i}>
                  <TextArea
                    name='synonyms'
                    data-index={i}
                    value={synonym}
                    onChange={handleChange}
                  />
                  <button
                    type='button'
                    className='delete'
                    name='synonyms'
                    data-index={i}
                    onClick={handleDelete}>
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
        )}
        {antonyms?.length > 0 && (
          <div className='word-form--antonyms'>
            <div className='word-form--details-name'>Antonyms:</div>
            <div className='word-form--details-content'>
              {antonyms?.map((antonym, i) => (
                <div key={antonym + i}>
                  <TextArea
                    name='antonyms'
                    data-index={i}
                    value={antonym}
                    onChange={handleChange}
                  />
                  <button
                    type='button'
                    className='delete'
                    name='antonyms'
                    data-index={i}
                    onClick={handleDelete}>
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
        )}
        {examples?.length > 0 && (
          <div className='word-form--examples'>
            <div className='word-form--details-name'>Examples:</div>
            <div className='word-form--details-content'>
              {examples?.map((example, i) => (
                <div key={example + i}>
                  <TextArea
                    name='examples'
                    data-index={i}
                    value={example}
                    onChange={handleChange}
                  />
                  <button
                    type='button'
                    className='delete'
                    name='examples'
                    data-index={i}
                    onChange={handleDelete}>
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
        )}
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
