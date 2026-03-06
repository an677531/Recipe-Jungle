# Recipe Jungle — Build Plan

This file tracks the phased development plan. Resume from the current phase
at the start of each new chat session.

---

## Phase 1 — Kickoff & Setup ✅
- [x] Vite + React project scaffolded
- [x] Folder structure: `components/`, `pages/`, `styles/`
- [x] `global.css` — color tokens, fonts, responsive base
- [x] Landing page (`Landing.jsx` + `Landing.css`)
- [x] `README.md` with project plan
- [x] `buildplan.md` created

---

## Phase 2 — Routing & Layout Shell
- [ ] Install React Router (`react-router-dom`)
- [ ] Define routes: `/`, `/recipes`, `/recipes/:id`, `/admin/login`, `/admin`
- [ ] Create `Layout.jsx` — shared header/nav/footer wrapper
- [ ] Create `Header.jsx` — site title, nav links
- [ ] Create `Footer.jsx` — minimal footer
- [ ] Stub pages: `RecipeList.jsx`, `RecipeDetail.jsx`, `AdminLogin.jsx`, `AdminDashboard.jsx`

---

## Phase 3 — Recipe Display (Public)
- [ ] Define recipe data shape (title, description, ingredients, steps, tags, image)
- [ ] `RecipeList.jsx` — grid/list of recipe cards
- [ ] `RecipeCard.jsx` — reusable card component
- [ ] `RecipeDetail.jsx` — full recipe view
- [ ] Connect to database (fetch recipes from backend/API)
- [ ] Loading and empty states

---

## Phase 4 — Visitor Preferences (localStorage)
- [ ] Preference options: font size, layout (grid/list), reduced motion
- [ ] `PreferencesContext.jsx` — React context for global preference state
- [ ] `PreferencesPanel.jsx` — UI control panel (accessible)
- [ ] Persist to and rehydrate from localStorage
- [ ] Apply preferences via CSS custom properties or class toggling

---

## Phase 5 — Admin Auth
- [ ] `AdminLogin.jsx` — login form
- [ ] Auth logic (JWT or session-based, TBD with backend)
- [ ] `ProtectedRoute.jsx` — redirect unauthenticated users
- [ ] Persist auth token securely (httpOnly cookie preferred)
- [ ] Logout functionality

---

## Phase 6 — Admin CRUD
- [ ] `AdminDashboard.jsx` — recipe management table/list
- [ ] `RecipeForm.jsx` — shared form for add and edit
- [ ] Add recipe (POST to API)
- [ ] Edit recipe (PUT/PATCH to API)
- [ ] Delete recipe with confirmation (DELETE to API)
- [ ] Image upload or URL input

---

## Phase 7 — Polish & Accessibility
- [ ] Keyboard navigation audit
- [ ] ARIA labels on interactive elements
- [ ] Focus management on route changes
- [ ] Responsive QA across breakpoints (mobile, tablet, desktop)
- [ ] Print stylesheet for recipe detail pages

---

## Phase 8 — Backend / Database (TBD)
- [ ] Choose backend (Node/Express, Supabase, Firebase, etc.)
- [ ] Set up database schema for recipes
- [ ] REST or GraphQL API endpoints
- [ ] Environment variables for API URLs and secrets

---

## Notes for Next Session
- Current phase: **Phase 2**
- Next immediate step: install `react-router-dom` and build Layout/routing shell
- Database tech not yet decided — confirm before Phase 3 data fetching
