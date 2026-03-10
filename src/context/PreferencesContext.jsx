import { createContext, useContext, useState, useEffect } from 'react'

const PreferencesContext = createContext(null)

export function PreferencesProvider({ children }) {
  const [layout, setLayout] = useState(
    () => localStorage.getItem('pref_layout') ?? 'grid'
  )
  const [fontSize, setFontSize] = useState(
    () => localStorage.getItem('pref_fontSize') ?? 'normal'
  )

  useEffect(() => {
    localStorage.setItem('pref_layout', layout)
  }, [layout])

  useEffect(() => {
    localStorage.setItem('pref_fontSize', fontSize)
    document.body.dataset.fontSize = fontSize
  }, [fontSize])

  // Apply font size on first load
  useEffect(() => {
    document.body.dataset.fontSize = fontSize
  }, [])

  return (
    <PreferencesContext.Provider value={{ layout, setLayout, fontSize, setFontSize }}>
      {children}
    </PreferencesContext.Provider>
  )
}

export function usePreferences() {
  return useContext(PreferencesContext)
}
