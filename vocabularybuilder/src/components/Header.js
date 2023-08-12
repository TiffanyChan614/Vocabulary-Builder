import React from 'react'
import { NavLink } from 'react-router-dom'
import { AiOutlineHome, AiOutlineSearch } from 'react-icons/ai'
import { BiBookBookmark } from 'react-icons/bi'
import { useState, useEffect } from 'react'

const Header = () => {
  const activeTextClassName = 'font-bold text-gray-800 underline'
  const textLinkClassName = 'hover:underline'
  const iconLinkClassName =
    'hover:border-b-2 hover:pb-1 border-gray-700 text-gray-700'
  const activeIconClassName = 'border-b-2 border-gray-800 text-gray-800 pb-1'
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 500)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const navigationItems = [
    {
      text: 'Home',
      icon: <AiOutlineHome size={25} />,
      link: '/',
    },
    {
      text: 'Search',
      icon: <AiOutlineSearch size={25} />,
      link: '/search',
    },
    {
      text: 'Your Journal',
      icon: <BiBookBookmark size={25} />,
      link: '/journal',
    },
  ]

  return (
    <div className='header-wrapper px-3 py-2'>
      <header>
        <nav className='flex flex-row items-center px-3 py-3 border-b-2 gap-4 font-medium text-gray-700 sm:gap-6'>
          {navigationItems.map((item) => (
            <NavLink
              key={item.link}
              className={({ isActive }) =>
                isActive ? activeTextClassName : textLinkClassName
              }
              to={item.link}>
              {({ isActive }) =>
                isMobile ? (
                  <div
                    className={
                      isActive ? activeIconClassName : iconLinkClassName
                    }>
                    {item.icon}
                  </div>
                ) : (
                  item.text
                )
              }
            </NavLink>
          ))}
        </nav>
      </header>
    </div>
  )
}

export default Header
