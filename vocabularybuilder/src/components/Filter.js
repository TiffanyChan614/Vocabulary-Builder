import { Link } from 'react-router-dom'

const Filter = ({ partOfSpeechFilter }) => {
  const filterStyleClassName =
    'text-sm text-gray-700 font-semibold border-2 border-gray-200 hover:bg-indigo-100 hover:border-indigo-100 hover:text-indigo-800 py-1 px-3 rounded-full'

  const filterActiveStyleClassName =
    'text-sm text-indigo-800 font-bold bg-indigo-100 border-2 border-indigo-100 py-1 px-3 rounded-full'

  return (
    <div className='flex gap-3 flex-wrap'>
      <Link to='?partOfSpeech=noun'>
        <div
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
          className={`${filterStyleClassName} ${
            partOfSpeechFilter === '' ? filterActiveStyleClassName : ''
          }`}>
          Clear Filter
        </div>
      </Link>
    </div>
  )
}

export default Filter
