import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Word from '../components/Word'
import SearchField from '../components/SearchField'
import Filter from '../components/Filter'
import WordForm from '../components/WordForm'
import { useSelector, useDispatch } from 'react-redux'
import {
  updateWords,
  updateJournalSearchValue,
  updateSortValue,
  toggleJournalShowDetails,
} from '../reducers/journalReducer'
import {
  updateSearchSearchValue,
  updateSearchCurrentPage,
} from '../reducers/searchReducer'

const Journal = () => {
  const dispatch = useDispatch()
  const {
    words,
    searchValue,
    sortValue,
    partOfSpeechFilter,
    showForm,
    showAllDetails,
  } = useSelector((state) => state.journal)

  // console.log('showAllDetails', showAllDetails)
  // console.log('sortValue', sortValue)

  const sortOptions = {
    updated: (a, b) => b.lastUpdated.localeCompare(a.lastUpdated),
    created: (a, b) => b.created.localeCompare(a.created),
    alphabetical: (a, b) => a.word.localeCompare(b.word),
    length: (a, b) => a.word.length - b.word.length,
    partOfSpeech: (a, b) => a.partOfSpeech.localeCompare(b.partOfSpeech),
    pointsAsc: (a, b) => a.points - b.points,
    pointsDesc: (a, b) => b.points - a.points,
  }

  useEffect(() => {
    try {
      dispatch(updateWords(JSON.parse(localStorage.getItem('journal'))))
    } catch {
      dispatch(updateWords([]))
    }
  }, [])

  const getFilteredAndSortedWords = () => {
    if (!words) {
      return []
    }
    let filteredAndSortedWords = [...words]
    if (searchValue !== '') {
      filteredAndSortedWords = filteredAndSortedWords
        .filter((word) =>
          word.word.toLowerCase().includes(searchValue.toLowerCase())
        )
        .sort(sortOptions[sortValue])
    } else {
      filteredAndSortedWords = filteredAndSortedWords.sort(
        sortOptions[sortValue]
      )
    }

    if (partOfSpeechFilter) {
      if (partOfSpeechFilter === 'other') {
        filteredAndSortedWords = filteredAndSortedWords.filter(
          (word) =>
            word.partOfSpeech !== 'noun' &&
            word.partOfSpeech !== 'verb' &&
            word.partOfSpeech !== 'adjective' &&
            word.partOfSpeech !== 'adverb'
        )
      } else {
        filteredAndSortedWords = filteredAndSortedWords.filter(
          (word) => word.partOfSpeech === partOfSpeechFilter
        )
      }
    }

    return filteredAndSortedWords
  }

  const clearSearchValue = () => {
    dispatch(updateJournalSearchValue(''))
  }

  const handleDetailsClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(toggleJournalShowDetails(!showAllDetails))
  }

  const displayedWords = getFilteredAndSortedWords()

  const NoWordsFoundMessage = () => (
    <div className='flex flex-col pt-5 items-center justify-center'>
      <h3 className='font-bold text-lg mb-2'>No words found</h3>
      <p className='text-md text-gray-600 mb-4 text-center'>
        Seems like there are no matching words. Why not&nbsp;
        <Link
          className='text-indigo-800 hover:underline'
          to='../search'
          onClick={() => {
            dispatch(updateSearchSearchValue(''))
            dispatch(updateSearchCurrentPage('search'))
          }}>
          explore new words
        </Link>
        &nbsp;or try other filters?
      </p>
    </div>
  )

  return (
    <>
      <div className='journal flex flex-col gap-4'>
        <div className='journal--search'>
          <SearchField
            searchValue={searchValue}
            clearSearchValue={clearSearchValue}
            placeholder='Search journal'
            handleInputChange={(e) =>
              dispatch(updateJournalSearchValue(e.target.value))
            }
          />
        </div>
        <div className='journal--control flex flex-col gap-3 md:flex-row md:justify-between'>
          <nav>
            <Filter page='journal' />
          </nav>
          <div className='flex justify-between gap-2'>
            <button
              onClick={handleDetailsClick}
              className='py-1 px-3 border-2 border-indigo-100 rounded-lg text-sm font-semibold hover:bg-indigo-100 hover:text-indigo-800'>
              {showAllDetails ? 'Hide all details' : 'Show all details'}
            </button>
            <select
              className='journal--sort border-indigo-100 border-2 rounded-lg py-1 px-3 text-sm font-semibold'
              onChange={(e) => dispatch(updateSortValue(e.target.value))}
              value={sortValue}>
              <option disabled>Sort by</option>
              <option value='updated'>Recently updated</option>
              <option value='pointsAsc'>Points - Low to High</option>
              <option value='pointsDesc'>Points - High to Low</option>
              <option value='alphabetical'>Alphabetical</option>
              <option value='length'>Length</option>
              <option value='partOfSpeech'>Part of speech</option>
              <option value='created'>Recently created</option>
            </select>
          </div>
        </div>
        <div className='journal--words flex flex-col gap-3'>
          {displayedWords?.length > 0 ? (
            displayedWords.map((word) => (
              <Word
                key={word.id}
                wordData={word}
                page='journal'
              />
            ))
          ) : (
            <NoWordsFoundMessage />
          )}
        </div>
      </div>
      {showForm && <WordForm page='journal' />}
    </>
  )
}

export default Journal
