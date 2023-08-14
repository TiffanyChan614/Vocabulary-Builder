import { AiFillSound, AiOutlinePlus } from 'react-icons/ai'
import { FiMoreHorizontal } from 'react-icons/fi'
import { useContext } from 'react'
import { SearchContext } from '../pages/Search'

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

  const { setShowForm, setFormWord } = useContext(SearchContext)
  return (
    <div className='word--header flex justify-between'>
      <div className='flex gap-5 items-center'>
        <div className='flex gap-1 items-center'>
          <h3 className='text-xl  font-bold text-indigo-800'>{word}</h3>
          <h4 className='text-lg'>{`[${pronunciation}]`}</h4>
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
              setShowForm(true)
              setFormWord(wordData)
            }}>
            <AiOutlinePlus size={20} />
          </button>
        )}
      </div>
    </div>
  )
}

export default WordHeader
