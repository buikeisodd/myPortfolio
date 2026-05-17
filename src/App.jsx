import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Contact from './pages/Contact'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <Router>
      {/*
        GRAIN OVERLAY DIV REMOVED — it was triggering the SVG feTurbulence
        rendering bug on Android. Subtle texture now handled safely in index.css
        using a CSS radial-gradient dot pattern instead.
      */}
      <CustomCursor />
      <Navbar />
      <main>
        <AnimatedRoutes />
      </main>
      <Footer />
    </Router>
  )
}