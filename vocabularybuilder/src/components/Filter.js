import { Link } from 'react-router-dom'
import { updateJournalPartOfSpeechFilter } from '../reducers/journalReducer'
import { updateMeaningsPartOfSpeechFilter } from '../reducers/wordMeaningsReducer'
import { useSelector, useDispatch } from 'react-redux'

const Filter = ({ page }) => {
  const filterStyleClassName =
    'text-sm text-gray-700 font-semibold border-2 border-gray-200 hover:bg-gray-200 hover:border-gray-200 hover:text-gray-800 py-1 px-3 rounded-full'

  const filterActiveStyleClassName =
    'text-sm text-indigo-800 font-bold bg-indigo-100 border-2 border-indigo-100 py-1 px-3 rounded-full'

  const dispatch = useDispatch()

  const partOfSpeechFilter = useSelector((state) => {
    if (page === 'journal') {
      return state.journal.partOfSpeechFilter
    } else if (page === 'search') {
      return state.wordMeanings.partOfSpeechFilter
    }
  })

  const handleFilterClick = (filterValue) => {
    if (page === 'journal') {
      dispatch(updateJournalPartOfSpeechFilter(filterValue))
    } else if (page === 'search') {
      dispatch(updateMeaningsPartOfSpeechFilter(filterValue))
    }
  }

  return (
    <div className='flex gap-3 flex-wrap'>
      <Link to='?partOfSpeech=noun'>
        <div
          onClick={() => handleFilterClick('noun')}
          className={
            partOfSpeechFilter === 'noun'
              ? filterActiveStyleClassName
              : filterStyleClassName
          }>
          Nouns
        </div>
      </Link>
      <Link to='?partOfSpeech=verb'>
        <div
          onClick={() => handleFilterClick('verb')}
          className={
            partOfSpeechFilter === 'verb'
              ? filterActiveStyleClassName
              : filterStyleClassName
          }>
          Verbs
        </div>
      </Link>
      <Link to='?partOfSpeech=adjective'>
        <div
          onClick={() => handleFilterClick('adjective')}
          className={
            partOfSpeechFilter === 'adjective'
              ? filterActiveStyleClassName
              : filterStyleClassName
          }>
          Adjectives
        </div>
      </Link>
      <Link to='?partOfSpeech=adverb'>
        <div
          onClick={() => handleFilterClick('adverb')}
          className={
            partOfSpeechFilter === 'adverb'
              ? filterActiveStyleClassName
              : filterStyleClassName
          }>
          Adverbs
        </div>
      </Link>
      <Link to='?partOfSpeech=other'>
        <div
          onClick={() => handleFilterClick('other')}
          className={
            partOfSpeechFilter === 'other'
              ? filterActiveStyleClassName
              : filterStyleClassName
          }>
          Other
        </div>
      </Link>
      <Link to='.'>
        <div
          onClick={() => handleFilterClick('')}
          className='text-sm text-gray-700 font-semibold border-2 border-white hover:text-indigo-800 hover:underline py-1 px-3'>
          Clear Filter
        </div>
      </Link>
    </div>
  )
}

export default Filter
