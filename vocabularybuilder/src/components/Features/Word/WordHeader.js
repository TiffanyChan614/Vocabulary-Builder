import { AiFillSound, AiOutlinePlus, AiOutlineEdit } from 'react-icons/ai'
import { MdOutlineDeleteOutline } from 'react-icons/md'
import { FiMoreHorizontal } from 'react-icons/fi'
import {
  updateJournalShowForm,
  updateJournalFormWord,
  updateWords,
  updateJournalShowDetails,
} from '../../../reducers/journalReducer'
import {
  updateSearchShowForm,
  updateSearchFormWord,
} from '../../../reducers/searchReducer'
import { updateMeaningsShowDetails } from '../../../reducers/wordMeaningsReducer'
import { useDispatch, useSelector } from 'react-redux'

const WordHeader = ({ wordData, page, speak, currentShowDetails }) => {
  const {
    word,
    pronunciation,
    partOfSpeech,
    synonyms,
    antonyms,
    examples,
    images,
    points,
  } = wordData

  const dispatch = useDispatch()
  const { words } = useSelector((state) => state.journal)
  const updateShowDetails =
    page === 'journal' ? updateJournalShowDetails : updateMeaningsShowDetails
  const updateFormWord =
    page === 'search' ? updateSearchFormWord : updateJournalFormWord

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

  const handleClick = (e) => {
    e.stopPropagation()
    toggleShowForm(true)
    dispatch(updateFormWord(wordData))
  }

  return (
    <div className='word--header flex justify-between gap-2'>
      <div className='flex gap-2 flex-row flex-wrap items-center'>
        <div className='flex flex-row gap-1 items-center'>
          <h2 className='text-lg md:text-xl font-bold text-indigo-800'>
            {word}
          </h2>
          {pronunciation && (
            <div className='flex gap-2'>
              <h3 className='text-md md:text-lg'>{`[${pronunciation}]`}</h3>
              <button
                className='word--audio'
                onClick={(e) => speak(e, word, 'samantha', 0.8)}
                aria-label='speak'>
                <AiFillSound size={20} />
              </button>
            </div>
          )}
        </div>
        {partOfSpeech && (
          <h4 className='font-semibold text-sm md:text-md md:ml-5'>
            {partOfSpeech[0].toUpperCase() + partOfSpeech.slice(1)}
          </h4>
        )}
        {points !== null && (
          <div className='text-blue-500 md:ml-5'>
            {points + (points === 1 ? ' point' : ' points')}
          </div>
        )}
      </div>

      <div className='flex gap-3 items-start'>
        {(synonyms?.length > 0 ||
          antonyms?.length > 0 ||
          examples?.length > 0 ||
          images?.length > 0) && (
          <button
            onClick={() =>
              dispatch(updateShowDetails(wordData?.id, !currentShowDetails))
            }>
            <FiMoreHorizontal size={20} />
          </button>
        )}

        {page === 'search' && (
          <button
            onClick={handleClick}
            aria-label='Add to journal'>
            <AiOutlinePlus size={20} />
          </button>
        )}

        {page === 'journal' && typeof wordData?.id !== 'undefined' && (
          <button
            type='button'
            onClick={handleClick}
            aria-label='Edit'>
            <AiOutlineEdit size={20} />
          </button>
        )}

        {page === 'journal' && typeof wordData?.id !== 'undefined' && (
          <button
            type='button'
            onClick={() => handleDelete(wordData.id)}
            aria-label='delete'>
            <MdOutlineDeleteOutline size={20} />
          </button>
        )}
      </div>
    </div>
  )
}

export default WordHeader
