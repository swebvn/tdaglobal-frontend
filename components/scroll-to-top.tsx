"use client"

import { useEffect } from 'react'

export default function ScrollToTop() {
  useEffect(() => {
    // Scroll to top immediately on client mount
    window.scrollTo({ top: 0, behavior: 'instant' })
    
    // Disable scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    
    // Double check after a short delay to handle any layout shifts
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }, 50)
    
    return () => clearTimeout(timer)
  }, [])

  return null
}
