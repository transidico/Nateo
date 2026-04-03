import React, { useState } from 'react';
import { IoMoonSharp, IoSunny, IoMenuSharp, IoCloseSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';

/*Componente Navbar*/
function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <nav className="bg-mytheme-bg shadow relative">
      <div className="max-w-10xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-mytheme-primary">🌍 Nateo Travel</h1>
        {/* Visualizzazione link in modalità desktop */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/Home" className="text-mytheme-text hover:text-mytheme-secondary font-medium transition-colors">Home</Link>
          <Link to="/destinations" className="text-mytheme-text hover:text-mytheme-secondary font-medium transition-colors">Destinations</Link>
          <a href="#" className="text-mytheme-text hover:text-mytheme-secondary">Tips</a>
          <Link to="/about" className="text-mytheme-text hover:text-mytheme-secondary font-medium transition-colors">About</Link>
          <Link to="/login" className="text-mytheme-text hover:text-mytheme-secondary font-medium transition-colors">Login</Link>
          <button onClick={toggleTheme} className="text-2xl cursor-pointer text-mytheme-text">{isDark ? <IoSunny /> : <IoMoonSharp />}</button>
        </div>

        {/* Visualizzazione link in modalità mobile */}
        <div className="flex md:hidden items-center space-x-4">
          <button onClick={toggleTheme} className="text-2xl cursor-pointer text-mytheme-text">{isDark ? <IoSunny /> : <IoMoonSharp />}</button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl cursor-pointer text-mytheme-text">{menuOpen ? <IoCloseSharp /> : <IoMenuSharp />}</button>
        </div>
      </div>
      {/* Se il menu è aperto mostro la tendina */}
      {menuOpen && (
        <div className="md:hidden absolute w-full px-6 pb-4 flex flex-col space-y-3 bg-mytheme-bg shadow-lg shadow-mytheme-text/20 z-50">
          <Link to="/Home" onClick={() => setMenuOpen(false)} className="text-mytheme-text hover:text-mytheme-secondary font-medium">Home</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)} className="text-mytheme-text hover:text-mytheme-secondary font-medium">About</Link>
          <Link to="/destinations" onClick={() => setMenuOpen(false)} className="text-mytheme-text hover:text-mytheme-secondary font-medium">Destinations</Link>
          <a href="#" onClick={() => setMenuOpen(false)} className="text-mytheme-text hover:text-mytheme-secondary">Tips</a>
          <Link to="/about" onClick={() => setMenuOpen(false)} className="text-mytheme-text hover:text-mytheme-secondary font-medium">About</Link>
          <Link to="/login" onClick={() => setMenuOpen(false)} className="text-mytheme-text hover:text-mytheme-secondary font-medium">Login</Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar