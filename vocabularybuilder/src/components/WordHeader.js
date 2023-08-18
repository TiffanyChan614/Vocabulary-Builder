import { AiFillSound, AiOutlinePlus, AiOutlineEdit } from 'react-icons/ai'
import { MdOutlineDeleteOutline } from 'react-icons/md'
import { FiMoreHorizontal } from 'react-icons/fi'
import {
  updateJournalShowForm,
  updateJournalFormWord,
  updateWords,
} from '../reducers/journalReducer'
import {
  updateSearchShowForm,
  updateSearchFormWord,
} from '../reducers/searchReducer'
import { useDispatch, useSelector } from 'react-redux'

const WordHeader = ({ wordData, page, speak, setShowDetails }) => {
  const {
    word,
    pronunciation,
    partOfSpeech,
    synonyms,
    antonyms,
    examples,
    images,
  } = wordData

  const dispatch = useDispatch()
  const { words } = useSelector((state) => state.journal)

  const handleDelete = (id) => {
    const newWords = words.filter((word) => word.id !== id)
    dispatch(updateWords(newWords))
    localStorage.setItem('journal', JSON.stringify(newWords))
  }

  const toggleShowForm = (show) => {
    if (page === 'search') {
      dispatch(updateSearchShowForm(show))
    } else if (page === 'journal') {
      dispatch(updateJournalShowForm(show))
    }
  }

  const updateFormWord =
    page === 'search' ? updateSearchFormWord : updateJournalFormWord

  return (
    <div className='word--header flex justify-between'>
      <div className='flex gap-5 items-center'>
        <div className='flex gap-1 items-center'>
          <h2 className='text-xl  font-bold text-indigo-800'>{word}</h2>
          <h3 className='text-lg'>{`[${pronunciation}]`}</h3>
          <button
            className='word--audio'
            onClick={(e) => speak(e, word, 'samantha')}>
            <AiFillSound size={20} />
          </button>
        </div>

        {partOfSpeech && (
          <h4 className='font-semibold text-md'>
            {partOfSpeech[0].toUpperCase() + partOfSpeech.slice(1)}
          </h4>
        )}
      </div>

      <div className='flex items-center gap-3'>
        {(synonyms?.length > 0 ||
          antonyms?.length > 0 ||
          examples?.length > 0 ||
          images?.length > 0) && (
          <button onClick={() => setShowDetails((prevShow) => !prevShow)}>
            <FiMoreHorizontal size={20} />
          </button>
        )}

        {page === 'search' && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              toggleShowForm(true)
              dispatch(updateFormWord(wordData))
            }}>
            <AiOutlinePlus size={20} />
          </button>
        )}

        {page === 'journal' && typeof wordData?.id !== 'undefined' && (
          <button
            type='button'
            onClick={(e) => {
              e.stopPropagation()
              toggleShowForm(true)
              dispatch(updateFormWord(wordData))
            }}>
            <AiOutlineEdit size={20} />
          </button>
        )}

        {page === 'journal' && typeof wordData?.id !== 'undefined' && (
          <button
            type='button'
            onClick={() => handleDelete(wordData.id)}>
            <MdOutlineDeleteOutline size={20} />
          </button>
        )}
      </div>
    </div>
  )
}

export default WordHeader
