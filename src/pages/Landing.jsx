import { Link } from 'react-router-dom'
import '../styles/Landing.css'

export default function Landing() {
  return (
    <main className="landing">
      <div className="landing__hero container">
        <h1 className="landing__title">Recipe Jungle</h1>
        <p className="landing__tagline">
          A personal collection of recipes — curated, cooked, and shared.
          Browse freely, save your preferences, and come back whenever hunger
          strikes.
        </p>
        <Link to="/recipes" className="landing__cta">Explore Recipes</Link>
      </div>
    </main>
  )
}
