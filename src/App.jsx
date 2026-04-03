import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import AboutUs from './pages/AboutUs';
import Login from './pages/Login';
import { Authentication } from './context/auth';

function App() {
  return (
    <Authentication>
      <Router>
        <div className="bg-mytheme-bg min-h-screen transition-colors duration-300 flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Authentication>
  );
}

export default App