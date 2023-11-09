import { useState, useEffect } from 'react'

const useIsMobile = (screenSize) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= screenSize)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [screenSize])
  return { isMobile }
}

export default useIsMobile
