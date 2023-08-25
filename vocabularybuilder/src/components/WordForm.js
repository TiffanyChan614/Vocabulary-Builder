import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import TextArea from './TextArea'
import WordFormImages from './WordFormImages'
import { v4 as uuidv4 } from 'uuid'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateJournalPartOfSpeechFilter,
  updateJournalShowForm,
  updateWords,
  updateSortValue,
} from '../reducers/journalReducer'
import { updateSearchShowForm } from '../reducers/searchReducer'
import WordFormField from './WordFormField'
import Overlay from './Overlay'

const WordForm = ({ page }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [message, setMessage] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      if (message !== '') {
        setMessage('')
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [message])

  const formWord = useSelector((state) => {
    if (page === 'search') {
      return state.search.formWord
    } else if (page === 'journal') {
      return state.journal.formWord
    }
  })

  const now = new Date().toISOString()

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
    lastUpdated: now,
    created: page === 'search' ? now : formWord.created,
    points: formWord.points || 0,
  })

  console.log('formWord in WordForm', formWord)

  const toggleShowForm = (show) => {
    if (page === 'search') {
      dispatch(updateSearchShowForm(show))
    } else if (page === 'journal') {
      dispatch(updateJournalShowForm(show))
    }
  }

  console.log('formData', formData)

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
    console.log('e.target', e.target)
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
    console.log('e.target', e.target)
    e.stopPropagation()
    const name = e.target.name
    console.log('handleAdd name', name)
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
      journalData.push({ ...filteredFormData })
      localStorage.setItem('journal', JSON.stringify(journalData))
      navigate('../../journal')
      dispatch(updateJournalPartOfSpeechFilter(''))
      dispatch(updateSortValue('updated'))
    } else if (page === 'journal' && updateWords) {
      const updatedJournalData = journalData.map((word) => {
        if (word.id === filteredFormData.id) {
          return filteredFormData
        }
        return word
      })
      localStorage.setItem('journal', JSON.stringify(updatedJournalData))
      console.log('updatedJournalData', updatedJournalData)
      dispatch(updateWords(updatedJournalData))
    }

    toggleShowForm(false)
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
    <>
      <Overlay>
        <div className='word-form bg-white w-full sm:w-2/3 rounded-xl overflow-hidden'>
          <form onSubmit={handleSubmit}>
            <header className='word-form--header pt-6 pb-4 px-6 border-b-2 flex flex-col sm:flex-row items-center sm:justify-between gap-2'>
              <div className='flex items-center gap-'>
                <h2 className='text-xl font-bold text-indigo-800'>{word}</h2>
                {pronunciation && (
                  <h3 className='text-lg'>{`[${pronunciation}]`}</h3>
                )}
                {partOfSpeech && (
                  <h4 className='text-md font-semibold ml-6'>
                    {partOfSpeech[0].toUpperCase() + partOfSpeech.slice(1)}
                  </h4>
                )}
              </div>
              <div>
                {message && (
                  <p className='text-md font-semibold text-emerald-700'>
                    {message}
                  </p>
                )}
              </div>
            </header>
            <div className='py-4 px-3 md:px-6 flex flex-col gap-3 overflow-y-auto max-h-[60vh]'>
              <div className='word-form--definition flex flex-col gap-2'>
                <label
                  htmlFor='definition'
                  className='font-bold'>
                  Definition
                </label>
                <TextArea
                  className='border-2'
                  id='definition'
                  name='definition'
                  value={definition}
                  onBlur={(e) => handleChange(e)}
                  height='h-15'
                />
              </div>

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
                setMessage={setMessage}
              />
            </div>
            <div className='p-6 border-t flex justify-between'>
              <button
                className='hover:bg-gray-100 rounded px-2 py-1'
                type='button'
                onClick={() => toggleShowForm(false)}>
                Cancel
              </button>
              <button
                className='hover:bg-indigo-100 rounded px-2 py-1 font-semibold'
                type='submit'>
                Confirm
              </button>
            </div>
          </form>
        </div>
      </Overlay>
    </>
  )
}

export default WordForm
