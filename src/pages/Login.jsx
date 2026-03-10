import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import '../styles/Login.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      navigate('/dashboard')
    }
  }

  return (
    <main className="login-page">
      <div className="login-page__card">
        <h1 className="login-page__title">Admin Login</h1>

        {error && <p className="login-page__error">{error}</p>}

        <form className="login-page__form" onSubmit={handleSubmit} noValidate>
          <div className="login-page__field">
            <label htmlFor="email" className="login-page__label">Email</label>
            <input
              id="email"
              type="email"
              className="login-page__input"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="login-page__field">
            <label htmlFor="password" className="login-page__label">Password</label>
            <input
              id="password"
              type="password"
              className="login-page__input"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="login-page__submit" disabled={loading}>
            {loading ? 'Logging in…' : 'Log In'}
          </button>
        </form>
      </div>
    </main>
  )
}
