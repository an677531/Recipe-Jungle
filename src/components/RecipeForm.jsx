import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import '../styles/RecipeForm.css'

const CUISINES = ['Italian', 'Mexican', 'Asian', 'American', 'Mediterranean', 'French', 'Indian', 'Other']
const DIFFICULTIES = ['Easy', 'Medium', 'Hard']

const empty = {
  title: '',
  description: '',
  category: CUISINES[0],
  image_url: '',
  prep_time: '',
  cook_time: '',
  servings: '',
  difficulty: DIFFICULTIES[0],
  ingredients: '',
  instructions: '',
  special_notes: '',
}

export default function RecipeForm() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()

  const [form, setForm] = useState(empty)
  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isEdit) return

    async function fetchRecipe() {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        setError('Failed to load recipe.')
      } else {
        setForm({
          ...data,
          ingredients: Array.isArray(data.ingredients)
            ? data.ingredients.join('\n')
            : data.ingredients ?? '',
        })
      }
      setLoading(false)
    }

    fetchRecipe()
  }, [id, isEdit])

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSaving(true)

    const payload = {
      ...form,
      ingredients: form.ingredients
        .split('\n')
        .map(s => s.trim())
        .filter(Boolean),
      prep_time: Number(form.prep_time),
      cook_time: Number(form.cook_time),
      servings: Number(form.servings),
    }

    const { error } = isEdit
      ? await supabase.from('recipes').update(payload).eq('id', id)
      : await supabase.from('recipes').insert([payload])

    if (error) {
      setError(error.message)
      setSaving(false)
    } else {
      navigate('/dashboard')
    }
  }

  if (loading) {
    return (
      <main className="recipe-form-page container">
        <p className="recipe-form-page__status">Loading…</p>
      </main>
    )
  }

  return (
    <main className="recipe-form-page">
      <div className="container">
        <div className="recipe-form-page__header">
          <h1 className="recipe-form-page__title">
            {isEdit ? 'Edit Recipe' : 'Add Recipe'}
          </h1>
          <Link to="/dashboard" className="recipe-form-page__back">← Back to Dashboard</Link>
        </div>

        {error && <p className="recipe-form-page__error">{error}</p>}

        <form className="recipe-form" onSubmit={handleSubmit}>

          <div className="recipe-form__section">
            <h2 className="recipe-form__section-title">Basic Info</h2>
            <div className="recipe-form__grid">
              <div className="recipe-form__field recipe-form__field--full">
                <label htmlFor="title" className="recipe-form__label">Title <span>*</span></label>
                <input id="title" name="title" type="text" required
                  className="recipe-form__input" value={form.title} onChange={handleChange} />
              </div>

              <div className="recipe-form__field recipe-form__field--full">
                <label htmlFor="description" className="recipe-form__label">Description</label>
                <textarea id="description" name="description" rows={3}
                  className="recipe-form__textarea" value={form.description} onChange={handleChange} />
              </div>

              <div className="recipe-form__field">
                <label htmlFor="category" className="recipe-form__label">Cuisine</label>
                <select id="category" name="category"
                  className="recipe-form__select" value={form.category} onChange={handleChange}>
                  {CUISINES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="recipe-form__field">
                <label htmlFor="difficulty" className="recipe-form__label">Difficulty</label>
                <select id="difficulty" name="difficulty"
                  className="recipe-form__select" value={form.difficulty} onChange={handleChange}>
                  {DIFFICULTIES.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              <div className="recipe-form__field recipe-form__field--full">
                <label htmlFor="image_url" className="recipe-form__label">Image URL</label>
                <input id="image_url" name="image_url" type="url"
                  className="recipe-form__input" value={form.image_url} onChange={handleChange}
                  placeholder="https://…" />
              </div>
            </div>
          </div>

          <div className="recipe-form__section">
            <h2 className="recipe-form__section-title">Time & Servings</h2>
            <div className="recipe-form__grid">
              <div className="recipe-form__field">
                <label htmlFor="prep_time" className="recipe-form__label">Prep time (min)</label>
                <input id="prep_time" name="prep_time" type="number" min="0"
                  className="recipe-form__input" value={form.prep_time} onChange={handleChange} />
              </div>

              <div className="recipe-form__field">
                <label htmlFor="cook_time" className="recipe-form__label">Cook time (min)</label>
                <input id="cook_time" name="cook_time" type="number" min="0"
                  className="recipe-form__input" value={form.cook_time} onChange={handleChange} />
              </div>

              <div className="recipe-form__field">
                <label htmlFor="servings" className="recipe-form__label">Servings</label>
                <input id="servings" name="servings" type="number" min="1"
                  className="recipe-form__input" value={form.servings} onChange={handleChange} />
              </div>
            </div>
          </div>

          <div className="recipe-form__section">
            <h2 className="recipe-form__section-title">Recipe Content</h2>
            <div className="recipe-form__grid">
              <div className="recipe-form__field recipe-form__field--full">
                <label htmlFor="ingredients" className="recipe-form__label">
                  Ingredients <span className="recipe-form__hint">(one per line)</span>
                </label>
                <textarea id="ingredients" name="ingredients" rows={8}
                  className="recipe-form__textarea" value={form.ingredients} onChange={handleChange}
                  placeholder="2 cups flour&#10;1 tsp salt&#10;…" />
              </div>

              <div className="recipe-form__field recipe-form__field--full">
                <label htmlFor="instructions" className="recipe-form__label">Instructions</label>
                <textarea id="instructions" name="instructions" rows={10}
                  className="recipe-form__textarea" value={form.instructions} onChange={handleChange}
                  placeholder="Separate steps with a blank line…" />
              </div>

              <div className="recipe-form__field recipe-form__field--full">
                <label htmlFor="special_notes" className="recipe-form__label">Special notes</label>
                <textarea id="special_notes" name="special_notes" rows={4}
                  className="recipe-form__textarea" value={form.special_notes} onChange={handleChange}
                  placeholder="Special equipment, hard-to-find ingredients, tips…" />
              </div>
            </div>
          </div>

          <div className="recipe-form__actions">
            <Link to="/dashboard" className="recipe-form__cancel">Cancel</Link>
            <button type="submit" className="recipe-form__submit" disabled={saving}>
              {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Publish Recipe'}
            </button>
          </div>

        </form>
      </div>
    </main>
  )
}
