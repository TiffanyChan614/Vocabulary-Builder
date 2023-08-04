import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <Link
        className='site-logo'
        to='/'>
        Home
      </Link>
      <nav>
        <NavLink to='/search'>Search</NavLink>
      </nav>
      <nav>
        <NavLink to='/journal'>Journal</NavLink>
      </nav>
    </header>
  )
}

export default Header
