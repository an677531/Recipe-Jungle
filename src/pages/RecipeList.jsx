import { useState, useEffect } from 'react'
import RecipeCard from '../components/RecipeCard'
import { supabase } from '../lib/supabase'
import { usePreferences } from '../context/PreferencesContext'
import '../styles/RecipeList.css'

export default function RecipeList() {
  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { layout } = usePreferences()

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

  const filtered = recipes.filter(recipe => {
    const term = search.toLowerCase()
    return (
      recipe.title.toLowerCase().includes(term) ||
      recipe.description.toLowerCase().includes(term)
    )
  })

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

        {loading && (
          <p className="recipe-list-page__status">Loading recipes…</p>
        )}

        {!loading && error && (
          <p className="recipe-list-page__status">{error}</p>
        )}

        {!loading && !error && filtered.length === 0 && (
          <p className="recipe-list-page__status">No recipes match your search.</p>
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
