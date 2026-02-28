import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Search from './pages/Search'
import ProProfile from './pages/ProProfile'
import Dashboard from './pages/Dashboard'
import BecomePro from './pages/BecomePro'
import About from './pages/About'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/pro/:id" element={<ProProfile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/become-pro" element={<BecomePro />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App