import { Routes, Route } from 'react-router-dom'
import './styles/global.css'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import Landing from './pages/Landing'
import RecipeList from './pages/RecipeList'
import RecipeDetail from './pages/RecipeDetail'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import RecipeForm from './components/RecipeForm'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/recipes" element={<RecipeList />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/new" element={<RecipeForm />} />
          <Route path="/dashboard/edit/:id" element={<RecipeForm />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  )
}

export default App
