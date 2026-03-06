# Recipe Jungle — Build Plan

> Resume from the **current phase** at the start of each new chat session.
> Check **Notes for Next Session** at the bottom for the immediate next step.

---

## Phase Overview

| #  | Phase                          | Status      |
|----|--------------------------------|-------------|
| 1  | Kickoff & Setup                | ✅ Complete |
| 2  | Routing & Layout Shell         | ⬜ Next     |
| 3  | Recipe Display (Public)        | ⬜ Pending  |
| 4  | Visitor Preferences            | ⬜ Pending  |
| 5  | Admin Authentication           | ⬜ Pending  |
| 6  | Admin Cookbook CRUD            | ⬜ Pending  |
| 7  | Polish & Accessibility         | ⬜ Pending  |
| 8  | Backend / Database             | ⬜ Pending  |

---

## Phase 1 — Kickoff & Setup ✅

- [x] Vite + React project scaffolded
- [x] Folder structure: `src/components/`, `src/pages/`, `src/styles/`
- [x] `global.css` — color tokens, fonts, responsive base
- [x] Landing page (`Landing.jsx` + `Landing.css`)
- [x] `README.md` with project plan
- [x] `buildplan.md` created

---

## Phase 2 — Routing & Layout Shell

> **Goal:** Navigation works before building features.

### Install
- [ ] `react-router-dom`

### Routes to define
| Path           | Page Component   | Access  |
|----------------|------------------|---------|
| `/`            | Landing          | Public  |
| `/recipes`     | RecipeList       | Public  |
| `/admin`       | AdminDashboard   | Protected |
| `/admin/login` | AdminLogin       | Public  |

### Files to create
- [ ] `Layout.jsx` — shared wrapper (header + nav + footer)
- [ ] `Header.jsx` — site title and navigation links
- [ ] `Footer.jsx` — minimal footer
- [ ] Stub pages: `RecipeList.jsx`, `RecipeDetail.jsx`, `AdminDashboard.jsx`, `AdminLogin.jsx`

---

## Phase 3 — Recipe Display (Public Cookbook View)

> **Note:** Database connection can be added later. Build UI first.

### Recipe data shape
```
Recipe {
  id
  title
  description
  ingredients   (array)
  instructions  (text)
  category      (string)
  cookTime      (number)
  createdAt
}
```

### Files to create
- [ ] `RecipeCard.jsx` — reusable card component
- [ ] `RecipeList.jsx` — grid view of recipe cards
- [ ] `RecipeDetail.jsx` — full individual recipe page

### UX
- [ ] Loading state
- [ ] Empty state message
- [ ] Basic search / filter *(optional)*

---

## Phase 4 — Visitor Preferences (localStorage)

> **Goal:** Guest users can personalize the UI without an account.

### Preference options
- Layout — grid / list toggle
- Font size
- Theme — light / dark *(if implemented)*

### Files to create
- [ ] `PreferencesContext.jsx` — global preference state via React context
- [ ] `PreferencesPanel.jsx` — accessible UI controls

### Logic
- [ ] Persist preferences to localStorage on change
- [ ] Rehydrate from localStorage on load
- [ ] Apply via CSS custom properties or class toggling

> Keep logic lightweight.

---

## Phase 5 — Admin Authentication

> **Goal:** Only you can edit cookbook content.

### Approach *(choose one)*
- Supabase Auth
- Backend session
- Simple token check *(if instructor allows)*

> Do not build complex role systems.

### Files to create
- [ ] `AdminLogin.jsx` — login form
- [ ] `ProtectedRoute.jsx` — redirects unauthenticated users

### Logic
- [ ] Auth state persistence
- [ ] Logout functionality

---

## Phase 6 — Admin Cookbook CRUD

### Dashboard features
- [ ] View full recipe list
- [ ] Add recipe
- [ ] Edit recipe
- [ ] Delete recipe *(with confirmation)*

### Files to create
- [ ] `RecipeForm.jsx` — shared add / edit form

### API operations
| Action | Method        |
|--------|---------------|
| Add    | `POST`        |
| Edit   | `PUT / PATCH` |
| Delete | `DELETE`      |

### Image handling
- [ ] Image URL field *(simplest approach)*

> Avoid heavy media upload pipelines unless required.

---

## Phase 7 — Polish & Accessibility

> **Goal:** Clean, professional, and usable on all devices.

- [ ] Responsive layout — mobile → tablet → desktop
- [ ] Keyboard navigation support
- [ ] ARIA labels on all interactive elements
- [ ] Focus management on route changes
- [ ] Clean spacing and typography pass
- [ ] Print-friendly recipe detail view

> Do not add unnecessary animation systems.

---

## Phase 8 — Backend / Database

> **Must be decided before Phase 3 data fetching begins.**

### Backend options *(evaluate in order)*
1. **Supabase** — easiest for this project
2. **Firebase**
3. **Node / Express REST API**

### Database schema
```
recipes {
  id
  title
  description
  ingredients   (JSON / array)
  instructions
  category
  cookTime
  createdAt
  owner         (admin identifier)
}
```

### Tasks
- [ ] Choose and set up backend
- [ ] Build REST or GraphQL API endpoints
- [ ] Configure environment variables for API URLs and secrets

---

## Notes for Next Session

```
Current phase:  Phase 2 — Routing & Layout Shell
Next step:      Install react-router-dom, define routes, build Layout / Header / Footer
Blocker:        Database tech not yet decided — confirm before starting Phase 3
Node version:   v18.20.8 (Vite pinned to v5 — upgrade to Node v20 when possible)
Priority:       Working features over advanced architecture
```
