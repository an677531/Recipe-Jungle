# Recipe Jungle

A personal recipe website built with React. Anyone can browse recipes and save
their accessibility and display preferences locally. The site owner can log in
as admin to manage the recipe collection.

---

## Tech Stack

| Layer       | Technology                            |
|-------------|---------------------------------------|
| Frontend    | React (Vite)                          |
| Styling     | CSS (custom properties, mobile-first) |
| Persistence | localStorage (visitor preferences + favorites) |
| Database    | Supabase (hosted Postgres)            |
| Auth        | Supabase Auth (admin only)            |

## Fonts

- **Noto Serif Display / Libre Bodoni** — headings
- **Fira Sans / Inter** — body text
- **Hind Vadodara** — UI labels, buttons, nav

## Color Palette

| Name            | Hex       |
|-----------------|-----------|
| Shadow Grey     | `#231f20` |
| Tomato Jam      | `#bb4430` |
| Tropical Teal   | `#7ebdc2` |
| Vanilla Custard | `#f3dfa2` |
| Linen           | `#efe6dd` |

---

## Features

### Public (no login required)
- Browse all recipes in grid or list layout
- Filter recipes by cuisine type — pills auto-generated from the recipe collection
- Filter to show only saved (hearted) recipes
- Keyword search — live filters by title or description
- All three filters (search, cuisine, saved) work simultaneously
- Heart / save any recipe to localStorage — persists across sessions
- View individual recipe detail pages
- Print-friendly recipe detail view
- Display preferences via localStorage — layout, font size, color mode (Light / Dark / High Contrast)

### Admin (login required)
- Secure login page
- Add new recipes (all schema fields)
- Edit existing recipes
- Delete recipes (with confirmation)
- Protected routes — redirects unauthenticated users

---

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── Layout.jsx
│   ├── RecipeCard.jsx
│   ├── RecipeForm.jsx
│   ├── FavoriteButton.jsx
│   ├── PreferencesPanel.jsx
│   └── ProtectedRoute.jsx
├── context/            # React context providers
│   ├── AuthContext.jsx
│   ├── FavoritesContext.jsx
│   └── PreferencesContext.jsx
├── hooks/
│   └── useFocusReset.js
├── lib/
│   └── supabase.js
├── pages/              # Route-level page components
│   ├── Landing.jsx
│   ├── RecipeList.jsx
│   ├── RecipeDetail.jsx
│   ├── Dashboard.jsx
│   └── Login.jsx
├── styles/             # All CSS files
│   └── global.css      # Color tokens, fonts, responsive base, color modes
├── App.jsx
└── main.jsx
```

---

## Getting Started

```bash
cd recipe-jungle
npm install
npm run dev
```

Create a `.env` file with your Supabase credentials before running:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```
