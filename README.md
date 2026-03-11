# Recipe Jungle

## Project Description

Recipe Jungle is a personal recipe site where people can browse recipes and change how the site looks for them. No account required.

Visitors can:
- browse recipes
- filter by cuisine
- save recipes with the heart button
- change layout, font size, and color mode

These settings save in localStorage so they stay between sessions.

There is only one admin account. The admin logs in to:
- add recipes
- edit recipes
- delete recipes


## Technologies Used

Frontend: React 19, Vite 5
Routing: React Router DOM v6
Styling: CSS (custom properties, mobile-first, no framework)
Fonts: Noto Serif Display, Libre Bodoni, Fira Sans, Hind Vadodara, Inter
Persistence: localStorage (preferences + saved recipes)
Database: Supabase (hosted Postgres)
Auth: Supabase Auth (single admin account)
Build Tool: Vite
Linting: ESLint 9
Deployment: Vercel


## Setup Instructions

### Prerequisites

- Node.js v18+ (v20+ recommended)
- A Supabase project with a recipes table


### Installation

clone the repository

git clone https://github.com/an677531/Recipe-Jungle.git

cd recipe-jungle

install dependencies

npm install



### Environment Variables

Create a .env file in the project root.


VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key


You can find these values in Supabase under:
Settings -> API

For Vercel deployments, add the same two variables in:
Project Settings -> Environment Variables


### Run Locally


npm run dev


Default dev address:
http://localhost:5173


### Build for Production
npm run build
npm run preview


## Project Structure
recipe-jungle/
index.html
vite.config.js
vercel.json
.env
buildplan.md
src/
main.jsx
App.jsx
index.css

lib/
  supabase.js

context/
  AuthContext.jsx
  FavoritesContext.jsx
  PreferencesContext.jsx

hooks/
  useFocusReset.js

components/
  Layout.jsx
  Header.jsx
  Footer.jsx
  RecipeCard.jsx
  RecipeForm.jsx
  FavoriteButton.jsx
  PreferencesPanel.jsx
  ProtectedRoute.jsx

pages/
  Landing.jsx
  RecipeList.jsx
  RecipeDetail.jsx
  Dashboard.jsx
  Login.jsx

styles/
  global.css
  Header.css
  Footer.css
  Landing.css
  RecipeList.css
  RecipeCard.css
  RecipeDetail.css
  Login.css
  Dashboard.css
  RecipeForm.css
  FavoriteButton.css
  PreferencesPanel.css

Basic idea:
pages = full pages tied to routes
components = reusable UI pieces
styles = centralized CSS


## Backend Architecture Overview

### Technology Stack
Supabase - hosted Postgres database and authentication
@supabase/supabase-js - used directly in the frontend

There is no separate backend server.


### Project Structure

The browser talks directly to Supabase using the JS client.

Security is handled using Row Level Security (RLS) policies on the database.


### Request Flow

1. A React component runs a query


supabase.from('recipes').select()


2. The request is sent to the Supabase API.

3. RLS policies decide if the request is allowed.

4. The data returns to the component.


### Core Components
Routing: React Router DOM v6
Business logic: handled in React components and context providers
Data access: src/lib/supabase.js

vercel.json includes a rewrite rule so Vercel always serves index.html for SPA routing.


### External Integrations
Supabase - database and authentication
Google Fonts - typography
Vercel - hosting


### Error Handling
Supabase queries return:

{ data, error }
If error exists, the UI shows a message.

No external logging system is configured.


## Frontend Architecture Overview

### Technology Stack

React 19
Vite 5
React Router DOM v6
Plain CSS with custom properties

No CSS framework is used.


### Component Organization

Two main folders:

pages/
Full page views tied to routes.

components/
Reusable UI pieces.

All CSS lives in styles/.


### Routing

/                    Landing          Public
/recipes             RecipeList       Public
/recipes/:id         RecipeDetail     Public
/login               Login            Public
/dashboard           Dashboard        Protected
/dashboard/new       RecipeForm       Protected
/dashboard/edit/:id  RecipeForm       Protected

ProtectedRoute checks the authentication session.
If not logged in, the user is redirected to /login.


### State Management

Three React context providers manage application state.

AuthContext
  Supabase session state
  stored in memory

FavoritesContext
  saved recipe IDs
  stored in localStorage

PreferencesContext
  layout, font size, color mode
  stored in localStorage


### API Communication

All Supabase calls use the shared client:

src/lib/supabase.js

There is no custom API layer.


### Build / Tooling

npm run dev      start development server
npm run build    create production build
npm run preview  preview production build locally
npm run lint     run ESLint


## Color Palette

Shadow Grey     #231f20   primary text
Tomato Jam      #bb4430   accent / admin UI
Tropical Teal   #7ebdc2   filters / secondary accent
Vanilla Custard #f3dfa2   hover backgrounds
Linen           #efe6dd   default background

Color modes supported:
- Light
- Dark
- High Contrast

These are applied using the data-color-mode attribute on the body element.


## Database Structure Overview

### Database Type

Relational SQL database using Supabase Postgres.


### Schema Overview

The application uses one table: recipes.

There is no user_id column because the app uses a single admin account.

Row Level Security restricts write access to authenticated sessions.


### Table: recipes

Purpose: stores all recipe entries.

id            uuid       primary key, auto-generated
title         text       recipe name
description   text       summary shown on recipe cards
ingredients   json       array of ingredient strings
instructions  text       preparation steps
category      text       cuisine type
image_url     text       external image URL
prep_time     integer    prep time in minutes
cook_time     integer    cook time in minutes
servings      integer    number of servings
difficulty    text       Easy / Medium / Hard
special_notes text       optional notes
created_at    timestamp  auto-generated


Relationships: none (heh).


### Notes

Row Level Security is enabled on the recipes table.

Two policies exist:

Anonymous SELECT
Allows anyone to read recipes without logging in.

Authenticated ALL
Allows the admin to insert, update, and delete rows.

Additional notes:
- column names use snake_case
- id is auto-generated
- cuisine filters are generated automatically from existing category values


## Features

### Public (no login required)

- browse recipes in grid or list layout
- filter recipes by cuisine
- filter to show saved recipes
- keyword search (title and description)
- save recipes using the heart button
- view full recipe pages
- print-friendly recipe pages
- UI preferences saved in localStorage


### Admin (login required)

- secure login page
- add recipes
- edit recipes
- delete recipes (with confirmation)
- protected dashboard routes


## Known Limitations

- no public user accounts
- favorites are device-local (localStorage)
- preferences are device-local
- no image uploads (external URLs only)
- no pagination on the recipe list
- project was built on Node v18.20.8 (Vite prefers v20+)
- single table structure, no ratings, tags, or comments


## What I Learned

I have learned that I seem to produce best result when I break down my deevelopment into small steps where I can test the outcome after each step to ensure that the output is as expected and free from errors. Building a build plan also allows for reliable way to work on a project in multiple sessions. Making AI stop to ask questions at crucial point during planning allowed for creation of a more customized site that unfortunaly still looked oddly similar to other recipe based AI build projects despite hand selecting colors fonts and other crucial design choices. Lastly, I have learned that Claude will absolutely leave it's signature where possible especially if the project is being commited to github. If we're paying for a tool, why is the tool we use leaving it's signature on our work, is it our work then?
