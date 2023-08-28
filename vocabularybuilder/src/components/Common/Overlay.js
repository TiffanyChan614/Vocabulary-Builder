const Overlay = ({ children }) => {
  return (
    <>
      <div className='overlay fixed inset-0 bg-black opacity-50 z-50'></div>
      <div className='wrapper fixed inset-0 w-screen h-screen flex justify-center items-center z-50'>
        {children}
      </div>
    </>
  )
}

export default Overlay
