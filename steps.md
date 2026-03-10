# Recipe Jungle — Implementation Steps

> Work through these steps in order. Complete the testing checkpoint before moving to the next step.
> The application should be runnable and testable after every step.

---

## Phase 2 — Backend Setup (Supabase)

---

### Step 1 — Restore `.gitignore`

**Goal:** Protect credentials before any are written to disk.

**Files**
- `.gitignore` — create

**Task**
Create `.gitignore` at the project root with the following entries at minimum:
```
.env
.env.local
node_modules/
dist/
```

**Testing Checkpoint**
Run `git status` — `.gitignore` appears as a new tracked file. Create a throwaway `.env` file and run `git status` again — confirm it does not appear in the output. Delete the throwaway file.

---

### Step 2 — Create Supabase project and local `.env`

**Goal:** The remote project exists and credentials are available locally.

**Files**
- `.env` — create

**Task**
1. Go to supabase.com, create a new project, wait for it to provision.
2. In Project Settings → API, copy the Project URL and the `anon` public key.
3. Create `.env` at the project root:
```
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```
4. Add the same two variables to Vercel project settings under Settings → Environment Variables.

**Testing Checkpoint**
Run `cat .env` locally — both variables are present. Run `git status` — `.env` does not appear. In Vercel dashboard, confirm both variables are saved.

---

### Step 3 — Install Supabase client and create the client module

**Goal:** The Supabase client is importable from anywhere in the project.

**Files**
- `src/lib/supabase.js` — create

**Task**
```
npm install @supabase/supabase-js
```
Create `src/lib/supabase.js`:
```js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

**Testing Checkpoint**
Temporarily import and `console.log(supabase)` in `main.jsx`. Run `npm run dev` — the Supabase client object logs to the console with no errors. Remove the log before continuing.

---

### Step 4 — Create the `recipes` table and RLS policies

**Goal:** The database is ready to store and serve recipes with the correct access rules.

**Files**
- Supabase dashboard only — no code files changed.

**Task**
In the Supabase Table Editor, create a `recipes` table with these columns:

| Column         | Type      | Notes                    |
|----------------|-----------|--------------------------|
| `id`           | uuid      | Primary key, default gen |
| `title`        | text      | Not null                 |
| `description`  | text      |                          |
| `ingredients`  | jsonb     |                          |
| `instructions` | text      |                          |
| `category`     | text      | Cuisine type             |
| `image_url`    | text      |                          |
| `cook_time`    | int4      | Minutes                  |
| `prep_time`    | int4      | Minutes                  |
| `servings`     | int4      |                          |
| `difficulty`   | text      | Easy / Medium / Hard     |
| `special_notes`| text      |                          |
| `created_at`   | timestamptz | Default now()           |

Then in the Authentication → Policies tab:
1. Enable RLS on `recipes`.
2. Add policy: `Allow anonymous read` — operation `SELECT`, target `public`.
3. Add policy: `Allow authenticated admin write` — operations `INSERT, UPDATE, DELETE`, target `authenticated`.

**Testing Checkpoint**
In the Supabase Table Editor, manually insert one test recipe row. In the API tab, use the auto-generated curl example with the anon key to run a `GET` query — the row is returned. Confirm an unauthenticated client can read but not write.

---

## Phase 3 — Routing & Layout Shell

---

### Step 5 — Install react-router-dom and mount a bare router

**Goal:** The app uses client-side routing and the root route works.

**Files**
- `src/main.jsx` — modify
- `src/App.jsx` — modify

**Task**
```
npm install react-router-dom
```
Wrap the app in `<BrowserRouter>` in `main.jsx`. In `App.jsx`, add `<Routes>` with a single route: `path="/"` pointing to `Landing`.

**Testing Checkpoint**
Run `npm run dev`, visit `/` — the Landing page renders. Visit `/anything` — no crash (blank page is expected).

---

### Step 6 — Create stub page components

**Goal:** Every route target exists so routing cannot crash due to missing imports.

**Files**
- `src/pages/RecipeList.jsx` — create
- `src/pages/RecipeDetail.jsx` — create
- `src/pages/Dashboard.jsx` — create
- `src/pages/Login.jsx` — create

**Task**
Create each file as a minimal component:
```jsx
// Example — repeat for each page
export default function RecipeList() {
  return <main><h1>Recipe List</h1></main>
}
```

**Testing Checkpoint**
Import `RecipeList` in `App.jsx` temporarily. `npm run dev` with no console errors confirms all stub files are valid modules.

---

### Step 7 — Define all routes in `App.jsx`

**Goal:** Every application URL resolves to the correct page component.

**Files**
- `src/App.jsx` — modify

**Task**
Add all five routes:
```
/               → Landing
/recipes        → RecipeList
/recipes/:id    → RecipeDetail
/dashboard      → Dashboard
/login          → Login
```

**Testing Checkpoint**
Visit each path in the browser — each renders its stub heading. No 404 pages, no console errors.

---

### Step 8 — Build Layout, Header, and Footer

**Goal:** All pages share a consistent header, navigation, and footer.

**Files**
- `src/components/Layout.jsx` — create
- `src/components/Header.jsx` — create
- `src/components/Footer.jsx` — create
- `src/App.jsx` — modify

**Task**
1. Build `Header.jsx` with the site name and `<Link>` elements to `/` and `/recipes`.
2. Build `Footer.jsx` with minimal content.
3. Build `Layout.jsx` as a wrapper: `Header` + `<Outlet>` + `Footer`.
4. In `App.jsx`, wrap all routes inside a parent route that renders `Layout`.

**Testing Checkpoint**
Navigate between `/`, `/recipes`, `/login` — Header and Footer appear on all pages. Nav links navigate without a full page reload. No console errors.

---

### Step 9 — Create `ProtectedRoute` stub

**Goal:** The protected route component exists so Dashboard routing works now. Real auth check comes in Phase 6.

**Files**
- `src/components/ProtectedRoute.jsx` — create
- `src/App.jsx` — modify

**Task**
Create `ProtectedRoute.jsx` that currently just renders `<Outlet>` with no conditions. Wrap the `/dashboard` route with it in `App.jsx`.

**Testing Checkpoint**
Navigate to `/dashboard` — stub page renders normally. This is expected behavior until auth is wired in Step 23.

---

### Step 10 — Create `vercel.json` SPA rewrite rule

**Goal:** Direct URL access and page refreshes work in production without 404 errors.

**Files**
- `vercel.json` — create at project root

**Task**
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

**Testing Checkpoint**
Run `npm run build && npm run preview`. Open the preview URL and navigate directly to `/recipes` by typing it in the address bar — page loads correctly instead of a 404.

---

## Phase 4 — Recipe Display (Mock Data First)

---

### Step 11 — Create mock recipe data

**Goal:** Realistic test data is available for UI development without a live database.

**Files**
- `src/data/mockRecipes.js` — create

**Task**
Create an array of 4–5 recipe objects. Each must include every schema field with realistic values: `id`, `title`, `description`, `ingredients` (array), `instructions`, `category` (cuisine), `image_url` (use any public image URL), `cook_time`, `prep_time`, `servings`, `difficulty`, `special_notes`, `created_at`.

**Testing Checkpoint**
Import `mockRecipes` in any component temporarily and `console.log(mockRecipes.length)` — logs the correct count. Confirm the shape matches the schema before continuing.

---

### Step 12 — Build `RecipeCard` component

**Goal:** A single recipe displays correctly as a card.

**Files**
- `src/components/RecipeCard.jsx` — create
- `src/styles/RecipeCard.css` — create

**Task**
Build `RecipeCard` accepting a single `recipe` prop. Display: image, title, category, difficulty badge, and total time (prep + cook). Wrap the card in a `<Link to={/recipes/${recipe.id}}>`.

**Testing Checkpoint**
Render one `<RecipeCard recipe={mockRecipes[0]} />` inside `RecipeList.jsx`. Visit `/recipes` — one card appears with all fields visible, image loads, no console errors. Click the card — navigates to `/recipes/[id]`.

---

### Step 13 — Build `RecipeList` page with mock data and keyword search

**Goal:** The public recipe list is fully functional with live search before the database exists.

**Files**
- `src/pages/RecipeList.jsx` — modify
- `src/styles/RecipeList.css` — create

**Task**
1. Import `mockRecipes` and store in state.
2. Add a controlled text input for keyword search.
3. Filter the recipe array by matching the input against `title` and `description` (case-insensitive).
4. Render the filtered array as a grid of `RecipeCard` components.

**Testing Checkpoint**
Visit `/recipes` — all mock cards render in a grid. Type a word that matches one recipe title — only that card shows. Clear the input — all cards return. Type a word that matches nothing — grid is empty (empty state message from Step 15).

---

### Step 14 — Build `RecipeDetail` page with mock data

**Goal:** Individual recipe detail page renders all fields at the correct URL.

**Files**
- `src/pages/RecipeDetail.jsx` — modify
- `src/styles/RecipeDetail.css` — create

**Task**
1. Use `useParams` to read the `id` from the URL.
2. Find the matching recipe in `mockRecipes` by id.
3. If not found, render a "Recipe not found" message with a back link.
4. Display all fields: image, title, description, category, difficulty, prep time, cook time, servings, ingredients as a list, instructions, special notes.
5. Add a `<Link to="/recipes">` back button.

**Testing Checkpoint**
Click any card from `/recipes` — detail page loads with the correct recipe data. Navigate directly to `/recipes/[a-valid-mock-id]` — same result. Navigate to `/recipes/fake-id` — "Recipe not found" message appears.

---

### Step 15 — Add loading and empty states to `RecipeList`

**Goal:** The UI handles edge cases cleanly.

**Files**
- `src/pages/RecipeList.jsx` — modify

**Task**
1. Add a `loading` boolean state (initially `false` with mock data; it will be `true` during Supabase fetches later).
2. When `loading` is true, render a loading indicator in place of the grid.
3. When the filtered array is empty, render an empty state message: "No recipes match your search."

**Testing Checkpoint**
Temporarily set `loading = true` — loading indicator renders instead of cards. Set it back to false. Type a non-matching search term — empty state message appears. Clear — cards return.

---

## Phase 5 — Visitor Preferences & Favorites

---

### Step 16 — Build `PreferencesContext` with localStorage persistence

**Goal:** Layout and font size preferences are globally available and survive page refreshes.

**Files**
- `src/context/PreferencesContext.jsx` — create
- `src/main.jsx` — modify

**Task**
1. Create a context with two state values: `layout` (`'grid'` or `'list'`) and `fontSize` (`'normal'` or `'large'`).
2. Initialize each from localStorage on mount (`localStorage.getItem`), falling back to defaults.
3. Write to localStorage whenever either value changes.
4. Export a `usePreferences` custom hook.
5. Wrap the app in the provider in `main.jsx`.

**Testing Checkpoint**
In a component, call `usePreferences()` and `console.log` the values. Change one via a temporary button. Refresh the page — the changed value is restored from localStorage. No console errors.

---

### Step 17 — Build `PreferencesPanel` and apply preferences to the UI

**Goal:** Visitors can change display preferences from a visible control panel.

**Files**
- `src/components/PreferencesPanel.jsx` — create
- `src/components/Header.jsx` — modify
- `src/pages/RecipeList.jsx` — modify

**Task**
1. Build `PreferencesPanel` with a grid/list toggle and a font size selector.
2. Wire both controls to `usePreferences`.
3. Apply the `layout` value as a CSS class on the recipe grid container in `RecipeList`.
4. Apply `fontSize` by setting a CSS custom property on `document.body` (e.g. `--base-font-size`).
5. Add a button in `Header` that opens/closes the panel.

**Testing Checkpoint**
Visit `/recipes`, open the preferences panel, toggle grid/list — the card layout changes immediately. Change font size — text resizes. Refresh — both settings are restored.

---

### Step 18 — Build `FavoritesContext` with localStorage persistence

**Goal:** Favorited recipe IDs are globally available and survive page refreshes.

**Files**
- `src/context/FavoritesContext.jsx` — create
- `src/main.jsx` — modify

**Task**
1. Create a context with a `favorites` state (array of recipe IDs).
2. Initialize from localStorage on mount.
3. Write to localStorage on every change.
4. Provide two helpers: `toggleFavorite(id)` adds or removes the ID, `isFavorited(id)` returns a boolean.
5. Export a `useFavorites` custom hook.
6. Wrap the app in the provider in `main.jsx`.

**Testing Checkpoint**
Temporarily add a button that calls `toggleFavorite('test-id')`. Click it — id appears in `localStorage.getItem('favorites')`. Click again — id is removed. Refresh — state is restored correctly.

---

### Step 19 — Add favorite toggle button to `RecipeCard` and `RecipeDetail`

**Goal:** Visitors can save and unsave any recipe from both the list and the detail page.

**Files**
- `src/components/FavoriteButton.jsx` — create
- `src/components/RecipeCard.jsx` — modify
- `src/pages/RecipeDetail.jsx` — modify

**Task**
1. Build `FavoriteButton` accepting a `recipeId` prop. Use `useFavorites` to read `isFavorited` and call `toggleFavorite`. Display a filled heart when favorited, an outline when not. Add `aria-label` (e.g. "Save to favorites" / "Remove from favorites").
2. Add `FavoriteButton` to `RecipeCard` (prevent the card `<Link>` click from triggering when the button is clicked).
3. Add `FavoriteButton` to `RecipeDetail`.

**Testing Checkpoint**
Visit `/recipes`, click the heart on a card — it fills. Navigate to that recipe's detail page — heart is also filled. Refresh the detail page — heart is still filled. Click the heart again — it unfavorites on both views.

---

## Phase 6 — Admin Authentication

---

### Step 20 — Build `AuthContext` and wrap the app

**Goal:** Authentication state is globally available to all components.

**Files**
- `src/context/AuthContext.jsx` — create
- `src/main.jsx` — modify

**Task**
1. Create context with a `session` state (initially `null`).
2. On mount, call `supabase.auth.getSession()` and set the result.
3. Subscribe to `supabase.auth.onAuthStateChange` and update `session` on every event.
4. Provide `session` and a `signOut` helper that calls `supabase.auth.signOut()`.
5. Export a `useAuth` custom hook.
6. Wrap the app in `<AuthProvider>` in `main.jsx` (inside `<BrowserRouter>`).

**Testing Checkpoint**
In any component, call `useAuth()` and `console.log(session)` — logs `null` when not logged in. No console errors. Remove the log before continuing.

---

### Step 21 — Build the Login page form UI

**Goal:** The admin login form exists and manages its own state correctly.

**Files**
- `src/pages/Login.jsx` — modify
- `src/styles/Login.css` — create

**Task**
Build a form with:
- Email input (controlled)
- Password input (controlled)
- Submit button labeled "Log In"
- An error message area (hidden when empty)

No Supabase wiring yet — only form state.

**Testing Checkpoint**
Visit `/login` — form renders. Type in both fields — state updates (confirm with React DevTools or a temporary display). Submit with empty fields — browser validation prevents submission. No console errors.

---

### Step 22 — Wire Login form to Supabase Auth

**Goal:** The admin can log in with real credentials and log out from the header.

**Files**
- `src/pages/Login.jsx` — modify
- `src/components/Header.jsx` — modify

**Task**
1. In `Login.jsx`, on form submit call `supabase.auth.signInWithPassword({ email, password })`. On error, display the error message. On success, `useNavigate` to `/dashboard`.
2. In `Header.jsx`, read `session` from `useAuth`. When a session exists, show a "Log Out" button that calls `signOut`. When no session, show a "Log In" link to `/login`.

**Testing Checkpoint**
Submit wrong credentials — error message appears below the form. Submit correct admin credentials — redirected to `/dashboard`. Click "Log Out" in the header — session clears, header updates to show "Log In", redirected to `/`. Refresh while logged in — session persists (header still shows "Log Out").

---

### Step 23 — Complete `ProtectedRoute` to enforce authentication

**Goal:** Unauthenticated visitors cannot access the dashboard.

**Files**
- `src/components/ProtectedRoute.jsx` — modify

**Task**
Replace the stub with real logic:
```jsx
const { session } = useAuth()
if (!session) return <Navigate to="/login" replace />
return <Outlet />
```

**Testing Checkpoint**
Log out, then type `/dashboard` directly into the address bar — redirected to `/login`. Log in — `/dashboard` is accessible. Refresh while on `/dashboard` — session persists and the page stays loaded, no redirect loop.

---

### Step 24 — Polish header auth state display

**Goal:** The header is clean for guests and shows the correct controls for the admin.

**Files**
- `src/components/Header.jsx` — modify

**Task**
Ensure the header:
- Shows only public nav links (`/`, `/recipes`) for guests — no admin items visible
- Shows a "Dashboard" link and a "Log Out" button only when a session is active
- Does not expose an admin link that guests might click and get bounced

**Testing Checkpoint**
Open the app in an incognito window — no admin controls visible. Log in — Dashboard link and Log Out appear. Log out — controls disappear and only public nav remains.

---

## Phase 7 — Recipe CRUD + Database

---

### Step 25 — Replace mock data in `RecipeList` with Supabase fetch

**Goal:** The public recipe list reads from the real database.

**Files**
- `src/pages/RecipeList.jsx` — modify

**Task**
1. Remove the `mockRecipes` import.
2. Add a `useEffect` that calls `supabase.from('recipes').select('*').order('created_at', { ascending: false })`.
3. Set results to state on success. Set `loading` to `false` on completion.
4. Handle the error case with a visible message.
5. The existing keyword search filter still works — it now operates on the fetched data.

**Testing Checkpoint**
Add a real recipe in the Supabase Table Editor. Visit `/recipes` — the real recipe appears in the list. The loading state shows briefly before data loads. Keyword search still filters correctly. Delete the test row from Supabase — it disappears from the list on refresh.

---

### Step 26 — Replace mock data in `RecipeDetail` with Supabase fetch

**Goal:** Individual recipe pages read all fields from the real database.

**Files**
- `src/pages/RecipeDetail.jsx` — modify

**Task**
1. Remove the mock data lookup.
2. Add a `useEffect` keyed on `id` that calls `supabase.from('recipes').select('*').eq('id', id).single()`.
3. Display all fields from the returned row.
4. Handle the not-found case (Supabase returns an error when no row matches).

**Testing Checkpoint**
Click a real recipe card — detail page loads all fields from Supabase. Navigate directly to the URL — same result. Navigate to `/recipes/fake-id` — "Recipe not found" message. Favorites still work (the heart state is from localStorage and is independent of the fetch).

---

### Step 27 — Build Dashboard recipe management list

**Goal:** The admin can see all recipes in a management view.

**Files**
- `src/pages/Dashboard.jsx` — modify
- `src/styles/Dashboard.css` — create

**Task**
1. Fetch all recipes from Supabase on mount.
2. Render as a management list: title, category, difficulty per row.
3. Each row has an "Edit" button and a "Delete" button (not wired yet).
4. Add an "Add Recipe" button that links to `/dashboard/new`.

**Testing Checkpoint**
Log in, visit `/dashboard` — all real recipes appear. Add Recipe button is visible. Edit and Delete buttons appear per row but do nothing yet. Unauthenticated visit redirects to `/login`.

---

### Step 28 — Build `RecipeForm` and wire Add recipe

**Goal:** The admin can create a new recipe from the dashboard.

**Files**
- `src/components/RecipeForm.jsx` — create
- `src/App.jsx` — modify

**Task**
1. Add route `/dashboard/new` → `RecipeForm` (inside the ProtectedRoute).
2. Build `RecipeForm` with inputs for all schema fields: title, description, category (select), image URL, cook time, prep time, servings, difficulty (select), ingredients (textarea or dynamic list), instructions (textarea), special notes.
3. On submit in add mode, call `supabase.from('recipes').insert([formData])`. On success, navigate to `/dashboard`.

**Testing Checkpoint**
Log in, click "Add Recipe" — form page loads. Fill out all fields, submit — recipe appears in the Supabase table, redirected to dashboard where it appears in the list. Visit `/recipes` — the new recipe appears publicly.

---

### Step 29 — Wire `RecipeForm` for Edit

**Goal:** The admin can update an existing recipe.

**Files**
- `src/components/RecipeForm.jsx` — modify
- `src/App.jsx` — modify

**Task**
1. Add route `/dashboard/edit/:id` → `RecipeForm` (inside ProtectedRoute).
2. When an `id` param exists, fetch the recipe on mount and pre-populate all form fields.
3. On submit in edit mode, call `supabase.from('recipes').update(formData).eq('id', id)`. On success, navigate to `/dashboard`.
4. Wire the Edit button in `Dashboard.jsx` to navigate to `/dashboard/edit/:id`.

**Testing Checkpoint**
Click Edit on a dashboard recipe — form opens pre-populated with correct values. Change the title, submit — dashboard shows the updated title. Visit the public RecipeDetail for that recipe — updated data is displayed.

---

### Step 30 — Wire Delete with confirmation

**Goal:** The admin can safely remove a recipe with a confirmation step.

**Files**
- `src/pages/Dashboard.jsx` — modify

**Task**
1. On Delete button click, show an inline confirmation (replace the button with "Are you sure? Yes / Cancel" in the row, or use `window.confirm` as a simpler fallback).
2. On confirm, call `supabase.from('recipes').delete().eq('id', id)`.
3. On success, remove the recipe from local state (or re-fetch).

**Testing Checkpoint**
Click Delete on a recipe, then cancel — nothing changes. Click Delete, then confirm — recipe disappears from the dashboard immediately. Visit `/recipes` — the recipe no longer appears publicly. Check Supabase Table Editor — the row is gone.

---

## Phase 8 — Polish & Accessibility

---

### Step 31 — Responsive layout pass

**Goal:** The application is usable on mobile, tablet, and desktop.

**Files**
- `src/styles/RecipeList.css` — modify
- `src/styles/RecipeDetail.css` — modify
- `src/styles/Dashboard.css` — modify
- `src/components/Header.jsx` / `src/styles/Header.css` — modify as needed

**Task**
1. Recipe grid: collapses from multi-column to single column on small screens.
2. RecipeDetail: image and content stack vertically on mobile.
3. Dashboard management list: wraps cleanly on narrow screens; buttons remain tappable.
4. Header navigation: stacks or is accessible on small screens.
5. Forms: full-width inputs on mobile.

**Testing Checkpoint**
Open browser devtools, set viewport to 375px — all pages readable, no horizontal overflow, no truncated content. Check at 768px and 1280px. Test on a real mobile device if available.

---

### Step 32 — ARIA labels and keyboard navigation

**Goal:** All interactive elements are accessible to keyboard users and screen readers.

**Files**
- `src/components/FavoriteButton.jsx` — modify
- `src/components/PreferencesPanel.jsx` — modify
- `src/components/RecipeForm.jsx` — modify
- `src/components/Header.jsx` — modify

**Task**
1. All icon-only buttons have `aria-label` (FavoriteButton, preferences toggle).
2. Toggle controls have `aria-pressed` updated on state change.
3. All form inputs have an associated `<label>` element.
4. Confirm all interactive elements are reachable by Tab key.

**Testing Checkpoint**
Tab through the full page — focus moves logically through all interactive elements. Activate FavoriteButton with Enter/Space — heart toggles. Use macOS VoiceOver or Windows Narrator to confirm all controls are announced correctly.

---

### Step 33 — Focus management on route changes

**Goal:** Screen reader and keyboard users are oriented correctly after navigation.

**Files**
- `src/App.jsx` or a new `src/hooks/useFocusReset.js` — modify / create

**Task**
Add a `useEffect` that watches `useLocation()` and moves focus to the page's `<h1>` (or `<main>`) on every route change. Use a `ref` on the main heading or set `tabIndex="-1"` on `<main>` and call `.focus()`.

**Testing Checkpoint**
Tab to a nav link, press Enter to navigate — focus lands on the new page's main heading, not stranded in the header. Confirm with a screen reader that the page title is announced after navigation.

---

### Step 34 — Print and screenshot friendly recipe detail

**Goal:** Visitors can print or screenshot a clean recipe with no UI chrome.

**Files**
- `src/styles/RecipeDetail.css` — modify

**Task**
Add a `@media print` block that:
- Hides `<header>`, `<footer>`, `<nav>`, `FavoriteButton`, and `PreferencesPanel`
- Removes background colors and decorative images that waste ink
- Keeps the recipe content in a readable single-column layout with generous spacing

Also ensure the recipe detail page itself is visually clean at any viewport — a visitor should be able to screenshot the page content directly without cropping out UI clutter.

**Testing Checkpoint**
Open any recipe detail page. Open the browser print dialog (Cmd+P / Ctrl+P) — only the recipe content is visible in the preview. Take a screenshot of the page — the recipe content is the clear focal point with no distracting chrome surrounding it.

---

### Step 35 — Final deployment verification

**Goal:** The production build is clean with no runtime errors and all routes work via direct URL.

**Files**
- No code changes — this is a deployment and smoke test step.

**Task**
1. Run `npm run build` locally — confirm zero build errors.
2. Confirm Vercel has `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in environment variables.
3. Push to main — Vercel deploys automatically.
4. Test the following on the live URL directly (type each into the address bar, do not navigate from within the app):
   - `/` — Landing page loads
   - `/recipes` — Recipe list loads with real data
   - `/recipes/[a-real-id]` — Detail page loads
   - `/login` — Login form loads
   - `/dashboard` — Redirects to `/login` when not authenticated

**Testing Checkpoint**
All direct URL tests pass with no 404 errors. Log in on the production URL, add a recipe, confirm it appears publicly. Log out, confirm favorites persisted in localStorage still show hearts. Open browser console — no errors on any page.

---

## Summary

| Steps | Phase |
|-------|-------|
| 1–4   | Backend Setup (Supabase) |
| 5–10  | Routing & Layout Shell |
| 11–15 | Recipe Display (Mock Data) |
| 16–19 | Visitor Preferences & Favorites |
| 20–24 | Admin Authentication |
| 25–30 | Recipe CRUD + Database |
| 31–35 | Polish & Accessibility |

> At the start of each session, check `buildplan.md` for the current phase, then open this file and resume from the first uncompleted step.
