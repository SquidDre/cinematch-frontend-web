import{ BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Services from './pages/signup/services'
import Favorites from './pages/signup/favorites'
import Home from './pages/splash'
import Create from './pages/signup/create'
import Login from  './pages/login'
import Rating from './pages/signup/rating'
import ForgotPassword from "./pages/forgot-password.tsx";
import Verify from './pages/signup/verify'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/rating" element={<Rating />} />
        <Route path="/services" element={<Services />} />
        <Route path="/favorites" element={<Favorites />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App;