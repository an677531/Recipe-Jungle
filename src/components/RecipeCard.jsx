import { Link } from 'react-router-dom'
import FavoriteButton from './FavoriteButton'
import '../styles/RecipeCard.css'

export default function RecipeCard({ recipe }) {
  const FALLBACK_IMAGE = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwXwu9eVxqnsE0pvlBsa1em8IOUQmrykCm5w&s'
  const totalTime = (recipe.prep_time ?? 0) + (recipe.cook_time ?? 0)

  return (
    <article className="recipe-card">
      <Link to={`/recipes/${recipe.id}`} className="recipe-card__link">
        <div className="recipe-card__image-wrapper">
          <img
            src={recipe.image_url || FALLBACK_IMAGE}
            alt={recipe.title}
            className="recipe-card__image"
          />
          <span className="recipe-card__difficulty">{recipe.difficulty}</span>
          <div className="recipe-card__favorite">
            <FavoriteButton recipeId={recipe.id} />
          </div>
        </div>
        <div className="recipe-card__body">
          <span className="recipe-card__category">{recipe.category}</span>
          <h2 className="recipe-card__title">{recipe.title}</h2>
          <p className="recipe-card__time">{totalTime} min</p>
        </div>
      </Link>
    </article>
  )
}
