import React from 'react'
import { NavLink } from 'react-router-dom'
import { AiOutlineHome, AiOutlineSearch } from 'react-icons/ai'
import { BiBookBookmark } from 'react-icons/bi'
import { MdOutlineQuiz } from 'react-icons/md'
import useIsMobile from '../../hooks/useIsMobile'
import PropType from 'prop-types'

const Header = () => {
  const activeTextStyleClassName =
    'font-bold text-gray-800 hover:underline select-none'
  const textLinkStyleClassName = 'text-gray-700 hover:underline select-none'
  const iconLinkStyleClassName =
    'hover:border-b-2 hover:pb-1 border-gray-700 text-gray-700 select-none'
  const activeIconStyleClassName =
    'border-b-2 border-gray-800 text-gray-800 pb-1 select-none'
  const { isMobile } = useIsMobile(500)

  const navigationItems = [
    {
      text: 'Home',
      icon: <AiOutlineHome size={25} />,
      link: '/'
    },
    {
      text: 'Search',
      icon: <AiOutlineSearch size={25} />,
      link: '/search'
    },
    {
      text: 'Journal',
      icon: <BiBookBookmark size={25} />,
      link: '/journal'
    },
    {
      text: 'Review',
      icon: <MdOutlineQuiz size={25} />,
      link: '/review'
    }
  ]

  const userAuthItems = [
    {
      text: 'Sign Up',
      className: 'px-3 py-1 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600',
      link: '/signup'
    },
    {
      text: 'Login',
      className: textLinkStyleClassName,
      link: '/login'
    }
  ]

  return (
    <div className='header-wrapper px-3 py-2'>
      <header className='flex flex-row items-center justify-between px-3 py-2 sm:py-3 border-b-2 border-indigo-100 font-medium text-gray-700'>
        <nav className='flex flex-row items-center gap-6'>
          {navigationItems.map((item) => (
            <NavLink
              key={item.link}
              className={({ isActive }) =>
                isActive ? activeTextStyleClassName : textLinkStyleClassName
              }
              to={item.link}>
              {({ isActive }) =>
                isMobile
                  ? (
                    <div
                      className={
                        isActive
                          ? activeIconStyleClassName
                          : iconLinkStyleClassName
                      }
                      aria-label={item.text}>
                      {item.icon}
                    </div>
                    )
                  : (
                      item.text
                    )
              }
            </NavLink>
          ))}
        </nav>
        <nav className='flex flex-row items-center gap-4'>
        {userAuthItems.map((item) => (
          <NavLink
            key={item.link}
            className={item.className}
            to={item.link}>
              {item.text}
            </NavLink>
        ))}
        </nav>
      </header>
    </div>
  )
}

export default Header

Header.propTypes = {
  isMobile: PropType.bool
}
