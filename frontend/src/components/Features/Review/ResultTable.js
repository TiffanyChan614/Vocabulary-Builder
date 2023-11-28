import React from 'react'
import PropTypes from 'prop-types'

const ResultTable = ({ wordArray }) => {
  const bgColor = (pointsEarned) => {
    if (pointsEarned > 0) {
      return 'bg-emerald-100'
    } else if (pointsEarned < 0) {
      return 'bg-rose-100'
    } else {
      return 'bg-gray-100'
    }
  }

  const changeColor = (pointsEarned) => {
    if (pointsEarned > 0) {
      return 'text-emerald-700'
    } else if (pointsEarned < 0) {
      return 'text-rose-700'
    } else {
      return 'text-gray-700'
    }
  }

  const headerStyleClassName = 'p-2 font-semibold text-center'

  if (wordArray.length === 0) {
    return (
      <div>
        Result has been submitted
      </div>
    )
  }

  return (
    <table>
      <thead>
        <tr>
          <th
            className={headerStyleClassName}
            scope='col'>
            Word
          </th>
          <th
            className={headerStyleClassName}
            scope='col'>
            Original Points
          </th>
          <th
            className={headerStyleClassName}
            scope='col'>
            New Points
          </th>
          <th
            className={headerStyleClassName}
            scope='col'>
            Points Earned
          </th>
        </tr>
      </thead>
      <tbody>
        {wordArray.map((wordData, index) => {
          const { word, originalPoints, newPoints, pointsEarned } = wordData
          return (
            <tr
              className={`${bgColor(pointsEarned)}`}
              key={word + index}>
              <td className='p-4 font-semibold text-center'>{word}</td>
              <td className='p-4 text-center'>{originalPoints}</td>
              <td className='p-4 text-center'>{newPoints}</td>
              <td
                className={`p-4 text-center font-bold ${changeColor(
                  pointsEarned
                )}`}>
                {pointsEarned > 0 ? `+${pointsEarned}` : pointsEarned}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default ResultTable

ResultTable.propTypes = {
  wordArray: PropTypes.array.isRequired
}
