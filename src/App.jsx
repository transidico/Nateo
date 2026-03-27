import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div className="bg-mytheme-bg min-h-screen transition-colors duration-300 flex flex-col">
        <Navbar /> {/* Sempre visibile */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer /> {/* Sempre visibile */}
      </div>
    </Router >
  );
}

export default App
