import { useParams } from 'react-router-dom'

const QuizQuestion = () => {
  const { index } = useParams()
  return <div>Question {index}</div>
}

export default QuizQuestion
