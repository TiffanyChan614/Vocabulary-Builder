import { AiFillSound, AiOutlinePlus, AiOutlineEdit } from 'react-icons/ai'
import { MdOutlineDeleteOutline } from 'react-icons/md'
import { FiMoreHorizontal } from 'react-icons/fi'
import {
  updateJournalShowForm,
  updateJournalFormWord,
  updateWords,
  updateJournalShowDetails,
} from '../reducers/journalReducer'
import {
  updateSearchShowForm,
  updateSearchFormWord,
} from '../reducers/searchReducer'
import { updateMeaningsShowDetails } from '../reducers/wordMeaningsReducer'
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

  console.log('points', points)

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
    <div className='word--header flex justify-between'>
      <div className='flex gap-1 flex-col sm:flex-row'>
        <div>
          <h2 className='text-lg md:text-xl font-bold text-indigo-800'>
            {word}
          </h2>
        </div>

        <div className='flex flex-col sm:flex-row gap-2 sm:items-center sm:gap-5'>
          {pronunciation && (
            <div className='flex gap-2'>
              <h3 className='text-md md:text-lg'>{`[${pronunciation}]`}</h3>
              <button
                className='word--audio'
                onClick={(e) => speak(e, word, 'samantha')}>
                <AiFillSound size={20} />
              </button>
            </div>
          )}
          {partOfSpeech && (
            <h4 className='font-semibold text-md sm:ml-3'>
              {partOfSpeech[0].toUpperCase() + partOfSpeech.slice(1)}
            </h4>
          )}
          {points !== null && (
            <div className='text-blue-400'>{points + ' points'}</div>
          )}
        </div>
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
          <button onClick={handleClick}>
            <AiOutlinePlus size={20} />
          </button>
        )}

        {page === 'journal' && typeof wordData?.id !== 'undefined' && (
          <button
            type='button'
            onClick={handleClick}>
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
