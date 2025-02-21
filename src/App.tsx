import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Modules from './pages/Modules';
import Challenges from './pages/Challenges';
import About from './pages/About';
import Contact from './pages/Contact';
import Arcade from './pages/Arcade';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0a0a16] text-gray-100 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/modules" element={<Modules />} />
            <Route path="/challenges" element={<Challenges />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/arcade" element={<Arcade />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App