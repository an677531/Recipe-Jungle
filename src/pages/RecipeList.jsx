import { useState, useEffect, useMemo } from 'react'
import RecipeCard from '../components/RecipeCard'
import { supabase } from '../lib/supabase'
import { usePreferences } from '../context/PreferencesContext'
import { useFavorites } from '../context/FavoritesContext'
import '../styles/RecipeList.css'

export default function RecipeList() {
  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState('')
  const [cuisine, setCuisine] = useState('')
  const [favoritesOnly, setFavoritesOnly] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { layout } = usePreferences()
  const { isFavorited } = useFavorites()

  useEffect(() => {
    async function fetchRecipes() {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        setError('Failed to load recipes. Please try again later.')
      } else {
        setRecipes(data)
      }
      setLoading(false)
    }

    fetchRecipes()
  }, [])

  const cuisines = useMemo(() => {
    const unique = [...new Set(recipes.map(r => r.category).filter(Boolean))]
    return unique.sort()
  }, [recipes])

  const filtered = recipes.filter(recipe => {
    const term = search.toLowerCase()
    const matchesSearch =
      recipe.title.toLowerCase().includes(term) ||
      recipe.description.toLowerCase().includes(term)
    const matchesCuisine = cuisine === '' || recipe.category === cuisine
    const matchesFavorites = !favoritesOnly || isFavorited(recipe.id)
    return matchesSearch && matchesCuisine && matchesFavorites
  })

  const hasActiveFilters = search !== '' || cuisine !== '' || favoritesOnly

  return (
    <main className="recipe-list-page">
      <div className="container">
        <div className="recipe-list-page__header">
          <h1 className="recipe-list-page__title">Recipes</h1>
          <input
            type="search"
            className="recipe-list-page__search"
            placeholder="Search recipes…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label="Search recipes"
          />
        </div>

        {!loading && !error && (
          <div className="recipe-list-page__filters">
            <div className="recipe-list-page__cuisine-pills">
              <button
                className={`recipe-list-page__pill ${cuisine === '' ? 'recipe-list-page__pill--active' : ''}`}
                onClick={() => setCuisine('')}
                aria-pressed={cuisine === ''}
              >
                All
              </button>
              {cuisines.map(c => (
                <button
                  key={c}
                  className={`recipe-list-page__pill ${cuisine === c ? 'recipe-list-page__pill--active' : ''}`}
                  onClick={() => setCuisine(c)}
                  aria-pressed={cuisine === c}
                >
                  {c}
                </button>
              ))}
            </div>
            <button
              className={`recipe-list-page__favorites-btn ${favoritesOnly ? 'recipe-list-page__favorites-btn--active' : ''}`}
              onClick={() => setFavoritesOnly(v => !v)}
              aria-pressed={favoritesOnly}
            >
              ♥ Saved
            </button>
          </div>
        )}

        <p className="recipe-list-page__sr-count" aria-live="polite" aria-atomic="true">
          {!loading && !error && hasActiveFilters
            ? `${filtered.length} recipe${filtered.length !== 1 ? 's' : ''} found`
            : ''}
        </p>

        {loading && (
          <p className="recipe-list-page__status">Loading recipes…</p>
        )}

        {!loading && error && (
          <p className="recipe-list-page__status">{error}</p>
        )}

        {!loading && !error && filtered.length === 0 && (
          <p className="recipe-list-page__status">
            {favoritesOnly && filtered.length === 0
              ? 'No saved recipes yet. Heart a recipe to save it here.'
              : 'No recipes match your filters.'}
          </p>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className={`recipe-list-page__grid recipe-list-page__grid--${layout}`}>
            {filtered.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
