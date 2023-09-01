import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import MCQuestion from '../../components/Features/Review/MCQuestion'
import { updateQuizWordArrayById } from '../../reducers/quizReducer'
import { useState, useEffect } from 'react'
import Button from '../../components/Common/Button'

const QuizQuestion = () => {
  const [chosen, setChosen] = useState('')
  const [checked, setChecked] = useState(false)
  const [message, setMessage] = useState('')
  const { index } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { questionArray, wordArray } = useSelector((state) => state.quiz)
  const questionData = questionArray[index]
  console.log('questionData', questionData)
  const questionType = questionData.questionType.split('-')[0]

  console.log('chosen', chosen)

  useEffect(() => {
    if (checked) {
      if (chosen === questionData.correctAnswer) {
        setMessage('Correct:)')
      } else {
        setMessage('Wrong:<')
      }
    }
  }, [chosen, checked, questionData.correctAnswer])

  const handleCheckClick = () => {
    if (questionType === 'mc') {
      if (!chosen) {
        alert('Please select an answer')
      } else if (chosen === questionData.correctAnswer) {
        const wordData = wordArray.find((word) => word.id === questionData.id)
        let updatedWordData = { ...wordData, pointsEarned: 1 }
        dispatch(updateQuizWordArrayById(wordData.id, updatedWordData))
      }
    }
    setChecked(true)
  }

  const handleSelectClick = (e) => {
    if (questionType === 'mc') {
      setChosen(e.target.name)
    }
  }

  const handleNextClick = () => {
    if (Number(index) < questionArray.length - 1 && checked) {
      const newIndex = Number(index) + 1
      setChecked(false)
      setChosen('')
      setMessage('')
      navigate(`../${newIndex}`)
    }
  }

  const checkButton = (
    <Button
      bgColor='indigo'
      size='lg'
      onClick={handleCheckClick}
      className='mt-4 font-semibold'>
      Check
    </Button>
  )

  const nextButton = (
    <Button
      bgColor='indigo'
      size='lg'
      onClick={handleNextClick}
      className='mt-4 font-semibold'>
      Next
    </Button>
  )

  return (
    <div className='flex flex-col gap-3 items-center'>
      <h2 className='text-lg text-center font-bold'>
        Question {Number(index) + 1}
      </h2>
      {message && (
        <p
          className={`text-center text-md font-semibold
      ${
        chosen === questionData.correctAnswer
          ? 'text-emerald-700'
          : 'text-rose-700'
      }`}>
          {message}
        </p>
      )}
      {questionType === 'mc' && (
        <MCQuestion
          checked={checked}
          chosen={chosen}
          questionData={questionData}
          handleSelect={handleSelectClick}
        />
      )}
      {checked ? nextButton : checkButton}
    </div>
  )
}

export default QuizQuestion
