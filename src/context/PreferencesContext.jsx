import { createContext, useContext, useState, useEffect } from 'react'

const PreferencesContext = createContext(null)

export function PreferencesProvider({ children }) {
  const [layout, setLayout] = useState(
    () => localStorage.getItem('pref_layout') ?? 'grid'
  )
  const [fontSize, setFontSize] = useState(
    () => localStorage.getItem('pref_fontSize') ?? 'normal'
  )
  const [colorMode, setColorMode] = useState(
    () => localStorage.getItem('pref_colorMode') ?? 'light'
  )

  useEffect(() => {
    localStorage.setItem('pref_layout', layout)
  }, [layout])

  useEffect(() => {
    localStorage.setItem('pref_fontSize', fontSize)
    document.body.dataset.fontSize = fontSize
  }, [fontSize])

  useEffect(() => {
    localStorage.setItem('pref_colorMode', colorMode)
    document.body.dataset.colorMode = colorMode
  }, [colorMode])

  // Apply all data attributes on first load
  useEffect(() => {
    document.body.dataset.fontSize = fontSize
    document.body.dataset.colorMode = colorMode
  }, [])

  return (
    <PreferencesContext.Provider value={{ layout, setLayout, fontSize, setFontSize, colorMode, setColorMode }}>
      {children}
    </PreferencesContext.Provider>
  )
}

export function usePreferences() {
  return useContext(PreferencesContext)
}
