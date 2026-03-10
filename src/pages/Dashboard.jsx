import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import '../styles/Dashboard.css'

export default function Dashboard() {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchRecipes()
  }, [])

  async function fetchRecipes() {
    const { data, error } = await supabase
      .from('recipes')
      .select('id, title, category, difficulty, created_at')
      .order('created_at', { ascending: false })

    if (error) {
      setError('Failed to load recipes.')
    } else {
      setRecipes(data)
    }
    setLoading(false)
  }

  async function handleDelete(id, title) {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return

    const { error } = await supabase.from('recipes').delete().eq('id', id)

    if (error) {
      setError('Failed to delete recipe.')
    } else {
      setRecipes(prev => prev.filter(r => r.id !== id))
    }
  }

  return (
    <main className="dashboard-page">
      <div className="container">
        <div className="dashboard-page__header">
          <h1 className="dashboard-page__title">Dashboard</h1>
          <Link to="/dashboard/new" className="dashboard-page__add-btn">+ Add Recipe</Link>
        </div>

        {loading && <p className="dashboard-page__status">Loading recipes…</p>}
        {error && <p className="dashboard-page__status">{error}</p>}

        {!loading && !error && recipes.length === 0 && (
          <p className="dashboard-page__status">No recipes yet. Add your first one.</p>
        )}

        {!loading && !error && recipes.length > 0 && (
          <div className="dashboard-page__table-wrapper">
          <table className="dashboard-page__table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Cuisine</th>
                <th>Difficulty</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recipes.map(recipe => (
                <tr key={recipe.id}>
                  <td>{recipe.title}</td>
                  <td>{recipe.category}</td>
                  <td>{recipe.difficulty}</td>
                  <td className="dashboard-page__actions">
                    <Link
                      to={`/dashboard/edit/${recipe.id}`}
                      className="dashboard-page__edit-btn"
                    >
                      Edit
                    </Link>
                    <button
                      className="dashboard-page__delete-btn"
                      onClick={() => handleDelete(recipe.id, recipe.title)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
      </div>
    </main>
  )
}
