# Recipe Jungle — Build Plan

> Resume from the **current phase** at the start of each new chat session.
> Check **Notes for Next Session** at the bottom for the immediate next step.

---

## Phase Overview

| #  | Phase                          | Status      |
|----|--------------------------------|-------------|
| 1  | Kickoff & Setup                | ✅ Complete |
| 2  | Backend Setup (Supabase)       | ✅ Complete |
| 3  | Routing & Layout Shell         | ✅ Complete |
| 4  | Recipe Display (Mock Data)     | ✅ Complete |
| 5  | Visitor Preferences            | ✅ Complete |
| 6  | Authentication (Supabase Auth) | ✅ Complete |
| 7  | Recipe CRUD + Database         | ✅ Complete |
| 8  | Polish & Accessibility         | ✅ Complete |
| 9  | Filtering — Cuisine & Saved    | ✅ Complete |

---

## Phase 1 — Kickoff & Setup ✅

- [x] Vite + React project scaffolded
- [x] Folder structure: `src/components/`, `src/pages/`, `src/styles/`
- [x] `global.css` — color tokens, fonts, responsive base
- [x] Landing page (`Landing.jsx` + `Landing.css`)
- [x] `README.md` with project plan
- [x] `buildplan.md` created

---

## Phase 2 — Backend Setup (Supabase)

> **Goal:** Establish the database and authentication foundation before building features that depend on them.

### Decision
- **Supabase** — chosen for built-in auth, hosted Postgres database, and minimal setup overhead

### Tasks
- [x] Restore `.gitignore` and confirm `.env` is listed before writing any credentials
- [ ] Create Supabase project at supabase.com
- [ ] Add `.env` with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- [ ] Add the same two variables to Vercel project settings (Settings → Environment Variables)
- [ ] Install `@supabase/supabase-js` and create `src/lib/supabase.js` client
- [ ] Define database schema and create `recipes` table in Supabase dashboard

### Database schema
```
recipes {
  id             (uuid, primary key)
  title
  description
  ingredients    (json array)
  instructions   (text)
  category       (cuisine string — e.g. Italian, Mexican, Asian, American)
  image_url      (string)
  cook_time      (number, minutes)
  prep_time      (number, minutes)
  servings       (number)
  difficulty     (string — Easy / Medium / Hard)
  special_notes  (text — special equipment or non-typical ingredients)
  created_at
}
```

### Notes
- No `user_id` column — all recipes are owned by the single admin account
- Enable Row Level Security (RLS) with two policies: anonymous `SELECT` so visitors can read all recipes, and an authenticated admin policy that allows `INSERT` / `UPDATE` / `DELETE`
- Store credentials in `.env` only — never commit to version control
- UI is built with mock data in Phase 4; Supabase is wired up in Phase 7

---

## Phase 3 — Routing & Layout Shell

> **Goal:** Navigation works before building features.

### Install
- [ ] `react-router-dom`

### Routes to define
| Path           | Page Component   | Access    |
|----------------|------------------|-----------|
| `/`            | Landing          | Public    |
| `/recipes`     | RecipeList       | Public    |
| `/recipes/:id` | RecipeDetail     | Public    |
| `/dashboard`   | Dashboard        | Protected |
| `/login`       | Login            | Public    |

### Files to create
- [ ] `Layout.jsx` — shared wrapper (header + nav + footer)
- [ ] `Header.jsx` — site title and navigation links
- [ ] `Footer.jsx` — minimal footer
- [ ] `ProtectedRoute.jsx` — redirects unauthenticated users
- [ ] `vercel.json` — SPA rewrite rule so all routes serve `index.html` in production
- [ ] Stub pages: `RecipeList.jsx`, `RecipeDetail.jsx`, `Dashboard.jsx`, `Login.jsx`

---

## Phase 4 — Recipe Display (Mock Data First)

> **Note:** Build the UI against mock data now. Database connection is added in Phase 7.

### Mock data
- [x] Create `src/data/mockRecipes.js` — one placeholder recipe matching the full schema (full recipe set to be provided separately)
- [ ] Import mock data directly into components during this phase

### Recipe data shape
```
Recipe {
  id
  title
  description
  ingredients    (array)
  instructions   (text)
  category       (cuisine string)
  image_url      (string)
  cook_time      (number)
  prep_time      (number)
  servings       (number)
  difficulty     (Easy / Medium / Hard)
  special_notes  (text)
  created_at
}
```

### Files to create
- [ ] `RecipeCard.jsx` — reusable card component (shows image, title, cuisine, difficulty, total time)
- [ ] `RecipeList.jsx` — grid view of recipe cards with keyword search input
- [ ] `RecipeDetail.jsx` — full individual recipe page (routed via `/recipes/:id`)

### UX
- [ ] Keyword search input — live filters cards by title or description
- [ ] Loading state
- [ ] Empty state message

---

## Phase 5 — Visitor Preferences & Favorites (localStorage)

> **Goal:** Guest users can personalize the UI and save favorite recipes without an account.

### Preference options
- Layout — grid / list toggle
- Font size
- Color mode — Light / Dark / High Contrast (accessibility)

### Favorites
- Visitors can heart / bookmark any recipe on the list or detail page
- Favorited recipe IDs are stored in localStorage
- A visual indicator shows which recipes are already saved

### Files to create
- [ ] `PreferencesContext.jsx` — global preference state via React context
- [ ] `PreferencesPanel.jsx` — accessible UI controls
- [ ] `FavoritesContext.jsx` — global favorites state via React context
- [ ] Favorite toggle button — reusable, used on `RecipeCard` and `RecipeDetail`

### Logic
- [ ] Persist preferences to localStorage on change
- [ ] Persist favorited recipe IDs to localStorage on toggle
- [ ] Rehydrate both from localStorage on load
- [ ] Apply preferences via CSS custom properties or class toggling

> Keep logic lightweight.

---

## Phase 6 — Admin Authentication (Supabase Auth)

> **Goal:** The admin can log in and out. Guests never register — this is a single-owner application.

### Approach
- **Supabase Auth** — handles login, logout, and session persistence out of the box
- One admin account only; no public sign-up flow

> Do not build complex role systems.

### Files to create
- [ ] `Login.jsx` — admin login form (email + password, no sign-up fields)
- [ ] `ProtectedRoute.jsx` — redirects unauthenticated users *(scaffolded in Phase 3)*
- [ ] `AuthContext.jsx` — exposes current session state

### Logic
- [ ] Wrap app in `AuthContext` provider in `main.jsx`
- [ ] Supabase `onAuthStateChange` listener for session persistence
- [ ] Login with email and password
- [ ] Logout functionality
- [ ] Redirect to `/dashboard` after successful login
- [ ] Show login link in header only when not authenticated; show logout when authenticated

---

## Phase 7 — Recipe CRUD + Database

> **Goal:** Connect recipe features to Supabase and give the admin full management control.

### Dashboard features
- [ ] View all recipes in a management list
- [ ] Add a new recipe (all fields)
- [ ] Edit an existing recipe
- [ ] Delete a recipe *(with confirmation prompt)*

### Files to create
- [ ] `RecipeForm.jsx` — shared add / edit form covering all schema fields
- [ ] `Dashboard.jsx` — protected recipe management view

### Supabase operations
| Action | Supabase call                       |
|--------|-------------------------------------|
| Fetch  | `supabase.from('recipes').select()` |
| Add    | `supabase.from('recipes').insert()` |
| Edit   | `supabase.from('recipes').update()` |
| Delete | `supabase.from('recipes').delete()` |

### Data rules
- [ ] Replace mock data imports in Phase 4 components with Supabase fetches
- [ ] Public `RecipeList` and `RecipeDetail` use anonymous Supabase client (no auth required)
- [ ] Dashboard write operations require an active admin session

> Avoid heavy media upload pipelines unless required.

---

## Phase 8 — Polish & Accessibility

> **Goal:** Clean, professional, and usable on all devices.

- [ ] Responsive layout — mobile → tablet → desktop
- [ ] Keyboard navigation support
- [ ] ARIA labels on all interactive elements
- [ ] Focus management on route changes
- [ ] Clean spacing and typography pass
- [ ] Print-friendly recipe detail view

> Do not add unnecessary animation systems.

---

---

## Phase 9 — Filtering: Cuisine & Saved Recipes ✅

> **Goal:** Let visitors narrow the recipe list without a full search.

### Features added
- [x] Cuisine pill buttons — auto-generated from unique `category` values in the database; no hardcoded list
- [x] "♥ Saved" toggle button — shows only favorited recipes; friendly empty state if none saved
- [x] All three filters (keyword search + cuisine + saved) compose simultaneously
- [x] `aria-pressed` on all filter buttons for accessibility
- [x] `aria-live` count fires whenever any filter is active
- [x] Dark mode color overrides added for new pill/button elements

### Files changed
- `src/pages/RecipeList.jsx` — added `cuisine`, `favoritesOnly` state; `useMemo` cuisines list; updated filter logic; added filter bar JSX
- `src/styles/RecipeList.css` — added `.recipe-list-page__filters`, `.recipe-list-page__cuisine-pills`, `.recipe-list-page__pill`, `.recipe-list-page__favorites-btn` styles
- `src/styles/global.css` — added dark mode overrides for pill and favorites button text color

---

## Notes for Next Session

```
Current phase:  All phases complete
Next step:      Production smoke test (Step 35) — verify live Vercel deployment end to end
Blocker:        None
Node version:   v18.20.8 (Vite pinned to v5 — upgrade to Node v20 when possible)
Priority:       Working features over advanced architecture
```
