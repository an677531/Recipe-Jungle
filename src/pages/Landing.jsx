import './Landing.css';

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
        <a href="/recipes" className="landing__cta">Explore Recipes</a>
      </div>
    </main>
  );
}
