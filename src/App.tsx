import{ BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Services from './pages/signup/services'
import Favorites from './pages/signup/favorites'
import Home from './pages/splash'
import Create from './pages/signup/create'
import Login from  './pages/login'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/login" element={<Login />} />
        <Route path="/services" element={<Services />} />
        <Route path="/favorites" element={<Favorites />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App;