import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PreferencesPanel from './PreferencesPanel'
import { useAuth } from '../context/AuthContext'
import '../styles/Header.css'

export default function Header() {
  const [prefsOpen, setPrefsOpen] = useState(false)
  const { session, signOut } = useAuth()
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate('/')
  }

  return (
    <header className="header">
      <div className="header__inner container">
        <Link to="/" className="header__logo">Recipe Jungle</Link>
        <nav className="header__nav" aria-label="Main navigation">
          <Link to="/" className="header__link">Home</Link>
          <Link to="/recipes" className="header__link">Recipes</Link>
          <div className="header__prefs-wrapper">
            <button
              className="header__prefs-btn"
              onClick={() => setPrefsOpen(o => !o)}
              aria-label="Display preferences"
              aria-expanded={prefsOpen}
            >
              Display
            </button>
            <PreferencesPanel isOpen={prefsOpen} onClose={() => setPrefsOpen(false)} />
          </div>
          {session ? (
            <>
              <Link to="/dashboard" className="header__link">Dashboard</Link>
              <button className="header__logout-btn" onClick={handleSignOut}>Log Out</button>
            </>
          ) : (
            <Link to="/login" className="header__link">Login</Link>
          )}
        </nav>
      </div>
    </header>
  )
}
