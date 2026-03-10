import { createContext, useContext, useState, useEffect } from 'react'

const FavoritesContext = createContext(null)

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(
    () => JSON.parse(localStorage.getItem('favorites') ?? '[]')
  )

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  function toggleFavorite(id) {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    )
  }

  function isFavorited(id) {
    return favorites.includes(id)
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorited }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  return useContext(FavoritesContext)
}
