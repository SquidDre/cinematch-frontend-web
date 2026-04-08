import{ BrowserRouter, Routes, Route} from 'react-router-dom'
import Services from './pages/signup/services'
import Home from './pages/splash'
import Create from './pages/signup/create'
import Login from  './pages/login'
import Rating from './pages/signup/rating'
import ForgotPassword from "./pages/forgot-password.tsx";
import Verify from './pages/signup/verify'
import Genres from './pages/signup/genres.tsx'
import HomePage from './pages/HomePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/rating" element={<Rating />} />
        <Route path="/services" element={<Services />} />
        <Route path="/genres" element={<Genres />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App;