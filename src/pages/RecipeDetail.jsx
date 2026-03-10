import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import FavoriteButton from '../components/FavoriteButton'
import '../styles/RecipeDetail.css'

export default function RecipeDetail() {
  const { id } = useParams()
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchRecipe() {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        setError('Recipe not found.')
      } else {
        setRecipe(data)
      }
      setLoading(false)
    }

    fetchRecipe()
  }, [id])

  if (loading) {
    return (
      <main className="recipe-detail-page container">
        <p className="recipe-detail-page__not-found">Loading…</p>
      </main>
    )
  }

  if (error || !recipe) {
    return (
      <main className="recipe-detail-page container">
        <p className="recipe-detail-page__not-found">{error || 'Recipe not found.'}</p>
        <Link to="/recipes" className="recipe-detail-page__back">← Back to Recipes</Link>
      </main>
    )
  }

  return (
    <main className="recipe-detail-page">
      <div className="container">

        <Link to="/recipes" className="recipe-detail-page__back">← Back to Recipes</Link>

        <div className="recipe-detail-page__hero">
          <img
            src={recipe.image_url}
            alt={recipe.title}
            className="recipe-detail-page__image"
          />
          <div className="recipe-detail-page__hero-info">
            <span className="recipe-detail-page__category">{recipe.category}</span>
            <div className="recipe-detail-page__title-row">
              <h1 className="recipe-detail-page__title">{recipe.title}</h1>
              <FavoriteButton recipeId={recipe.id} />
            </div>
            <p className="recipe-detail-page__description">{recipe.description}</p>

            <div className="recipe-detail-page__meta">
              <div className="recipe-detail-page__meta-item">
                <span className="recipe-detail-page__meta-label">Prep</span>
                <span className="recipe-detail-page__meta-value">{recipe.prep_time} min</span>
              </div>
              <div className="recipe-detail-page__meta-item">
                <span className="recipe-detail-page__meta-label">Cook</span>
                <span className="recipe-detail-page__meta-value">{recipe.cook_time} min</span>
              </div>
              <div className="recipe-detail-page__meta-item">
                <span className="recipe-detail-page__meta-label">Serves</span>
                <span className="recipe-detail-page__meta-value">{recipe.servings}</span>
              </div>
              <div className="recipe-detail-page__meta-item">
                <span className="recipe-detail-page__meta-label">Difficulty</span>
                <span className="recipe-detail-page__meta-value">{recipe.difficulty}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="recipe-detail-page__body">
          <section className="recipe-detail-page__section">
            <h2 className="recipe-detail-page__section-title">Ingredients</h2>
            <ul className="recipe-detail-page__ingredients">
              {recipe.ingredients.map((item, index) => (
                <li key={index} className="recipe-detail-page__ingredient">{item}</li>
              ))}
            </ul>
          </section>

          <section className="recipe-detail-page__section">
            <h2 className="recipe-detail-page__section-title">Instructions</h2>
            <div className="recipe-detail-page__instructions">
              {recipe.instructions.split('\n\n').map((step, index) => (
                <p key={index} className="recipe-detail-page__step">{step}</p>
              ))}
            </div>
          </section>

          {recipe.special_notes && (
            <section className="recipe-detail-page__section recipe-detail-page__section--notes">
              <h2 className="recipe-detail-page__section-title">Notes</h2>
              <p className="recipe-detail-page__notes">{recipe.special_notes}</p>
            </section>
          )}
        </div>

      </div>
    </main>
  )
}
