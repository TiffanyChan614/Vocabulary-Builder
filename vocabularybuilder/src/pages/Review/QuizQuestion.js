import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import MCQuestion from '../../components/Features/Review/MCQuestion'
import { updateQuizWordArrayById } from '../../reducers/quizReducer'
import { useState, useEffect } from 'react'
import Button from '../../components/Common/Button'
import BlanksQuestion from './BlanksQuestion'

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

  const [blanksAns, setBlanksAns] = useState([])

  useEffect(() => {
    if (questionType === 'blank') {
      const initialBlanksAns =
        questionType === 'blank'
          ? Array.from(
              { length: questionData.correctAnswer.length },
              (_, index) => ''
            )
          : []
      setBlanksAns([
        questionData.correctAnswer[0],
        ...initialBlanksAns.slice(1),
      ])
    }
  }, [questionData.correctAnswer.length, questionType])

  console.log('----------------------------------------------------')
  console.log('initial render')
  console.log('questionType', questionType, questionType === 'blank')
  console.log('chosen', chosen)
  console.log('blanksAns', blanksAns)
  console.log('----------------------------------------------------')

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
      } else {
        const wordData = wordArray.find((word) => word.id === questionData.id)
        const pointsEarned = chosen === questionData.correctAnswer ? 1 : -1
        let updatedWordData = { ...wordData, pointsEarned }
        dispatch(updateQuizWordArrayById(wordData.id, updatedWordData))
      }
    }
    setChecked(true)
  }

  const handleSelectClick = (e) => {
    if (questionType === 'mc' && !checked) {
      setChosen(e.target.name)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    const index = name.split('-')[1]
    setBlanksAns((prev) => {
      const newAns = [...prev]
      newAns[index] = value
      console.log('blanks ans', newAns)
      return newAns
    })
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
      {questionType === 'blank' && (
        <BlanksQuestion
          checked={checked}
          blanksAns={blanksAns}
          questionData={questionData}
          handleChange={handleChange}
        />
      )}
      {checked ? nextButton : checkButton}
    </div>
  )
}

export default QuizQuestion
