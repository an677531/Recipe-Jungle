import { usePreferences } from '../context/PreferencesContext'
import '../styles/PreferencesPanel.css'

export default function PreferencesPanel({ isOpen, onClose }) {
  const { layout, setLayout, fontSize, setFontSize } = usePreferences()

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

        <button className="prefs-panel__close" onClick={onClose} aria-label="Close preferences">
          Done
        </button>
      </div>
    </div>
  )
}
