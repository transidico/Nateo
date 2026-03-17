import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';

function App() {
  return (
    <Router>
      <div className="bg-mytheme-bg min-h-screen transition-colors duration-300 flex flex-col">
        <Navbar /> {/* Sempre visibile */}
        <main className="flex-grow">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
          </Routes>
        </main>
        <Footer /> {/* Sempre visibile */}
      </div>
    </Router >
  );
}

export default App
