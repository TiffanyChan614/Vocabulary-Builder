import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const Layout = () => {
  return (
    <div className='site-wrapper flex flex-col'>
      <Header />
      <main className='flex flex-column text-gray-700 text-left px-6 py-3 self-center'>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
