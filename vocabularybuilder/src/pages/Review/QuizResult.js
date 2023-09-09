import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ResultTable from '../../components/Features/Review/ResultTable'
import useReviewResult from '../../hooks/useReviewResult'

const QuizResult = () => {
  const { wordArray } = useSelector((state) => state.quiz)
  const { words } = useSelector((state) => state.journal)
  const navigate = useNavigate()
  useReviewResult(wordArray, words, 'quiz')

  return (
    <div className='flex flex-col gap-3 items-center w-full'>
      <h2 className='font-bold text-xl text-center text-indigo-800'>Result</h2>
      <ResultTable wordArray={wordArray} />
      <button
        onClick={() => navigate('../../../journal')}
        className='mt-4 bg-indigo-500 hover:bg-indigo-600 text-lg font-semibold text-white rounded-lg px-5 py-2'>
        Return to Journal
      </button>
    </div>
  )
}

export default QuizResult
