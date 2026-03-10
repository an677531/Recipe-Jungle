import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function useFocusReset() {
  const location = useLocation()

  useEffect(() => {
    const main = document.querySelector('main')
    if (!main) return
    main.setAttribute('tabindex', '-1')
    main.focus({ preventScroll: false })
  }, [location.pathname])
}
