import React, { useState, useEffect } from 'react'

export default function useWindowSize(cb) {
  const [[windowWidth, windowHeight], setWindowSize] = useState([window.innerWidth, window.innerHeight])
  
  useEffect(() => {
    const handleResize = () => {
      cb()
      setWindowSize([window.innerWidth, window.innerHeight])
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return [windowWidth, windowHeight]
}