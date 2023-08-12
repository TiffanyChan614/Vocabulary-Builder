import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const Layout = () => {
  return (
    <div className='site-wrapper'>
      <Header className='flex flex-row items-center px-2 py-2 bg-gray-400' />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
