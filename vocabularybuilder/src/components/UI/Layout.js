import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const Layout = () => {
  return (
    <div className='site-wrapper flex flex-col w-screen h-screen'>
      <Header />
      <main className='flex flex-column text-gray-700 text-left px-6 md:px-20 py-2 sm:py-5 self-center w-full justify-center'>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
