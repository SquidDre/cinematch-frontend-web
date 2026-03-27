import{ BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Services from './pages/signup/services'
import Favorites from './pages/signup/favorites'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/services" />} />
        <Route path="/services" element={<Services />} />
        <Route path="/favorites" element={<Favorites />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App;