
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import { NavBar } from './components/NavBar'
import { CocktailDetailsPage } from './pages/CocktailDetailsPage'
import { HomePage } from './pages/HomePage'
import { IngredientDetailsPage } from './pages/IngredientDetailsPage'

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cocktail/:id" element={<CocktailDetailsPage />} />
        <Route path="/ingredient/:name" element={<IngredientDetailsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
