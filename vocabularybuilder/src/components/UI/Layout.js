import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const Layout = () => {
  return (
    <div className='site-wrapper flex flex-col w-screen h-screen'>
      <Header />
      <main className='flex flex-column text-gray-700 text-left px-6 md:px-20 pt-2 pb-5 sm:py-5 self-center w-full justify-center grow'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
