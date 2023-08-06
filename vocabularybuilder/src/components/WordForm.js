import { useState, useEffect } from 'react'
import TextArea from './TextArea'

const WordForm = ({ wordData }) => {
  const [formData, setFormData] = useState({
    word: wordData.word,
    pronunciation: wordData.pronunciation?.all,
    partOfSpeech: wordData.result?.partOfSpeech,
    definition:
      wordData.result?.definition[0].toUpperCase() +
        wordData.result?.definition.slice(1) || 'No definition found',
    synonyms: wordData.result?.synonyms || [],
    antonyms: wordData.result?.antonyms || [],
    examples: wordData.result?.examples || [],
  })

  console.log('formData', formData)

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
    console.log('clicked')
    e.stopPropagation()
    const name = e.target.name
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: [...prevFormData[name], ''],
      }
    })
  }

  return (
    <div className='word-form-wrapper'>
      <form className='word-form'>
        <h1>{wordData.word}</h1>
        {wordData.pronunciation && <h4>{`[${wordData.pronunciation}]`}</h4>}
        <h4>{wordData.result?.partOfSpeech}</h4>
        <textarea
          className='word-form--definition'
          name='definition'
          value={formData.definition}
          onChange={handleChange}
        />
        {wordData.result?.synonyms?.length > 0 && (
          <div className='word-form--synonyms'>
            <div className='word-form--details-name'>Synonyms:</div>
            <div className='word-form--details-content'>
              {formData.synonyms?.map((synonym, i) => (
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
        {wordData.result?.antonyms?.length > 0 && (
          <div className='word-form--antonyms'>
            <div className='word-form--details-name'>Antonyms:</div>
            <div className='word-form--details-content'>
              {formData.antonyms?.map((antonym, i) => (
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
        {formData.examples?.length > 0 && (
          <div className='word-form--examples'>
            <div className='word-form--details-name'>Examples:</div>
            <div className='word-form--details-content'>
              {wordData.result?.examples?.map((example, i) => (
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
        <button type='button'>Cancel</button>
        <button>Add</button>
      </form>
    </div>
  )
}

export default WordForm
