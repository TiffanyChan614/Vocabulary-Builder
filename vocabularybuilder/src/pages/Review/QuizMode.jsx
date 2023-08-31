import { useDispatch, useSelector } from 'react-redux'
import NumberChoice from '../../components/Features/Review/NumberChoice'
import {
  updateQuizNumber,
  updateQuizQuestionArray,
  updateQuizInSession,
} from '../../reducers/quizReducer'
import Button from '../../components/Common/Button'
import { getQuizInitQuestionArray } from '../../utils/reviewHelper'
import { useNavigate } from 'react-router-dom'

const QuizMode = () => {
  const { number } = useSelector((state) => state.quiz)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const words = (() => {
    try {
      return JSON.parse(localStorage.getItem('journal'))
    } catch {
      return []
    }
  })()

  const minNum = Math.min(5, words.length)

  const handleNumberClick = (e) => {
    e.stopPropagation()
    dispatch(updateQuizNumber(parseInt(e.target.name)))
  }

  const handleStart = async (e) => {
    e.stopPropagation()
    if (number === 0) {
      e.preventDefault()
      window.alert('Please select the number of words you want to review.')
    } else {
      try {
        const initWordArray = await getQuizInitQuestionArray(words, number)
        dispatch(updateQuizQuestionArray(initWordArray))
        dispatch(updateQuizInSession(true))
        navigate('0')
      } catch (error) {
        console.error('Error initializing quiz', error)
      }
    }
  }

  return (
    <div className='quiz--options flex flex-col gap-5 text-center items-center'>
      <div className='quiz--mode flex flex-col gap-3 w-full sm:w-3/4 items-center'>
        <NumberChoice
          choiceArray={[minNum, 10]}
          wordsLength={words?.length}
          number={number}
          prompt='Please select the number of words you want to review:'
          handleNumberClick={handleNumberClick}
        />
        <Button
          onClick={handleStart}
          bgColor='indigo'
          size='lg'
          className='mt-4 font-semibold'>
          Start
        </Button>
      </div>
    </div>
  )
}

export default QuizMode
