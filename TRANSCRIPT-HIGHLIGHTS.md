# Transcript Highlights

## 1. Staged Kickoff — Holding Until Ready

**What happened:**
Before writing a single line of code, I have instructed Claude to wait for an explicit "you may begin work" signal, then I used that pause to define the full project scope: tech stack, user roles, design system (fonts and color palette/ theme), and the two documentation files (`README.md` and `buildplan.md`) needed to carry work across multiple sessions in case I couldn't complete this in one sesscion (I was right to do so). Only after all requirements were locked in, I did development start.

**Why it matters:**
This deliberate pre-work phase prevented scope creep and made sure the project had a consistent design and a structured plan from day one, making AI-assisted sessions more reliable across multiple chats.

---

## 2. Architecture Pivot — Backend Moved to Phase 2

**What happened:**
The original build plan placed backend/database work in Phase 8 and making a decision there on which platform to use - big mistake — after all UI features were built. During a planning session in Transcript 2, I provided a detailed prompt requesting that Supabase should be used as the backend and that its setup phase be moved earlier in the plan. Claude restructured the entire phase order: Supabase setup became Phase 2, the original Phase 8 backend placeholder was removed, and all downstream phases were renumbered with Supabase-specific task checklists making the project more well rounded and quicker to develop without need for restructuring.

**Why it matters:**
Designing authentication and CRUD operations before the database exists leads to incompatible issues; moving backend setup earlier meant every next phase could be built with a known data model in mind and auth system rather than readjusted later.

---

## 3. Plan Validation — Security and Deployment Gaps Caught Before Coding

**What happened:**
After the build plan was restructured, I have asked Claude to validate it against a set of technical requirements. Claude identified five gaps not covered by the plan: the missing `vercel.json` SPA rewrite rule (which would cause 404 errors on page refresh in production), Supabase environment variables not added to Vercel settings, RLS policies that were mentioned but not specified (two distinct policies were required — one for anonymous reads, one for authenticated writes), a deleted `.gitignore` that would expose credentials, and the missing step to wrap the app in `AuthContext` in `main.jsx`. Each gap was added to the build plan as a concrete checklist item.

**Why it matters:**
Catching these issues during planning instead of after deployment prevented credential exposure, production failures, and a broken live site — problems that are much harder to diagnose after the fact.

---

## 4. Dark Mode Polish — Hardcoded Colors Replaced with a CSS Token

**What happened:**
During the polish pass in Transcript 3, I made sure that Claude audited all CSS files and found that the muted text color `#6b6668` was hardcoded in eight separate places across five different stylesheets. Rather than adding eight dark-mode override rules, Claude introduced a single `--muted` CSS custom property in `:root`, overrode it in both the dark and high-contrast mode blocks in `global.css`, and replaced all eight hardcoded instances with `var(--muted)`. Additional dark-mode fixes were also applied to table row hover colors and error message backgrounds.

**Why it matters:**
Location of such practice issues and replacing them with a more fitted universal accross the platform solution ensure better and easier editing experience later on. Make sure to give claude chances to detect these issues and fix them as you go in your development.
---

## 5. Cuisine and Saved Filters — Dynamic, Composable, and Accessible

**What happened:**
After the core site was complete, I requested a feature to let visitors filter recipes by cuisine type or view only their saved or hearted recipes. Claude implemented both filters in a single pass: cuisine tabs are derived dynamically using `useMemo` over the actual `category` values returned from Supabase (no hardcoded list), a "♥ Saved" toggle integrates with `FavoritesContext`, all three filters (search, cuisine, saved) compose together at the same time, and all interactive elements include `aria-pressed` attributes and an `aria-live` result count. Dark mode overrides for the new elements were added immediately in the same session making it very convenient and nice catch.

**Why it matters:**
Adding previously discussed features to the newly added functions shows some level of consistency which gives more leeway with planning phase in case changes need to be made later on.
