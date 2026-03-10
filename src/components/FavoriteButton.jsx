import { useFavorites } from '../context/FavoritesContext'
import '../styles/FavoriteButton.css'

export default function FavoriteButton({ recipeId }) {
  const { toggleFavorite, isFavorited } = useFavorites()
  const favorited = isFavorited(recipeId)

  return (
    <button
      className={`favorite-btn ${favorited ? 'favorite-btn--active' : ''}`}
      onClick={e => {
        e.preventDefault()
        e.stopPropagation()
        toggleFavorite(recipeId)
      }}
      aria-label={favorited ? 'Remove from favorites' : 'Save to favorites'}
      aria-pressed={favorited}
    >
      {favorited ? '♥' : '♡'}
    </button>
  )
}
