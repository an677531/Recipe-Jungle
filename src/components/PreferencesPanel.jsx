import { useEffect } from 'react'
import { usePreferences } from '../context/PreferencesContext'
import '../styles/PreferencesPanel.css'

export default function PreferencesPanel({ isOpen, onClose }) {
  const { layout, setLayout, fontSize, setFontSize, colorMode, setColorMode } = usePreferences()

  useEffect(() => {
    if (!isOpen) return
    function handleKey(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="prefs-panel" role="dialog" aria-label="Display preferences">
      <div className="prefs-panel__inner">
        <div className="prefs-panel__row">
          <span className="prefs-panel__label">Layout</span>
          <div className="prefs-panel__options">
            <button
              className={`prefs-panel__btn ${layout === 'grid' ? 'prefs-panel__btn--active' : ''}`}
              onClick={() => setLayout('grid')}
              aria-pressed={layout === 'grid'}
            >
              Grid
            </button>
            <button
              className={`prefs-panel__btn ${layout === 'list' ? 'prefs-panel__btn--active' : ''}`}
              onClick={() => setLayout('list')}
              aria-pressed={layout === 'list'}
            >
              List
            </button>
          </div>
        </div>

        <div className="prefs-panel__row">
          <span className="prefs-panel__label">Text size</span>
          <div className="prefs-panel__options">
            <button
              className={`prefs-panel__btn ${fontSize === 'normal' ? 'prefs-panel__btn--active' : ''}`}
              onClick={() => setFontSize('normal')}
              aria-pressed={fontSize === 'normal'}
            >
              Normal
            </button>
            <button
              className={`prefs-panel__btn ${fontSize === 'large' ? 'prefs-panel__btn--active' : ''}`}
              onClick={() => setFontSize('large')}
              aria-pressed={fontSize === 'large'}
            >
              Large
            </button>
          </div>
        </div>

        <div className="prefs-panel__row">
          <span className="prefs-panel__label">Color mode</span>
          <div className="prefs-panel__options">
            <button
              className={`prefs-panel__btn ${colorMode === 'light' ? 'prefs-panel__btn--active' : ''}`}
              onClick={() => setColorMode('light')}
              aria-pressed={colorMode === 'light'}
            >
              Light
            </button>
            <button
              className={`prefs-panel__btn ${colorMode === 'dark' ? 'prefs-panel__btn--active' : ''}`}
              onClick={() => setColorMode('dark')}
              aria-pressed={colorMode === 'dark'}
            >
              Dark
            </button>
            <button
              className={`prefs-panel__btn ${colorMode === 'high-contrast' ? 'prefs-panel__btn--active' : ''}`}
              onClick={() => setColorMode('high-contrast')}
              aria-pressed={colorMode === 'high-contrast'}
            >
              High Contrast
            </button>
          </div>
        </div>

        <button className="prefs-panel__close" onClick={onClose} aria-label="Close preferences">
          Done
        </button>
      </div>
    </div>
  )
}
