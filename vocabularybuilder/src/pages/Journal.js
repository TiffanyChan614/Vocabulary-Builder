import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Word from '../components/Features/Word/Word'
import SearchField from '../components/Common/SearchField'
import Filter from '../components/Common/Filter'
import WordForm from '../components/Features/WordForm/WordForm'
import { useSelector, useDispatch } from 'react-redux'
import {
  setWords as setJournalWords,
  setSearchValue as setJournalSearchValue,
  setSortValue as setJournalSortValue,
  setShowAllDetails as setJournalShowAllDetails,
  setGoToTopButton as toggleJournalShowGoToTopButton,
  setFilterOpen as setJournalFilterOpen,
} from '../reducers/journalReducer'
import {
  setSearchValue as setSearchSearchValue,
  setCurrentPage as setsSearchCurrentPage,
} from '../reducers/searchReducer'
import { IoIosArrowUp } from 'react-icons/io'
import useIsMobile from '../hooks/useIsMobile'

const Journal = () => {
  const dispatch = useDispatch()
  const {
    words,
    searchValue,
    sortValue,
    partOfSpeechFilter,
    showForm,
    showAllDetails,
    showGoToTopButton,
    filterOpen,
  } = useSelector((state) => state.journal)

  // console.log('showAllDetails', showAllDetails)
  // console.log('sortValue', sortValue)
  const { isMobile } = useIsMobile(1070)

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
      dispatch(setJournalWords(JSON.parse(localStorage.getItem('journal'))))
    } catch {
      dispatch(setJournalWords([]))
    }
  }, [])

  useEffect(() => {
    if (window.scrollY > 100) {
      dispatch(toggleJournalShowGoToTopButton(true))
    } else {
      dispatch(toggleJournalShowGoToTopButton(false))
    }
    const handleScroll = () => {
      if (window.scrollY > 100) {
        dispatch(toggleJournalShowGoToTopButton(true))
      } else {
        dispatch(toggleJournalShowGoToTopButton(false))
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
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
    dispatch(setJournalSearchValue(''))
  }

  const handleDetailsClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(setJournalShowAllDetails(!showAllDetails))
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
            dispatch(setSearchSearchValue(''))
            dispatch(setsSearchCurrentPage('search'))
          }}>
          explore new words
        </Link>
        &nbsp;or try other filters?
      </p>
    </div>
  )

  return (
    <>
      <div className='journal flex flex-col gap-4 w-full'>
        <div className='journal--search'>
          <SearchField
            searchValue={searchValue}
            clearSearchValue={clearSearchValue}
            placeholder='Search journal'
            handleInputChange={(e) =>
              dispatch(setJournalSearchValue(e.target.value))
            }
          />
        </div>
        <div className='journal--control flex flex-row justify-between gap-2'>
          {isMobile && (
            <button
              className={`text-sm text-gray-700 font-semibold border-2 border-indigo-100 hover:text-indigo-800 hover:bg-indigo-100 py-1 px-3 rounded-lg
            ${filterOpen ? 'bg-indigo-100' : ''}
          `}
              onClick={() => dispatch(setJournalFilterOpen(!filterOpen))}>
              {filterOpen ? 'Hide' : 'Show'} filter
            </button>
          )}
          <div className='flex justify-between gap-2'>
            <button
              onClick={handleDetailsClick}
              className='py-1 px-3 border-2 border-indigo-100 rounded-lg text-sm font-semibold hover:bg-indigo-100 hover:text-indigo-800'>
              {showAllDetails ? 'Hide all details' : 'Show all details'}
            </button>
            <select
              className='journal--sort border-indigo-100 border-2 rounded-lg py-1 px-3 text-sm font-semibold'
              onChange={(e) => dispatch(setJournalSortValue(e.target.value))}
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
        {(!isMobile || filterOpen) && (
          <div>
            <Filter page='search' />
          </div>
        )}
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
      {showGoToTopButton && (
        <button
          className='fixed bottom-4 right-4 bg-indigo-100 p-2 rounded-full hover:bg-indigo-200 outline-none shadow-md'
          onClick={() => window.scrollTo({ top: 0, behavior: 'auto' })}>
          <IoIosArrowUp size={25} />
        </button>
      )}
    </>
  )
}

export default Journal
