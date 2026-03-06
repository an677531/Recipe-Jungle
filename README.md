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
| Persistence | localStorage (visitor preferences)    |
| Database    | TBD — backend/DB for recipe data      |
| Auth        | Admin-only login (session or JWT)     |

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
- Browse all recipes
- View individual recipe detail pages
- Save display preferences via localStorage (font size, color mode, layout)
- Recipe browsing via search bar and sorting by categories (categories optional)
- Button to turn recipes into easy to screen shot or copy paste format for easy saving into personal cookbooks

### Admin (login required)
- Secure login page
- Add new recipes
- Edit existing recipes
- Delete recipes
- Protected routes — redirects unauthenticated users

---

## Project Structure

```
src/
├── components/       # Reusable UI components
├── pages/            # Route-level page components
│   └── Landing.jsx   # Landing page
├── styles/
│   └── global.css    # Fonts, color tokens, responsive base
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
