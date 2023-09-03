import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import MCQuestion from '../../components/Features/Review/MCQuestion'
import { updateQuizWordArrayById } from '../../reducers/quizReducer'
import { useState, useEffect } from 'react'
import Button from '../../components/Common/Button'
import BlanksQuestion from './BlanksQuestion'
import { checkBlanksCorrect, hasBlank } from '../../utils/reviewHelper'
import { updateQuizShowNotFinished } from '../../reducers/quizReducer'

const QuizQuestion = () => {
  const { index } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [blanksAns, setBlanksAns] = useState([])
  const [chosen, setChosen] = useState('')
  const [checked, setChecked] = useState(false)
  const [correctWrongMessage, setCorrectWrongMessage] = useState(null)
  const [showCorrectSpelling, setShowCorrectSpelling] = useState(false)

  const { questionArray, wordArray } = useSelector((state) => state.quiz)
  const questionData = questionArray[index]
  console.log('questionData', questionData)
  const questionType = questionData.questionType.split('-')[0]

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

  useEffect(() => {
    if (checked) {
      if (
        (questionType === 'mc' && chosen === questionData.correctAnswer) ||
        (questionType === 'blank' &&
          checkBlanksCorrect(blanksAns, questionData.correctAnswer))
      ) {
        setCorrectWrongMessage({ text: 'Correct:)', style: 'text-emerald-600' })
      } else {
        setCorrectWrongMessage({ text: 'Wrong:<', style: 'text-rose-600' })
      }
    }
  }, [chosen, checked, questionData.correctAnswer])

  const handleCheckClick = () => {
    if (questionType === 'mc') {
      if (!chosen) {
        alert('Please select an answer')
        return
      } else {
        const wordData = wordArray.find((word) => word.id === questionData.id)
        const pointsEarned = chosen === questionData.correctAnswer ? 1 : -1
        let updatedWordData = { ...wordData, pointsEarned }
        dispatch(updateQuizWordArrayById(wordData.id, updatedWordData))
      }
    } else {
      if (hasBlank(blanksAns)) {
        alert('Please fill in all blanks')
        return
      }
      const wordData = wordArray.find((word) => word.id === questionData.id)
      const pointsEarned = checkBlanksCorrect(
        blanksAns,
        questionData.correctAnswer
      )
        ? 2
        : -1
      setShowCorrectSpelling(true)
      let updatedWordData = { ...wordData, pointsEarned }
      dispatch(updateQuizWordArrayById(wordData.id, updatedWordData))
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
      setCorrectWrongMessage('')
      setShowCorrectSpelling(false)
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

  const resultButton = (
    <Button
      bgColor='indigo'
      size='lg'
      onClick={() => navigate('../result')}
      className='mt-4 font-semibold'>
      See Result
    </Button>
  )

  const reviewButtonToShow = (() => {
    if (Number(index) === questionArray.length - 1) {
      return resultButton
    } else if (checked) {
      return nextButton
    } else {
      return checkButton
    }
  })()

  return (
    <div className='flex flex-col gap-2 items-center'>
      <h2 className='text-lg text-center font-bold'>
        Question {Number(index) + 1}
      </h2>
      {correctWrongMessage && (
        <div
          className={`text-center text-md font-semibold
      ${correctWrongMessage.style}`}>
          {correctWrongMessage.text}
        </div>
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
      {showCorrectSpelling && (
        <div className='font-semibold text-sm text-gray-500'>
          Answer: {questionData.correctAnswer}
        </div>
      )}
      <div className='flex gap-2 items-center justify-center'>
        {index < questionArray.length - 1 && (
          <Button
            bgColor='gray'
            size='lg'
            className='mt-4'
            onClick={() => dispatch(updateQuizShowNotFinished(true))}>
            End Session
          </Button>
        )}
        {reviewButtonToShow}
      </div>
    </div>
  )
}

export default QuizQuestion
