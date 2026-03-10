import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { PreferencesProvider } from './context/PreferencesContext'
import { FavoritesProvider } from './context/FavoritesContext'
import { AuthProvider } from './context/AuthContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PreferencesProvider>
          <FavoritesProvider>
            <App />
          </FavoritesProvider>
        </PreferencesProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
