import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <h1>Vocabulary Builder</h1>
      <p>Welcome to Vocabulary Builder!</p>
      <div className='home--search'>
        <p>Don't know the meaning of a word?</p>
        <NavLink to='/search'>Search</NavLink>
      </div>
    </div>
  )
}

export default Home
